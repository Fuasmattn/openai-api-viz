export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} w-full h-full animate-pulse bg-gray-200`}
    ></div>
  );
};
