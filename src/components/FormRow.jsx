"use client";
import React from "react";

function FormRow(props) {
  var inputType = props.isNumeric ? "number" : "text";
  return (
    <div className="my-4 flex justify-between items-center">
      <div className="flex ">
        <p>{props.title}</p>{" "}
        <p className="text-red-500">{props.required ? "*" : null}</p>
      </div>
      <input
        type={inputType}
        allowDecimals={false}
        min={0}
        onChange={(e) => {
          validateInput(e);
        }}
        placeholder={props.hint}
        className="p-2 focus: outline-none border border-b border-zinc-500 rounded-lg w-1/2"
      />
    </div>
  );
}

FormRow.defaultProps = {
  isNumeric: true,
  required: true,
};

function validateInput(e) {
  if (e.target.value.includes(".")) {
    e.target.value = Math.floor(e.target.value);
  }
  if (e.target.value < 0) {
    e.target.style.borderColor = "red";
  } else {
    e.target.style.borderColor = "black";
  }
  // update the state with the latest value
  // props.handleChange(e);
}

export default FormRow;
