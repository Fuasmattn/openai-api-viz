const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} shadow relative p-4 text-2xl opacity-50 font-bold bg-slate-700 rounded`}
    >
      <p className="text-2xl mb-6 w-3/4 h-8 rounded bg-slate-800"></p>
      <p className="text-2xl mb-2 w-1/3 h-4 rounded bg-slate-800"></p>
      <p className="text-2xl w-4/5 h-4 rounded bg-slate-800"></p>
    </div>
  );
};

export default Skeleton;
