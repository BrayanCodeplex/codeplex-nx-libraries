import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { DataView } from './data-view';

test(`[DataView Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<DataView />);
  expect(screen.innerHTML).toContain('DataView works!');
});
