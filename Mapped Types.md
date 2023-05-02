# Mapped Types

## Basics

Its useful to create subset of dictionaries with more specific key values

```ts twoslash
type Fruit = {
    name: string;
    color: string;
    mass: number;
}
type MyRecord = { [FruitKey in 'apple' | 'cherry']: Fruit };

function printFruitCatalog(fruitCatalog: MyRecord) {
    fruitCatalog.apple
    fruitCatalog.cherry
    fruitCatalog.pinapple // Property 'pineapple' does not exist on type 'MyRecord'
}
```

Making it more generalized
```ts twoslash
type Fruit = {
    name: string;
    color: string;
    mass: number;
}

type MyRecord<KeyType extends string, ValueType> = { [Key in KeyType]: ValueType };

function printFruitCatalog(fruitCatalog: MyRecord<'apple' | 'cherry', Fruit>) {
    fruitCatalog.apple
    fruitCatalog.cherry
    fruitCatalog.pinapple // Property 'pineapple' does not exist on type 'MyRecord'
}
```

## Mapped Types with Indexed Access Types

```ts twoslash
type PartOfWindow = {
    [Key in 
        | "document"
        | "navigator"
        | "setTimeout"]: Window[Key]
}

type PickWindowProperties<Keys extends keyof Window> = {
    [Key in Keys]: Window[Key]
}
type PartOfWindow2 = PickWindowProperties<
    "document" | "navigator" | "setTimeout"
>

type PickProperties<ValueType, Keys extends keyof ValueType> = {
    [Key in Keys]: ValueType[Key]
}
type PartOfWindow3 = PickProperties<Window, "document" | "navigator" | "setTimeout">
```

## Mapping Modifier

Its possible to modify some types during our "iteration" over the mapped keys

```ts twoslash
type Partial<T> = {
     [P in keyof T]?: T[P]
}

type Required<T> = {
    [P in keyof T]-?: T[P]
}

type ReadOnly<T> = {
    readonly [P in keyof T]: T[P]
}


type NotReadOnly<T> = {
    -readonly [P in keyof T]: T[P]
}
```

## key mapping

```ts twoslash
interface DataState {
    digits: number[];
    names: string[];
    flags: Record<"darkMode" | "mobile", boolean>;
}

type DataSDK = {
    // creating a type using template literal string syntax
    [K in keyof DataState as `set${Capitalize<K>}`]:
        (arg: DataState[K]) => void
}

function load(dataSDK: DataSDK) {
    dataSDK.setDigits([14]);
    dataSDK.setFlags({ darkMode: true, mobil: false })
} // we get an error here because TS expects the argument object to have "mobile" attribute
```

## Filtering Properties Out

Heres an example of how we could filter for only those properties of `window.document` starting with "query":
```ts twoslash
type DocKeys = Extract<keyof Document, `query${string}`>;
type KeyFilteredDoc = {
    [Key in DocKeys]: Document[K];
}
```
What if we want to filter by some value intead of a key pattern?

Probably the first solution that it comes to our mind is to use conditional types:
```ts twoslash
type ValueFilteredDoc = {
    [K in keyof Document]: Document[K] extends (
        ...args: any[]
    ) => Element | Element[]
        ? Document[K]
        : never;
}
```
but this doesnt work, and we end up having a type with a lot of `[key]: never`, intead of what we expected, i.e, just the attributes whose values matches `(args: any[]) => Element | Element[]`
```ts twoslash
type ElementFunction = (...args: any[]) => (Element | Element[]);
type FilteredKeys<T, U> = {
    // "for each" key of T
    [P in keyof T]:
        // take the value type of the parameter and check if
        // extends U
        T[P] extends U
            // if so, return the key
            ? P
            : never
// create a union type with selected keys
// in union types "never" disapears, leaving with only the keys
// we want
}[keyof T] & keyof T;
type RelevantDocumentKeys = FilteredKeys<Document, ElementFunction>
type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>
```







