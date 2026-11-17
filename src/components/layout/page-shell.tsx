import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-3.5 sm:px-6 lg:px-8 pt-24 sm:pt-36 pb-20 sm:pb-24 min-w-0 overflow-x-clip">
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 break-words">
        {title}
      </h1>
      <p className="mt-2.5 sm:mt-3 max-w-3xl text-xs sm:text-base text-slate-500 font-medium leading-relaxed">
        {description}
      </p>
      <div className="mt-6 sm:mt-10 w-full min-w-0">{children}</div>
    </main>
  );
}
