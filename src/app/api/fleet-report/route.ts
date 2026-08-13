import { defaultReportTemplate } from '@helix-hq/pdf-report';
import { renderReportToBuffer } from '@helix-hq/pdf-report/server';

import { loadFleetReportInput } from '@/lib/fleet-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The headless path: no editor, no client, no posted template.
 *
 * A real app would load the template from wherever it stores them — the package
 * stores nothing — and hand it whatever data the report is about. This is the
 * shape a scheduled job or an email attachment would use.
 */
export const GET = async () => {
  const input = await loadFleetReportInput();

  const pdf = await renderReportToBuffer(defaultReportTemplate, {
    input,
    branding: {
      title: 'Fleet report',
      subtitle: 'Generated server-side from live data',
      generatedAt: new Date().toUTCString(),
    },
  });

  return new Response(Buffer.from(pdf), {
    headers: {
      'cache-control': 'no-store',
      'content-disposition': 'inline; filename="fleet-report.pdf"',
      'content-type': 'application/pdf',
    },
  });
};
