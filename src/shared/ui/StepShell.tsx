import type { StepShellProps } from './types';

export function StepShell({
  step,
  total,
  title,
  subtitle,
  children,
}: StepShellProps) {
  const progress = Math.round((step / total) * 100);
  return (
    <section className="w-full max-w-xl px-4 py-6 md:py-10">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 md:p-8">
        <header className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span>
              Шаг {step} из {total}
            </span>
            <span>{progress}%</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
