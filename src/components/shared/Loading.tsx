import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center">
      <Loader className="h-[100px] w-[100px] animate-spin" />
      <p className="font-medium text-neutral-500">Loading...</p>
    </div>
  );
};

export default Loading;
