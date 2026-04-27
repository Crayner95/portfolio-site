interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: string;
  className?: string;
}

export default function ImagePlaceholder({
  label,
  aspectRatio = "aspect-video",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${aspectRatio} ${className} border border-dashed border-gold/60 bg-gold/5 flex flex-col items-center justify-center gap-3 rounded-[4px]`}
    >
      <div className="w-8 h-8 border border-gold/40 rounded-full flex items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-gold/60"
        >
          <rect x="1" y="1" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
          <path d="M1 9l3-3 3 3 3-4 3 4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
        </svg>
      </div>
      <p className="font-mono text-[10px] text-gold/70 tracking-wider uppercase text-center px-4 leading-relaxed">
        {label}
      </p>
    </div>
  );
}
