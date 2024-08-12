[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / QuantumProviderProps

# Interface: QuantumProviderProps\<T>

Quantum context provider can optionally take a value to override the default value.

## Contents

- [Remarks](#remarks)
- [Type Parameters](#type-parameters)
- [Properties](#properties)

## Remarks

However, if no default value is set, a value must be provided.

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

`T` _extends_ [`Obj`](TypeAlias.Obj.md) | [`Obj`](TypeAlias.Obj.md)\[]

</td>
<td>

The state shape.

</td>
</tr>
</tbody>
</table>

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`children`

</td>
<td>

`ReactNode`

</td>
<td>

[index.tsx:35](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L35)

</td>
</tr>
<tr>
<td>

`ref?`

</td>
<td>

`ForwardedRef`\<[`QuantumEmitter`](Interface.QuantumEmitter.md)\<`T`>>

</td>
<td>

[index.tsx:33](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L33)

</td>
</tr>
<tr>
<td>

`value?`

</td>
<td>

`T`

</td>
<td>

[index.tsx:34](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L34)

</td>
</tr>
</tbody>
</table>
