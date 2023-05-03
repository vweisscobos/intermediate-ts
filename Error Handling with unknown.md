# Handling errors with unknown

When handling thrown errors, if we just pass an uncasted argument to `catch` clause, TS undertands that is of `any` type and doesnt perform type checkings inside `catch` block
```ts twoslash
function somethingRisky() {}

try {
    somethingRisky();
} catch (err) {
    console.log(err.stack);
}
```
and so it gets easy to have another error thrown inside the `catch` block

Intead, we can treat cast it to `unknown`, so TS force us to narrow `err` down before it can safely do something with it
```ts twoslash
function somethingRisky() {}

try {
    somethingRisky();
} catch (err: unknown) {
    console.log(err.stack); // now this show us a TS error:

    // so, TS force us to treat it different
    if (err instanceof Error) { // this is a type guard
        console.log(err.stack);
    } else {
        console.log(err);
    }
}
```

