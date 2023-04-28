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