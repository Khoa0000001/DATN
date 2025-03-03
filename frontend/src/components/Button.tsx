export default function Button({
  children,
  color,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <button
      className={`hover:opacity-[.8] font-bold py-2 px-4 rounded cursor-pointer flex items-center justify-center gap-2 ${className}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}
