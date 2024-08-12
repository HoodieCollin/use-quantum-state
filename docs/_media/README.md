**use-quantum-state** • **Docs**

***

<p align="center">
  <img src="_media/logo.svg" width="170" alt="project-logo" />
</p>
<p align="center">
    <h1 align="center">use-quantum-state</h1>
</p>
<p align="center">
    <em>High performance cross-component state management.</em>
</p>



## Contents


##  Overview

`use-quantum-state` is a specialized React hook designed to facilitate efficient state management in scenarios where components need to subscribe to specific values within a shared context. The core of this library relies on an `EventEmitter` and `useState` / `useEffect` hooks to manage listeners during a component's lifecycle. 

See here for [full documentation](_media/README.md).

> When a component in a render tree consumes context, it rerender when the provider's value is replaced. With this library, the provider's value **IS NOT** replaced when a subscriber emits updates, thus limiting the number of components that will be rendered to only those that also subscribe to the same property within state.

> This library is particularly useful in niche cases, such as within the cells of a table, where it can dramatically reduce render cycles and simplify the management of state. However, it is not intended to serve as a general-purpose state management solution.

---

##  Repository Structure

```sh
└── ./
    ├── src
    │   ├── __tests__
    │   └── index.tsx
    ├── LICENSE
    ├── README.md
    ├── api-extractor.json
    ├── eslint.config.mts
    ├── jest.config.js
    ├── package.json
    ├── tsconfig.build.json
    ├── tsconfig.json
    ├── turbo.json
    └── typedoc.json
```

**System Requirements:**

<table>
<thead>
   <tr>
      <th></th>
      <th>Minimum Version</th>
   </tr>
</thead>
<tbody>
   <tr>
      <td><code>node</code></td>
      <td><code>20.10.0</code></td>
   </tr>
   <tr>
      <td><code>pnpm</code></td>
      <td><code>9.7.0</code></td>
   </tr>
</tbody>
</table>

###  Installation

> ```console
> $ npm install use-quantum-state
> ```
> OR
> ```console
> $ yarn add use-quantum-state
> ```
> OR
> ```console
> $ pnpm add use-quantum-state
> ```

###  Useful Scripts

If you don't use turbo, you can still run the scripts via you package manager instead.

> Run the test suite:
> ```console
> $ turbo test
> ```
> Compile the library *(this will also regenerate `/docs`)*:
> ```console
> $ turbo build
> ```
> Generate an API report
> ```console
> $ turbo report
> ```

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://local//issues)**: Submit bugs found or log feature requests for the `.` project.
- **[Submit Pull Requests](https://local//blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://local//discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your local account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone ../.
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Regenerate The API Report**: This makes sure any breaking changes are easy to spot during review.
   ```sh
   turbo report
   ```
6. **Commit Your Changes**: Commit with a clear message describing your updates following the conventional commit spec.
   ```sh
   git commit -m 'feat: implemented new feature x.'
   ```
7. **Push to local**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
8. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
9.  **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

---

##  License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) License. For more details, refer to the [LICENSE](_media/LICENSE) file.

## Interfaces

| Interface | Description |
| ------ | ------ |
| [QuantumEmitter](Interface.QuantumEmitter.md) | A QuantumEmitter is an object that can emit events and listen for events. |
| [QuantumProviderProps](Interface.QuantumProviderProps.md) | Quantum context provider can optionally take a value to override the default value. |

## Type Aliases

| Type alias | Description |
| ------ | ------ |
| [AccessorFn](TypeAlias.AccessorFn.md) | A callback function that is called with a path capturing proxy object. |
| [Obj](TypeAlias.Obj.md) | Alias for any string keyed object. |
| [QuantumPath](TypeAlias.QuantumPath.md) | A type that represents a path to a property in an object or an array of objects. |
| [QuantumProvider](TypeAlias.QuantumProvider.md) | A special context provider that exposes its [emitter](Interface.QuantumEmitter.md) via a ref. This allows for emitting events from either direction in the component tree. |
| [QuantumStateHook](TypeAlias.QuantumStateHook.md) | Subscribe to changes in a property in state. The subscription is automatically removed when the component unmounts. The second element in the tuple is a function that can be used to emit a new value to all subscribers. |
| [QuantumStateHookReturn](TypeAlias.QuantumStateHookReturn.md) | The return type of the [`useQuantumState`](TypeAlias.QuantumStateHook.md) hook. |
| [SplitString](TypeAlias.SplitString.md) | Recursively split a string by periods. |
| [Tail](TypeAlias.Tail.md) | Get the tail of a tuple. |
| [Unsubscribe](TypeAlias.Unsubscribe.md) | The unsubscribe callback returned by the `on` and `once` methods of the QuantumEmitter. |
| [ValueAtPath](TypeAlias.ValueAtPath.md) | Get the value type of a property at a given path in an object or an array of objects. The path is represented as a tuple of strings. |
| [ValueAtPathStr](TypeAlias.ValueAtPathStr.md) | Get the value type of a property at a given path in an object or an array of objects. The path is represented as a period delimited string. |

## Functions

| Function | Description |
| ------ | ------ |
| [createQuantumContext](Function.createQuantumContext.md) | Define a special context provider that allows for reactive state management and a hook to setup the subscription within a component. |
| [isCallable](Function.isCallable.md) | Check if a value is a function. This type guard is intentionally loose to allow for more flexibility. |
