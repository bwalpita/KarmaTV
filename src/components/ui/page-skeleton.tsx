export function PageSkeleton() {
  return (
    <main className="mx-auto max-w-[1280px] flex-1 animate-pulse px-4 py-16 sm:px-6">
      <div className="mx-auto mb-10 h-8 w-64 rounded-full bg-brand-maroon/10" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video rounded-xl bg-brand-maroon/10" />
            <div className="h-4 w-3/4 rounded bg-brand-maroon/10" />
          </div>
        ))}
      </div>
    </main>
  );
}
