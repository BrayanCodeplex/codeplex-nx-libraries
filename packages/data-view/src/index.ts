import { qwikWebComponent } from '@builder.io/qwik';
import { CodeplexTable } from './lib/table';

export { CodeplexTable } from './lib/table';

// Registration of Web Component could be conditional or explicit
// This exports the custom element constructor
export const CodeplexTableElement = qwikWebComponent(CodeplexTable);
