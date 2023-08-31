import SkeletonTheme from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

function Container({ title, children }) {
  return (
    <div className="w-2/5 h-auto drop-shadow-lg justify-start flex flex-col p-10 bg-onPrimary border border-borderColor rounded-[4px] transition-all">
      <p className="text-4xl font-bold text-secondary pb">{title} </p>
      {children}
    </div>
  );
}

export default Container;
