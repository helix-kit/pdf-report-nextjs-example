/**
 * Stands in for whatever a real app would query — a database, an API, a
 * warehouse. The only contract that matters is that it satisfies the template's
 * `inputSchema`; the sandbox rejects it otherwise, before any rendering starts.
 */
export const loadFleetReportInput = async () => {
  const now = Date.now();
  const minutesAgo = (minutes: number) => new Date(now - minutes * 60_000).toISOString();

  return {
    reportTitle: 'Weekly fleet report',
    reportSummary:
      'Generated on the server from live data, with no editor involved. The code step aggregates and formats; the layout only places what it produced.',
    devices: [
      {
        deviceId: 'dev_01H8Z',
        name: 'gateway-pune-01',
        profile: 'edge-gateway',
        lastSeenAt: minutesAgo(2),
        uptimeSeconds: 601_240,
        eventsPublished: 18_422,
        faults: 0,
      },
      {
        deviceId: 'dev_01H8A',
        name: 'sensor-line-a-07',
        profile: 'esp32-sensor',
        lastSeenAt: minutesAgo(4),
        uptimeSeconds: 84_930,
        eventsPublished: 9_105,
        faults: 3,
      },
      {
        deviceId: 'dev_01H8B',
        name: 'sensor-line-a-08',
        profile: 'esp32-sensor',
        lastSeenAt: minutesAgo(19),
        uptimeSeconds: 172_800,
        eventsPublished: 11_780,
        faults: 0,
      },
      {
        deviceId: 'dev_01H8C',
        name: 'sensor-line-b-02',
        profile: 'esp32-sensor',
        lastSeenAt: minutesAgo(1_440),
        uptimeSeconds: 12_600,
        eventsPublished: 402,
        faults: 11,
      },
    ],
  };
};
