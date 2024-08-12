[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / SplitString

# Type Alias: SplitString\<S>

```ts
type SplitString<S>: S extends `${infer a}.${infer b}` ? [a, ...SplitString<b>] : [S];
```

Recursively split a string by periods.

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

`S` _extends_ `string`

</td>
<td>

The string to split.

</td>
</tr>
</tbody>
</table>

## Example

```ts
type Test = SplitString<"a.b.c">; // ['a', 'b', 'c']
```

## Defined in

[index.tsx:489](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L489)
