import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-28 sm:pt-36 pb-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
        {description}
      </p>
      <div className="mt-10">{children}</div>
    </main>
  );
}
