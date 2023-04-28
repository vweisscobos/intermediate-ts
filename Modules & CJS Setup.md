# CommonJS interop

Most of the time, you can convert
```ts twoslash
const fs = require("fs");
```
into
```ts twoslash
import * as fs from "fs";
```

but, when you have something like
```ts twoslash
// filename: some.ts
function createSomething() {
    return { a: "a", b: "b" };
}
// equivalent to CJS `module.exports = createSomething`
export = createSomething;

import * as createSomething from 'some.ts';
```

we'll  get the error:
> this module can only be referenced with ECMAScript imports/exports by turning on the 'esModuleInterop' flag and referencing its default export.

The above error is not telling us that theres an alternate solution to this problem: use an import that is not aligneed with de ECMAScript standart.

But why just not to turn the `esModuleInterop` option on? 
> Because it is a `viral` option. If using it while developing a library, any client project of this library would have to turn this option on in its own compiler options.

So, instead of importing using
```ts twoslash
import * as createSomething from "some.ts";
```
use
```ts twoslash
import createSomething = require("some.ts");
```

# Importing non-TS things

When using a bundler like webpack, parcel or snowpack, you may end up importing things that aren't `.js` or `.ts` files.

take as an example the line below:
```ts twoslash
import img from './file.img';
```

typescript doesnt understand this by default because it can't find a module named `file.png` because theres is none.

So we need to tell TS that whenever importing a `.png` file, it should be treated as if it's a JS module with a string value as its default export.

```ts twoslash
// filename: global.d.ts
declare module "*.png" {
    const imgUrl: string;
    export default imgUrl;
}
// filename: component.ts
import * from "./file.png";
```