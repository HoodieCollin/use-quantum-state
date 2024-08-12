/**
 * @packageDocumentation
 */

import { EventEmitter } from 'eventemitter3';
import { cloneDeep } from 'lodash';
import {
  createContext,
  Dispatch,
  ForwardedRef,
  forwardRef,
  PropsWithRef,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

/**
 * Quantum context provider can optionally take a value to override the default value.
 *
 * @public
 *
 * @template T - The state shape.
 *
 * @remarks However, if no default value is set, a value must be provided.
 */
export interface QuantumProviderProps<T extends Obj | Obj[]> {
  ref?: ForwardedRef<QuantumEmitter<T>>;
  value?: T;
  children: ReactNode;
}

/**
 * A special context provider that exposes its {@link QuantumEmitter | emitter} via a ref. This allows for emitting events from either direction in the component tree.
 *
 * @public
 *
 * @template T - The state shape.
 *
 * @param props - {@link QuantumProviderProps | the props for the provider.}
 * @returns the provider element.
 */
export type QuantumProvider<T extends Obj | Obj[]> = (
  props: PropsWithRef<QuantumProviderProps<T>>
) => JSX.Element;

/**
 * @public
 *
 * @template T - The state shape.
 *
 * @remarks This hook closely resembles the `useState` hook.
 */
/**
 * Subscribe to changes in a property in state. The subscription is automatically removed when the component unmounts.
 * The second element in the tuple is a function that can be used to emit a new value to all subscribers.
 *
 * @public
 *
 * @template P - {@link QuantumPath | A path to the property in state.}
 *
 * @param pathOrAccessor - {@link QuantumPath | A string representing a path to a property in state.} or {@link AccessorFn | A function that references a property in state.}
 * @returns a `useState` like return tuple including {@link QuantumStateHookReturn | the value at the path and a setter function that can be used to update the value.}
 *
 * @example A simple path string:
 * ```ts
 * const [value, setValue] = useQuantumState('a.b.c');
 * ```
 *
 * @example An accessor function:
 * ```ts
 * const [value, setValue] = useQuantumState(({ a }) => a.b.c);
 * ```
 */
export type QuantumStateHook<T extends Obj | Obj[]> = <
  P extends QuantumPath<T>,
>(
  pathOrAccessor: P | AccessorFn<T>
) => QuantumStateHookReturn<T, P>;

/**
 * The return type of the {@link QuantumStateHook | `useQuantumState`} hook.
 *
 * @public
 *
 * @template T - The state shape.
 * @template P - {@link QuantumPath | A path to the property in state.}
 *
 * @remarks A tuple containing the value at the path and a setter function that can be used to update the value.
 *
 * @see {@link QuantumPath}
 * @see {@link ValueAtPathStr}
 */
export type QuantumStateHookReturn<
  T extends Obj | Obj[],
  P extends QuantumPath<T>,
> = [ValueAtPathStr<T, P>, Dispatch<SetStateAction<ValueAtPathStr<T, P>>>];

/**
 * The unsubscribe callback returned by the `on` and `once` methods of the QuantumEmitter.
 *
 * @public
 *
 * @remarks This only exists to improve the readability of the API.
 */
export type Unsubscribe = () => void;

/**
 * A QuantumEmitter is an object that can emit events and listen for events.
 *
 * @public
 *
 * @template T - The state shape.
 *
 * @remarks The events are represented as paths to properties in an object or an array of objects.
 */
export interface QuantumEmitter<T> {
  /**
   * Setup a long-lived listener for a property in state.
   *
   * @param event - {@link QuantumPath | A path to a property in state.}
   * @param listener - a callback that is called when the property changes.
   * @returns an {@link Unsubscribe | unsubscribe function} that can be used to remove the listener.
   */
  on(
    event: QuantumPath<T>,
    listener: (value: ValueAtPathStr<T, typeof event>) => void
  ): Unsubscribe;
  /**
   * Setup a one-time listener for a property in state.
   *
   * @param event - {@link QuantumPath | A path to a property in state.}
   * @param listener - a callback that is called when the property changes.
   * @returns an {@link Unsubscribe | unsubscribe function} that can be used to remove the listener.
   */
  once(
    event: QuantumPath<T>,
    listener: (value: ValueAtPathStr<T, typeof event>) => void
  ): Unsubscribe;
  /**
   * Propagate a new value to all listeners of a property in state.
   *
   * @remarks The value is emitted asynchronously to ensure the value is updated before the listeners are called.
   *
   * @param event - {@link QuantumPath | A path to a property in state.}
   * @param value - the new value to set at the path.
   */
  emit(event: QuantumPath<T>, value: ValueAtPathStr<T, typeof event>): void;
}

/**
 * Define a special context provider that allows for reactive state management and a hook to setup the subscription within a component.
 *
 * @public
 *
 * @template T - The type of state that will be managed by the context. Generally this should always be specified manually. In the case where no default value is set, it __*MUST*__ be specified.
 *
 * @param defaultValue - this should almost always be `null`. There are very few cases where a default value should be set as it is generally better to provide a value to the provider.
 * @returns a tuple containing the {@link QuantumProvider | `QuantumProvider`} and the {@link QuantumStateHook | `useQuantumState`} hook.
 */
export function createQuantumContext<T extends Obj | Obj[]>(
  defaultValue: T extends Obj ? T | null : T extends Obj[] ? T | null : never
): [QuantumProvider<T>, QuantumStateHook<T>] {
  // each instance of the context will have its own emitter and context. The emitter is shared across all components that use the returned hook via closure.
  const emitter = new EventEmitter();

  // the context value should never be set again after the initial value is set. This invariant ensures components are not re-rendered unnecessarily.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = createContext<T>(null!);

  // define aliases for the types with `T` as the type parameter
  type PathStr = QuantumPath<T>;
  type Accessor = AccessorFn<T>;

  // define a dummy object to use for path aggregation at runtime.
  let pathParts: string[] = [];
  const dummyObj = new Proxy({} as T, {
    get(_, key: string) {
      pathParts.push(key);
      return dummyObj;
    },
    set() {
      throw new Error(`Cannot set value directly. Use emit() instead.`);
    },
  });

  // helper function that converts a path string or accessor function to an array of strings
  function getPathParts(accessor: PathStr | Accessor) {
    let parts: string[] = [];

    if (typeof accessor === 'string') {
      parts = accessor.split('.');
    } else {
      accessor(dummyObj);
      parts = pathParts;
      pathParts = [];
    }

    if (!parts.length) {
      throw new Error(`Invalid path.`);
    }

    return parts as [string, ...string[]];
  }

  /**
   * Helper function to get the value at a path string or accessor function.
   *
   * @internal
   *
   * @remarks This is a simple wrapper around the recursive `selectValue` function.
   *
   * @param value - the object or array of objects from the context.
   * @param accessor - a path string or accessor function.
   * @returns the property value or `undefined` if the path does not exist.
   *
   * @see {@link selectValue}
   */
  function getPropertyAtPath(value: any, accessor: PathStr | Accessor) {
    return selectValue(value, getPathParts(accessor));
  }

  /**
   * Helper function to set the value at a path string or accessor function.
   *
   * @internal
   *
   * @param value - the object or array of objects from the context.
   * @param accessor - a path string or accessor function.
   * @param newValue - the new value to set at the path.
   *
   * @see {@link assignValue}
   */
  function setValueAtPath(
    value: any,
    accessor: PathStr | Accessor,
    newValue: any
  ) {
    assignValue(value, getPathParts(accessor), newValue);
  }

  // recursive function to select a value at a path in an object or an array of objects
  function selectValue(value: any, parts: string[]) {
    if (!value || parts.length === 0) {
      return value;
    }

    if (typeof value !== 'object') {
      throw new Error(`Cannot select path on non-object value.`);
    }

    const [key, ...rest] = parts;

    return selectValue(value[key], rest);
  }

  // recursive function to assign a value at a path in an object or an array of
  function assignValue(
    value: any,
    parts: [string] | [string, ...string[]],
    newValue: any
  ) {
    if (!value || typeof value !== 'object') {
      return;
    }

    const [key, ...rest] = parts;

    if (rest.length > 1) {
      assignValue(value[key], rest as any, newValue);
    } else {
      value[key] = newValue;
    }
  }

  /**
   * @internal
   *
   * @see {@link QuantumStateHook}
   */
  function useQuantumState<P extends PathStr>(
    pathOrAccessor: P | Accessor
  ): QuantumStateHookReturn<T, P> {
    // the value. This value is mutated directly by all components that use the hook.
    const ctx = useContext(context);

    // a stable reference to the path or accessor function
    const argRef = useRef(pathOrAccessor);

    // a stable reference to the resolved path string
    const pathStrRef = useRef(getPathParts(argRef.current).join('.'));

    // the storage of the value at the path. This will be updated by the emitter when a new value is emitted.
    const [state, setState] = useState<ValueAtPathStr<T, P>>(() =>
      getPropertyAtPath(ctx, argRef.current)
    );

    // a wrapped setter that updates state and emits the new value to all subscribers
    const wrappedSetter = useCallback(
      (value: SetStateAction<ValueAtPathStr<T, P>>) => {
        if (!isCallable(value)) {
          setState(value);
          setValueAtPath(ctx, argRef.current, value);
          emitter.emit(pathStrRef.current, value);
        } else {
          setState((prev) => {
            const next = value(prev);
            setValueAtPath(ctx, argRef.current, next);
            emitter.emit(pathStrRef.current, next);
            return next;
          });
        }
      },
      [ctx]
    );

    // subscribe to the emitter when the component mounts. This is how state is kept in sync with the emitter.
    useEffect(() => {
      const pathStr = pathStrRef.current;
      const listener = (value: ValueAtPathStr<T, P>) => {
        setState(value);
      };

      emitter.on(pathStr, listener);

      return () => {
        emitter.off(pathStr, listener);
      };
    }, []);

    return [state, wrappedSetter] as const;
  }

  /**
   * @internal
   *
   * @see {@link QuantumProvider}
   */
  const quantumProvider = forwardRef(
    (
      { value, children }: QuantumProviderProps<T>,
      ref: ForwardedRef<QuantumEmitter<T>>
    ) => {
      // specialized versions of the `on`, `once`, and `emit` methods that are exposed via the ref.
      // These methods return an unsubscribe function that can be used to remove the listener when the component unmounts.
      useImperativeHandle(ref, () => ({
        on(
          event: QuantumPath<T>,
          listener: (value: ValueAtPathStr<T, typeof event>) => void
        ) {
          emitter.on(event, listener);
          return () => emitter.off(event, listener);
        },
        once(
          event: QuantumPath<T>,
          listener: (value: ValueAtPathStr<T, typeof event>) => void
        ) {
          emitter.once(event, listener);
          return () => emitter.off(event, listener);
        },
        emit(event: QuantumPath<T>, value: ValueAtPathStr<T, typeof event>) {
          // defer the emit to the next tick to ensure the value is updated before the listeners are called.
          setTimeout(() => emitter.emit(event, value), 0);
        },
      }));

      // this is the enforcement of the invariant that a value must be provided if no default value is set.
      if (!value && !defaultValue)
        throw new Error(`No value provided and no default value set.`);

      // The default value is stored in a state so that it will not be re-evaluated on re-renders.
      // The default value is cloned to prevent mutation of the default value.
      const [defaultValueClone] = useState(() =>
        !defaultValue ? null : (cloneDeep(defaultValue) as T)
      );

      return (
        <context.Provider
          value={
            // This is how the defaultValue is provided, giving precedence to the value prop if it is set.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value ?? defaultValueClone!
          }
        >
          {children}
        </context.Provider>
      );
    }
  ) as QuantumProvider<T>;

  // finally return the `QuantumProvider` and the `useQuantumState` hook
  return [quantumProvider, useQuantumState] as const;
}

/**
 * Alias for any string keyed object.
 *
 * @public
 */
export type Obj = Record<string, any>;

/**
 * A callback function that is called with a path capturing proxy object.
 *
 * @public
 *
 * @template T - The state _(aka. object or array of objects)_
 */
export type AccessorFn<T> = (x: T) => any;

/**
 * A type that represents a path to a property in an object or an array of objects.
 *
 * @public
 *
 * @template T - The state _(aka. object or array of objects)_
 *
 * @example Producing a string literal union type:
 * ```ts
 * type Test = QuantumPath<{ a: { b: { c: number, d: string } } }>; // 'a.b.c' | 'a.b.d'
 * ```
 */
export type QuantumPath<T> = T extends infer t extends Obj[]
  ? `${number}.${QuantumPath<t[number]>}`
  : T extends infer t extends Obj
    ? `${keyof t & string}`
    : '';

/**
 * Get the value type of a property at a given path in an object or an array of objects.
 * The path is represented as a period delimited string.
 *
 * @public
 *
 * @template T - The state _(aka. object or array of objects)_
 * @template P - The {@link QuantumPath | path string}.
 *
 * @example Narrowing to the type of a property using a string:
 * ```ts
 * type Test = ValueAtPathStr<{ a: { b: { c: number, d: string } } }, 'a.b.c'>; // number
 * ```
 */
export type ValueAtPathStr<T, P extends string> = ValueAtPath<
  T,
  SplitString<P>
>;

/**
 * Get the value type of a property at a given path in an object or an array of objects.
 * The path is represented as a tuple of strings.
 *
 * @public
 *
 * @template T - The state _(aka. object or array of objects)_
 * @template P - The {@link QuantumPath | path} as a tuple of strings.
 *
 * @example Narrowing to the type of a property using a tuple:
 * ```ts
 * type Test = ValueAtPath<{ a: { b: { c: number, d: string } } }, ['a', 'b']>; // { c: number, d: string }
 * ```
 */
export type ValueAtPath<T, P extends string[]> = P extends infer p extends
  | [string]
  | [string, ...string[]]
  ? T extends { [K in p[0]]: infer U }
    ? ValueAtPath<U, Tail<p>>
    : never
  : P extends []
    ? T
    : never;

/**
 * Recursively split a string by periods.
 *
 * @public
 *
 * @template S - The string to split.
 *
 * @example Producing a tuple of strings:
 * ```ts
 * type Test = SplitString<'a.b.c'>; // ['a', 'b', 'c']
 * ```
 */
export type SplitString<S extends string> = S extends `${infer a}.${infer b}`
  ? [a, ...SplitString<b>]
  : [S];

/**
 * Get the tail of a tuple.
 *
 * @public
 *
 * @template T - The tuple to get the tail of.
 *
 * @example Retaining all elements except the first:
 * ```ts
 * type Test = Tail<[1, 2, 3]>; // [2, 3]
 * ```
 */
export type Tail<T extends any[]> = T extends [infer _, ...infer rest]
  ? rest
  : [];

/**
 * Check if a value is a function. This type guard is intentionally loose to allow for more flexibility.
 *
 * @public
 *
 * @param fn - the value to check.
 * @returns `true` if the value is a function, `false` otherwise.
 */
export function isCallable(fn: any): fn is (...args: any[]) => any {
  return typeof fn === 'function';
}
