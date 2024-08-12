[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / QuantumPath

# Type Alias: QuantumPath\<T>

```ts
type QuantumPath<T>: T extends infer t ? `${number}.${QuantumPath<t[number]>}` : T extends infer t ? `${keyof t & string}` : "";
```

A type that represents a path to a property in an object or an array of objects.

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
</tbody>
</table>

## Example

```ts
type Test = QuantumPath<{ a: { b: { c: number; d: string } } }>; // 'a.b.c' | 'a.b.d'
```

## Defined in

[index.tsx:428](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L428)
