# @ts-ignore vs @ts-expect-error

Both `@ts-ignore` and `@ts-expect-error` suppress TS errors
```ts twoslash
// @ts-expect-error
const num1: number = 'hello';
// @ts-ignore
const num2: number = 'hello';
```
But `@ts-expect-error` is probably always a safer choice.

if an unawared change happens in our code and we and up with the following lines
```ts twoslash
// @ts-expect-error
const num1: number = 2;
// @ts-ignore
const num2: number = 2;
```
the `@ts-ignore` wont give us any hint that there is no errors anymore, while `@ts-expect-error` informs that theres an unused directive, once theres is no error anymore.