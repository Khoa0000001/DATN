export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center opacity-[0.75] bg-[rgba(0,0,0,0.6)] z-900">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
