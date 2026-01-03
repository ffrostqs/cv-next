export function FooterMeta({
  copyright,
  builtWith,
}: {
  copyright: string;
  builtWith: string;
}) {
  return (
    <div className="border-t border-slate-800 mt-12 pt-6 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-4">
      <span>{copyright}</span>
      <span>{builtWith}</span>
    </div>
  );
}
