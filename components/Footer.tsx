export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-white py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-cormorant text-lg text-charcoal/60 italic">
          Celine Rayner
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/celinesr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-charcoal/50 hover:text-gold tracking-widest uppercase transition-colors duration-300"
          >
            LinkedIn
          </a>
          <span className="text-gold/30">·</span>
          <a
            href="mailto:hello@celinerayner.com"
            className="font-mono text-xs text-charcoal/50 hover:text-gold tracking-widest uppercase transition-colors duration-300"
          >
            hello@celinerayner.com
          </a>
        </div>
        <p className="font-mono text-xs text-charcoal/30">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
