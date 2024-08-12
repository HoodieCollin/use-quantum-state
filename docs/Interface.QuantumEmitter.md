[**use-quantum-state**](README.md) • **Docs**

---

[use-quantum-state](README.md) / QuantumEmitter

# Interface: QuantumEmitter\<T>

A QuantumEmitter is an object that can emit events and listen for events.

## Contents

- [Remarks](#remarks)
- [Type Parameters](#type-parameters)
- [Methods](#methods)
  - [emit()](#emit)
    - [Parameters](#parameters)
    - [Returns](#returns)
    - [Remarks](#remarks-1)
    - [Defined in](#defined-in)
  - [on()](#on)
    - [Parameters](#parameters-1)
    - [Returns](#returns-1)
    - [Defined in](#defined-in-1)
  - [once()](#once)
    - [Parameters](#parameters-2)
    - [Returns](#returns-2)
    - [Defined in](#defined-in-2)

## Remarks

The events are represented as paths to properties in an object or an array of objects.

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

The state shape.

</td>
</tr>
</tbody>
</table>

## Methods

### emit()

```ts
emit(event, value): void
```

Propagate a new value to all listeners of a property in state.

#### Parameters

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

`event`

</td>
<td>

[`QuantumPath`](TypeAlias.QuantumPath.md)\<`T`>

</td>
<td>

[A path to a property in state.](TypeAlias.QuantumPath.md)

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

[`ValueAtPath`](TypeAlias.ValueAtPath.md)\<`T`, [`SplitString`](TypeAlias.SplitString.md)\<[`QuantumPath`](TypeAlias.QuantumPath.md)\<`T`>>>

</td>
<td>

the new value to set at the path.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Remarks

The value is emitted asynchronously to ensure the value is updated before the listeners are called.

#### Defined in

[index.tsx:153](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L153)

---

### on()

```ts
on(event, listener): Unsubscribe
```

Setup a long-lived listener for a property in state.

#### Parameters

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

`event`

</td>
<td>

[`QuantumPath`](TypeAlias.QuantumPath.md)\<`T`>

</td>
<td>

[A path to a property in state.](TypeAlias.QuantumPath.md)

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`value`) => `void`

</td>
<td>

a callback that is called when the property changes.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Unsubscribe`](TypeAlias.Unsubscribe.md)

an [unsubscribe function](TypeAlias.Unsubscribe.md) that can be used to remove the listener.

#### Defined in

[index.tsx:130](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L130)

---

### once()

```ts
once(event, listener): Unsubscribe
```

Setup a one-time listener for a property in state.

#### Parameters

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

`event`

</td>
<td>

[`QuantumPath`](TypeAlias.QuantumPath.md)\<`T`>

</td>
<td>

[A path to a property in state.](TypeAlias.QuantumPath.md)

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

(`value`) => `void`

</td>
<td>

a callback that is called when the property changes.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Unsubscribe`](TypeAlias.Unsubscribe.md)

an [unsubscribe function](TypeAlias.Unsubscribe.md) that can be used to remove the listener.

#### Defined in

[index.tsx:141](https://github.com/HoodieCollin/use-quantum-state/blob/b5be9cac7feb0254cc96c4bd8b196d5cd6e74920/src/index.tsx#L141)
