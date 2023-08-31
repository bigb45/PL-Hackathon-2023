import React from "react";

function FormRowBlank(props) {
  return (
    <div className="my-4 flex justify-between items-center">
      <p>{props.title}</p>
      {props.children}
    </div>
  );
}

export default FormRowBlank;
