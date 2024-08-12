[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / ValueAtPathStr

# Type Alias: ValueAtPathStr\<T, P>

```ts
type ValueAtPathStr<T, P>: ValueAtPath<T, SplitString<P>>;
```

Get the value type of a property at a given path in an object or an array of objects.
The path is represented as a period delimited string.

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

`P` _extends_ `string`

</td>
<td>

The [path string](TypeAlias.QuantumPath.md).

</td>
</tr>
</tbody>
</table>

## Example

```ts
type Test = ValueAtPathStr<{ a: { b: { c: number; d: string } } }, "a.b.c">; // number
```

## Defined in

[index.tsx:448](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L448)
