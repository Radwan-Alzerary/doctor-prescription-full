import React from "react";
import { useLoading, Circles } from "@agney/react-loading";

function Loading() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,

    indicator: <Circles className="fill-blue-700" width="80" />,
  });

  return (
    <div className=" fixed right-0 w-screen h-screen top-0   z-10 flex justify-center items-center">
      <div className=" absolute right-0 top-0 w-full h-full opacity-20 z-10 bg-black"></div>
      {indicatorEl} {/* renders only while loading */}
    </div>
  );
}

export default Loading;
