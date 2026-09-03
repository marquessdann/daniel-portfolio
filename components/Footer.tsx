export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-center font-mono text-xs text-faint md:flex-row md:text-left">
        <span>Daniel Marques © {new Date().getFullYear()}</span>
        <span>Backend · APIs · AI</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
