# Inference with conditional types

Lets say we have something like
```ts twoslash
class WebpackCompiler {
    constructor(options: {
        entry?: string;
        watch?: boolean;
        // other options...
    }) {
        //....implementation
    }
}
```
and then
```ts twoslash
const cfg = {
    entry: "src/something",
    wutch: true, /*
        spelling error, no TS warning because TS can't infere that
        cfg its going to be use just to instanciate the WebpackCompiler,
        so it doesnt make sense to excess property checking
    */
}
try {
    const compiler = new WebpackCompiler(cfg) // no TS error is pointed out
} catch {
    throw new Error(
        `Problem compiling with config\n${JSON.stringify(
            cfg,
            null,
            "   "
        )}`
    )
}
```

what we need here is the ability to extract that constructor argument out,
so that we can obtain a type for it directly. Once we have that type, we'll
be able to change our code to `const cfg: WebpackCompilerOptions` and have
more complete validation of this object.

## The `infer` keyword
the infer conditional type can extract out pieces of information from other types

```ts twoslash
class FruitStand {
    constructor(fruitName: string[]) {}
}
```
what we want is to extract the arguments of the constructor to a type
```ts twoslash
type ConstructorArg<C> = C extends {
    new (arg: infer A): any
}
    ? A
    : never;

let fruits: ConstructorArg<typeof FruitStand> // let fruits: string[]
```
In plain language, what `ConstructorArg` is doing is
> if `C` is a "newable", infer the type of the first parameter of the constructor
> and return it. Otherwise, return `never`.

Is convinient for the return of the "doesnt match case" to be somethings
that doesnt add noise to our union types. Check the example below.
```ts twoslash
let value: string | number | never; // let value: string | number;
let otherValue: string | number | any; // let value: any;
```
So, its a good practice to return `never` in the doesnt match case of
conditional types 

Now, getting back to our webpack compiler example
```ts twoslash
class WebpackCompiler {
    constructor(options: {
        entry?: string;
        watch?: boolean;
        // other options...
    }) {
        //....implementation
    }
}
const cfg: ConstructorArg<typeof WebpackCompiler> = {
    entry: "src/something",
    wutch: true, // spelling error
}
/*
    now we get a TS warning!!!!!!!
    TS now is aware about our intentions and can do a excess property checking
*/
try {
    const compiler = new WebpackCompiler(cfg) // no TS error is pointed out
} catch {
    throw new Error(
        `Problem compiling with config\n${JSON.stringify(
            cfg,
            null,
            "   "
        )}`
    )
}
```