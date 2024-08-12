[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / createQuantumContext

# Function: createQuantumContext()

```ts
function createQuantumContext<T>(
  defaultValue,
): [QuantumProvider<T>, QuantumStateHook<T>];
```

Define a special context provider that allows for reactive state management and a hook to setup the subscription within a component.

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

The type of state that will be managed by the context. Generally this should always be specified manually. In the case where no default value is set, it **_MUST_** be specified.

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

`defaultValue`

</td>
<td>

`T` _extends_ [`Obj`](TypeAlias.Obj.md) ? `null` | `T`\<`T`> : `T` _extends_ [`Obj`](TypeAlias.Obj.md)\[] ? `null` | `T`\<`T`> : `never`

</td>
<td>

this should almost always be `null`. There are very few cases where a default value should be set as it is generally better to provide a value to the provider.

</td>
</tr>
</tbody>
</table>

## Returns

\[[`QuantumProvider`](TypeAlias.QuantumProvider.md)\<`T`>, [`QuantumStateHook`](TypeAlias.QuantumStateHook.md)\<`T`>]

a tuple containing the [`QuantumProvider`](TypeAlias.QuantumProvider.md) and the [`useQuantumState`](TypeAlias.QuantumStateHook.md) hook.

## Defined in

[index.tsx:166](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L166)
