'use client';

import { useEffect, useState, useCallback } from 'react';

type Sensor = {
  deviceName: string;
  temperature: number;
  humidity: number;
  timeStamp?: string;
};

export default function SensorList() {
  const [data, setData] = useState<Sensor[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSensors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSensors(); // initial
    const id = setInterval(fetchSensors, 60_000); // every 60s
    return () => clearInterval(id);
  }, [fetchSensors]);

  const handleManualRefresh = async () => {
    await fetchSensors();
  };

  const formatTimeStamp = (iso?: string) => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    const diff = Date.now() - d.getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 5) return 'just now';
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    
    return d.toLocaleString("en-GB").split(', ')[0];
  };

  if (error) {
    return (
      <section aria-live="polite" className="w-full max-w-3xl">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">Error: {error}</p>
          <button
            onClick={handleManualRefresh}
            className="mt-3 inline-flex items-center gap-2 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-[80%] max-w-3xl">
      {/* <header className="mb-6 flex w-full items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Sensors
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Live updates every 60s
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleManualRefresh}
            className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100"
            aria-pressed="false"
          >
            Refresh
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 1 1-3.9-7.1" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header> */}

      {loading && !data ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse rounded-lg border bg-white p-4 shadow-sm dark:bg-zinc-900">
              <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mt-3 h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mt-2 h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mt-4 h-3 w-1/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data?.map((sensor) => {
            const timestamp = sensor.timeStamp;
            const time = formatTimeStamp(timestamp);

            // stale if older than 1 hour or invalid timestamp
            let isStale = true;
            if (timestamp) {
              const t = new Date(timestamp).getTime();
              isStale = Number.isNaN(t) ? true : Date.now() - t > 60 * 60 * 1000;
            }

            const textClass = isStale
              ? 'mt-4 text-xs text-red-600 dark:text-red-400'
              : 'mt-4 text-xs text-zinc-500 dark:text-zinc-400';

            return (
              <article
                key={sensor.deviceName}
                className="relative overflow-hidden rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      {sensor.deviceName}
                    </h2>

                    <div className="mt-1 flex items-center gap-3">
                      <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Temperature</p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                              {sensor.temperature}°C
                            </span>
                            <TempBadge temp={sensor.temperature} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">Humidity</p>
                    <div className="mt-2 w-44">
                      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div
                          className="h-2 rounded-full bg-sky-500"
                          style={{ width: `${Math.max(0, Math.min(100, sensor.humidity))}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                        {sensor.humidity}%
                      </div>
                    </div>
                    <div className={textClass}>
                      <time>
                        {time}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function TempBadge({ temp }: { temp: number }) {
  const color =
    temp >= 30 ? 'bg-red-500 text-white' : temp >= 20 ? 'bg-amber-400 text-black' : 'bg-emerald-400 text-black';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
      {temp >= 30 ? 'Hot' : temp >= 20 ? 'Warm' : 'Cool'}
    </span>
  );
}