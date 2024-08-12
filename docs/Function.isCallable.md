[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / isCallable

# Function: isCallable()

```ts
function isCallable(fn): fn is Function;
```

Check if a value is a function. This type guard is intentionally loose to allow for more flexibility.

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

`fn`

</td>
<td>

`any`

</td>
<td>

the value to check.

</td>
</tr>
</tbody>
</table>

## Returns

`fn is Function`

`true` if the value is a function, `false` otherwise.

## Defined in

[index.tsx:517](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L517)
