import { createPortal } from "react-dom";

export default function CenteredBox({
  children,
  zIndex = 0,
}: {
  children: React.ReactNode;
  zIndex?: number;
}) {
  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center z-${zIndex}`}
    >
      <div className="min-w-[400px] min-h-[450px] bg-white p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </div>,
    document.body
  );
}
