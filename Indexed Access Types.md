# Indexed Access Types

Indexed Access Types provides a mechanism for retrieving part(s) of an array or object type via indices.

```ts twoslash
interface Car {
    make: string;
    model: string;
    year: number;
    color: {
        red: string;
        green: string;
        blue: string;
    }
}
let carColor: Car['color'];
/*
let carColor: {
    red: string;
    green: string;
    blue: string;
}
*/

let carColorRedComponent: Car['color']['red'];// let carColorRedComponent: string;

let carProperty: Car['color' | 'year'];
/*
let carProperty: number | {
    red: string;
    green: string;
    blue: string;
}
*/
```