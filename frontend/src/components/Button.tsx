export default function Button({
  children,
  color,
  className = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  loading = false,
  loadingText = "Đang xử lý...",
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  loading?: boolean;
  loadingText?: string;
}) {
  return (
    <button
      disabled={loading}
      className={`hover:opacity-80 font-bold py-2 px-4 rounded cursor-pointer flex items-center justify-center gap-2 transition-opacity ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
      )}
      {loading ? loadingText : children}
    </button>
  );
}
