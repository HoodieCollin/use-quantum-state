[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / ValueAtPath

# Type Alias: ValueAtPath\<T, P>

```ts
type ValueAtPath<T, P>: P extends infer p ? T extends { [K in p[0]]: infer U } ? ValueAtPath<U, Tail<p>> : never : P extends [] ? T : never;
```

Get the value type of a property at a given path in an object or an array of objects.
The path is represented as a tuple of strings.

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

The state _(aka. object or array of objects)_

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`\[]

</td>
<td>

The [path](TypeAlias.QuantumPath.md) as a tuple of strings.

</td>
</tr>
</tbody>
</table>

## Example

```ts
type Test = ValueAtPath<{ a: { b: { c: number; d: string } } }, ["a", "b"]>; // { c: number, d: string }
```

## Defined in

[index.tsx:467](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L467)
