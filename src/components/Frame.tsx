import { Skeleton } from "./Skeleton";

export const Frame = ({
  children,
  isLoading,
}: {
  children?: React.ReactElement;
  isLoading?: boolean;
}) => {
  return (
    <div className="w-full h-full p-6 shadow-frame-outer bg-gradient-to-tr from-gray-800 to-gray-600 dark:from-gray-800 dark:to-gray-600">
      <div className="relative w-full h-full shadow-frame bg-white">
        <div className="absolute w-full h-full p-10">{children}</div>
        {isLoading && <Skeleton className="absolute p-10" />}
      </div>
    </div>
  );
};
