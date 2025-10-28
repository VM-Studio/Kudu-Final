export default function Logo({ className = "" }: { className?: string }) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {/* Marca KUDU minimal */}
        <div className="h-6 w-6 rounded-lg bg-[#647A8B] shadow-[0_0_0_1px_rgba(100,122,139,.4)]" />
        <span className="text-sm font-semibold tracking-widest text-white">KUDU</span>
      </div>
    );
  }
  