[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / QuantumStateHookReturn

# Type Alias: QuantumStateHookReturn\<T, P>

```ts
type QuantumStateHookReturn<T, P>: [ValueAtPathStr<T, P>, Dispatch<SetStateAction<ValueAtPathStr<T, P>>>];
```

The return type of the [`useQuantumState`](TypeAlias.QuantumStateHook.md) hook.

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
<tr>
<td>

`P` _extends_ [`QuantumPath`](TypeAlias.QuantumPath.md)\<`T`>

</td>
<td>

[A path to the property in state.](TypeAlias.QuantumPath.md)

</td>
</tr>
</tbody>
</table>

## Remarks

A tuple containing the value at the path and a setter function that can be used to update the value.

## See

- [QuantumPath](TypeAlias.QuantumPath.md)
- [ValueAtPathStr](TypeAlias.ValueAtPathStr.md)

## Defined in

[index.tsx:99](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L99)
