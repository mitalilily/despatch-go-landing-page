export default function BrandMark({ className = "", compact = false }) {
  return (
    <div className={`inline-flex flex-col ${className}`.trim()}>
      <div className="flex items-end leading-none">
        <span className="font-headline text-[clamp(2rem,4vw,5rem)] font-black tracking-[-0.08em] text-[#6a1fc7]">
          Despatch
        </span>
        <span className="font-headline text-[clamp(2rem,4vw,5rem)] font-black tracking-[-0.08em] text-[#ff6a00]">
          GO
        </span>
      </div>
      {!compact ? (
        <span className="pl-[0.38em] pt-1 font-body text-[0.62rem] font-medium tracking-[0.7em] text-[#ff6a00] sm:text-[0.86rem]">
          LOGISTICS
        </span>
      ) : null}
    </div>
  );
}
