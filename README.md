# pdf-report-nextjs-example

A standalone Next.js app using [`@helix-hq/pdf-report`](https://www.npmjs.com/package/@helix-hq/pdf-report)
**straight from npm** — nothing is vendored, and there is no monorepo behind it.

It shows the two ways an app uses the package:

- **`/editor`** — the full authoring UI (`ReportTemplateEditor`): input schema,
  sandboxed code, layout and a live preview, plus a download button that goes
  through the server render route.
- **`/api/fleet-report`** — the headless path. A route loads data, renders a
  template to a buffer and returns a PDF. No editor, no client. This is the shape
  a scheduled job or an email attachment would use.

## What you install

Rendering needs `react` and `react-dom`. The editor additionally needs
`@helix-hq/design-system` and `react-resizable-panels` — both optional peers of
the package, so an app that only renders PDFs installs neither.

## Run it

```sh
pnpm install
pnpm dev
```

→ http://localhost:3000

## What to look at

| File | Why |
| --- | --- |
| `next.config.ts` | `serverExternalPackages` is **not** optional — see the note below. |
| `src/app/api/pdf-report/route.ts` | The render route the editor posts to. The package ships no route on purpose: this is where *your* app decides auth, rate limits and branding. |
| `src/app/api/fleet-report/route.ts` | Server-side generation from your own data. |
| `src/app/globals.css` | Two prebuilt stylesheet imports. Tailwind cannot generate the editor's classes itself — see below. |
| `src/lib/fleet-data.ts` | Stands in for a real query. It only has to satisfy the template's `inputSchema`. |

## Two things that will bite you

**`serverExternalPackages`.** `@json-render/react-pdf` builds React contexts at
module scope. Under Next's `react-server` export condition `createContext` does
not exist, so the render throws. Externalising `@react-pdf/renderer` and
`@json-render/react-pdf` resolves them outside those conditions.

**The editor's stylesheet is prebuilt, and must be imported.** Tailwind does
not scan `node_modules`, so pointing `@source` at the installed package silently
generates nothing and every pane renders unstyled. Import
`@helix-hq/pdf-report/editor.css` for the classes and
`@helix-hq/design-system/globals.css` for the tokens they read.

## Storing templates

This example does not persist anything — it starts from
`defaultReportTemplate` every time, which keeps the example about the package.

A template is five JSON-serialisable fields (`inputSchema`, `code`,
`outputSchema`, `spec`, `demoInput`), so persistence is a column per part in
whatever database you already have. Saving each part on its own is worth doing:
the editor saves the pane that changed, and a whole-template write lets one stale
pane overwrite a fresh one.

## License

MIT.
