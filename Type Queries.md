# Type Queries

Type queries allow us to obtain a type from a value.

## keyof

the `keyof` type query allow us to obtain type representing all property keys of a given interface

```ts twoslash
type QueriedType = {
    keyOne: string;
    keyTwo: string;
}

type SomeType = keyof QueriedType; // keyOne | keyTwo
```

> obs:
> Not all keys will be strings. They can also be  numbers or symbols.

## typeof

the `typeof` type query allows you to extract a type from a value

```ts twoslash
const apiResponse = await Promise.all([
    fetch("https://example.com"),
    Promise.resolve("Bla"),
]);
type ApiResponseType = typeof apiResponse // [Response, string];
```

the `typeof` type query is often used to obtain a type representing the "static site" of a class

```ts twoslash
class Fruit {
    constructor(public readonly name: string) {}

    static createBanana() { return new Fruit('banana') };
}
const MyFruit = Fruit; // const MyFruit: typeof Fruit

const banana = MyFruit.createBanana(); // const banana: Fruit
```