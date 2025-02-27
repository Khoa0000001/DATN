export default function BlurFull({ zIndex }: { zIndex: number }) {
  return (
    <div
      className="absolute top-0 left-0 w-full min-h-full opacity-[0.75] bg-[rgba(0,0,0,0.6)]"
      style={{ zIndex }}
    ></div>
  );
}
