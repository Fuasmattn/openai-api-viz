export const Skeleton = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} w-full h-full rounded-lg animate-pulse bg-slate-100 dark:bg-slate-700`}
    ></div>
  );
};
