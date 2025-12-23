import { component$, useStylesScoped$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './table.css?inline';

export interface TableRow {
    id: string | number;
    [key: string]: any;
}

export const CodeplexTable = component$((props: { data: string }) => {
    useStylesScoped$(styles);
    const rows = useSignal<TableRow[]>([]);

    useTask$(({ track }) => {
        track(() => props.data);
        if (props.data) {
            try {
                const parsed = JSON.parse(props.data);
                if (Array.isArray(parsed)) {
                    rows.value = parsed;
                }
            } catch (e) {
                console.error("Invalid data provided to CodeplexTable", e);
            }
        }
    });

    return (
        <table class="codeplex-table">
            <thead>
                <tr>
                    {rows.value.length > 0 && Object.keys(rows.value[0]).map(key => (
                        <th key={key}>{key.toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.value.map((row, i) => (
                    <tr key={row.id || i}>
                        {Object.values(row).map((val: any, j) => (
                            <td key={j}>{String(val)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
});
