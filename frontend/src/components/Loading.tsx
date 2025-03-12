const Loading = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold">{title}</p>
    </div>
  );
};

export default Loading;
