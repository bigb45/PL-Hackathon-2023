import React from "react";

function FormSection(props) {
  return (
    // set the border and title color to red in case of error in the form section
    <div className="my-4 py-2 px-5 border border-gray rounded-lg w-full h-full ">
      <p className="text-sm text-zinc-400 font-bold">{props.title}</p>

      <div className="p-4 ">
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default FormSection;
