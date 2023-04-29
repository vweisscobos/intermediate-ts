# Mapped Types

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