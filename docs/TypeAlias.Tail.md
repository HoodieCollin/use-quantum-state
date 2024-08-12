[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / Tail

# Type Alias: Tail\<T>

```ts
type Tail<T>: T extends [infer _, ...(infer rest)] ? rest : [];
```

Get the tail of a tuple.

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

`T` _extends_ `any`\[]

</td>
<td>

The tuple to get the tail of.

</td>
</tr>
</tbody>
</table>

## Example

```ts
type Test = Tail<[1, 2, 3]>; // [2, 3]
```

## Defined in

[index.tsx:505](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L505)
