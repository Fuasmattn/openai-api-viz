interface Props {
  className?: string;
}

export const Skeleton = ({ className }: Props) => {
  return (
    <div
      className={`${className} w-full h-full animate-pulse bg-gray-200`}
    ></div>
  );
};
