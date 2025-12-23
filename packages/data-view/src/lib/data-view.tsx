import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './data-view.css?inline';

export const DataView = component$(() => {
  useStylesScoped$(styles);

  return <>DataView works!</>;
});
