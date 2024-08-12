[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / QuantumStateHook

# Type Alias: QuantumStateHook()\<T>

```ts
type QuantumStateHook<T>: <P>(pathOrAccessor) => QuantumStateHookReturn<T, P>;
```

Subscribe to changes in a property in state. The subscription is automatically removed when the component unmounts.
The second element in the tuple is a function that can be used to emit a new value to all subscribers.

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`Obj`](TypeAlias.Obj.md) | [`Obj`](TypeAlias.Obj.md)\[]

</td>
</tr>
</tbody>
</table>

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

`P` _extends_ [`QuantumPath`](TypeAlias.QuantumPath.md)\<`T`>

</td>
<td>

[A path to the property in state.](TypeAlias.QuantumPath.md)

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

`pathOrAccessor`

</td>
<td>

`P` | [`AccessorFn`](TypeAlias.AccessorFn.md)\<`T`>

</td>
<td>

[A string representing a path to a property in state.](TypeAlias.QuantumPath.md) or [A function that references a property in state.](TypeAlias.AccessorFn.md)

</td>
</tr>
</tbody>
</table>

## Returns

[`QuantumStateHookReturn`](TypeAlias.QuantumStateHookReturn.md)\<`T`, `P`>

a `useState` like return tuple including [the value at the path and a setter function that can be used to update the value.](TypeAlias.QuantumStateHookReturn.md)

## Examples

```ts
const [value, setValue] = useQuantumState("a.b.c");
```

```ts
const [value, setValue] = useQuantumState(({ a }) => a.b.c);
```

## Defined in

[index.tsx:80](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L80)
