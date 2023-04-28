# Conditional Types

## ternary operator with values

```ts twoslash
class Grill {
    startGas() {}
    stopGas() {}
}
class Over {
    setTemperature() {}
}

type CookingDevice<T> = T extends "grill" ? Grill : Oven;

let device1: CookingDevice<"grill">; // let device1: Grill;
let device2: CookingDevice<"oven">; // let device2: Oven;
```

> `<a> extends <b>` is the only mechanism of express any kind of condition using this ts ternary operator

### Extends operator examples:
One way to think extends keyword is asking a question:
**does everything on the left fit within the set on the righ? **
1. `64 extends number` evaluates to `true` - 64 fits on the set number (all numbers)
2. `number extends 64` evaluates to `false` - the set number is larger than set 64 (just one value)
3. `string[] extends any` evaluates to `true` - string[] fits on the any set (any possible value)
4. `string[] extends any[]` evaluates to `true` - string[] fits on the set any[] (any possible array)
5. `never extends any` evaluates to `true` - never (empty set) fits on the set any (any possible value)
6. `any extends any` evaluates `true` - any (any possible value) fits in set any (any possible value)
7. `Date extends { new (...args: any[]): any }` evaluates to `false` - an instance of type Date doesnt fit on a "newable" object
8. `(typeof Date) extends { new (...args: any[]): any }` evaluates to `true` - the constructor of an instance of type Date fits on a "newable" object