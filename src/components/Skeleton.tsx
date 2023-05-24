export const Skeleton = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} w-full h-full rounded-lg animate-pulse dark:bg-slate-700`}
    ></div>
  );
};
