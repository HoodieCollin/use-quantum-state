[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / QuantumProvider

# Type Alias: QuantumProvider()\<T>

```ts
type QuantumProvider<T>: (props) => JSX.Element;
```

A special context provider that exposes its [emitter](Interface.QuantumEmitter.md) via a ref. This allows for emitting events from either direction in the component tree.

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

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`props`

</td>
<td>

`PropsWithRef`\<[`QuantumProviderProps`](Interface.QuantumProviderProps.md)\<`T`>>

</td>
<td>

[the props for the provider.](Interface.QuantumProviderProps.md)

</td>
</tr>
</tbody>
</table>

## Returns

`JSX.Element`

the provider element.

## Defined in

[index.tsx:48](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L48)
