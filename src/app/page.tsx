import Link from 'next/link';

const Home = () => (
  <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-8 px-6 py-16">
    <header className="space-y-3">
      <p className="text-muted-foreground font-mono text-xs tracking-[0.16em] uppercase">
        @helix-hq/pdf-report
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">PDF reports, defined as data</h1>
      <p className="text-muted-foreground text-sm leading-relaxed">
        A report here is a sandboxed code step that computes display values and a JSON layout that
        places them — stored, versioned and edited without a redeploy. This example shows both ways
        an app uses it.
      </p>
    </header>

    <div className="grid gap-4 sm:grid-cols-2">
      <Link
        className="hover:bg-muted/40 group rounded-lg border p-5 transition-colors"
        href="/editor"
      >
        <h2 className="font-medium">Author a template →</h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          The full editor: input schema, code, layout and a live preview. Edits re-render in the
          browser, so there is no round trip while you type.
        </p>
      </Link>

      <a className="hover:bg-muted/40 rounded-lg border p-5 transition-colors" href="/api/fleet-report">
        <h2 className="font-medium">Generate one server-side →</h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          The headless path: a route loads data, renders the template to a buffer and returns a PDF.
          No editor, no client involved.
        </p>
      </a>
    </div>

    <footer className="text-muted-foreground text-xs">
      Everything here comes from npm — nothing is vendored. See{' '}
      <a className="underline" href="https://helix-kit.com/docs/packages/pdf-report">
        the documentation
      </a>
      .
    </footer>
  </main>
);

export default Home;
