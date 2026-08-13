'use client';

import Link from 'next/link';
import { useState } from 'react';

import { defaultReportTemplate, fetchReportPdf, type ReportTemplate } from '@helix-hq/pdf-report';
import { ReportTemplateEditor } from '@helix-hq/pdf-report/editor';

const BRANDING = { title: 'Fleet report', subtitle: 'Authored in the browser' };

const EditorPage = () => {
  const [template, setTemplate] = useState<ReportTemplate>(defaultReportTemplate);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  // The download goes through the render route rather than the browser
  // renderer, so what you save is what the server would deliver.
  const download = async () => {
    setDownloading(true);
    try {
      const blob = await fetchReportPdf({ template, branding: BRANDING });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Failed to download the PDF');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="flex h-dvh flex-col">
      <header className="flex shrink-0 items-center gap-4 border-b px-4 py-3">
        <Link className="text-muted-foreground hover:text-foreground text-sm" href="/">
          ←
        </Link>
        <h1 className="text-sm font-medium">Report template editor</h1>

        {error === null ? null : (
          <span className="text-destructive truncate font-mono text-xs">{error}</span>
        )}

        <button
          className="bg-primary text-primary-foreground ml-auto rounded-md px-3 py-1.5 text-sm font-medium disabled:opacity-50"
          disabled={downloading}
          type="button"
          onClick={() => {
            void download();
          }}
        >
          {downloading ? 'Rendering…' : 'Download PDF'}
        </button>
      </header>

      <div className="min-h-0 flex-1">
        <ReportTemplateEditor
          branding={BRANDING}
          defaultValue={defaultReportTemplate}
          // `client` previews in the browser (no round trip); `server` proves
          // what a delivered document contains. Both run the same pipeline.
          renderMode="client"
          onChange={setTemplate}
          onError={setError}
        />
      </div>
    </main>
  );
};

export default EditorPage;
