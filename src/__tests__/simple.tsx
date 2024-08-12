import { expect, it } from '@jest/globals';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { BaseHTMLAttributes, useEffect, useRef } from 'react';
import { createQuantumContext } from '..';

function createTestMaterials() {
  const [TestProvider, useQuantumState] = createQuantumContext({ a: 1, b: 2 });

  return { TestProvider, TestComponent, useQuantumState };

  function TestComponent(props: BaseHTMLAttributes<HTMLDivElement>) {
    const [value, setValue] = useQuantumState('a');

    return (
      <div
        {...props}
        data-value={value}
        onClick={() => {
          setValue((prev) => prev + 1);
        }}
      />
    );
  }
}

it('renders without crashing', () => {
  const { TestProvider, TestComponent } = createTestMaterials();

  const { asFragment } = render(
    <TestProvider>
      <TestComponent />
    </TestProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('supports custom values', () => {
  const { TestProvider, TestComponent } = createTestMaterials();

  const { asFragment } = render(
    <TestProvider value={{ a: 3, b: 4 }}>
      <TestComponent />
    </TestProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('supports synced peers', () => {
  const { TestProvider, TestComponent, useQuantumState } =
    createTestMaterials();

  const { asFragment } = render(
    <TestProvider>
      <TestComponent>Item</TestComponent>
      <OtherComponent />
    </TestProvider>
  );

  expect(asFragment()).toMatchSnapshot();

  act(() => {
    screen.getByText('Item').click();
  });

  expect(asFragment()).toMatchSnapshot();

  function OtherComponent() {
    const [value] = useQuantumState('a');

    return <div>{value}</div>;
  }
});

it('does not rerender unrelated peers', () => {
  const { TestProvider, TestComponent, useQuantumState } =
    createTestMaterials();

  const { asFragment } = render(
    <TestProvider>
      <TestComponent>Item</TestComponent>
      <OtherComponent />
    </TestProvider>
  );

  expect(asFragment()).toMatchSnapshot();

  act(() => {
    screen.getByText('Item').click();
  });

  expect(asFragment()).toMatchSnapshot();

  function OtherComponent() {
    const [_] = useQuantumState('b');
    const nRef = useRef(0);

    useEffect(() => {
      nRef.current++;
    });

    return <div>Unrelated | count: {nRef.current}</div>;
  }
});
