# Extract and Exclude

## Extract

Useful for obtaining some subset of a type that is assignable to some other type.

```ts twoslash
type Colors =
  | "blue"
  | "green"
  | "red"
  | [number, number, number]
  | { red: number; green: number; blue: number };

type StringColors = Extract<Colors, string>; // type StringColors = "blue" | "green" | "red"
type ObjectColors = Extract<Colors, { red: string }>; // type ObjectColors = { red: number; green: number; blue: number }
```

In plain language:

> `Extract<a, b>` is extracting the subset of `a` that is assignable to `b`

## Exclude

The oposite of `extract`. Useful for obtaining the part of a type that's no assignable to some other type.

```ts twoslash
type Colors =
  | "blue"
  | "green"
  | "red"
  | [number, number, number]
  | { red: number; green: number; blue: number };

type NonStringColors = Exclude<Colors, string>;
/*
    type NonStringColors = 
      | [number, number, number]
      | { red: number; green: number; blue:number };
*/
type NonObjectColors = Exclude<Colors, { red: string }>;
/*
    type NonObjectColors = 
			| "blue"
			| "green"
			| "red"
			| [number, number, number]
*/
```

## How do these work?

These operators use ternary operation in its implementation
```ts twoslash
type Exclude<T, U> = T extends U ? never : T;

type Extract<T, U> = T extends U ? T : never;
```