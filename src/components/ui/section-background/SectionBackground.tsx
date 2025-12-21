export function SectionBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
    </div>
  );
}
