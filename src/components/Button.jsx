import React from "react";

function Button(props) {
  return (
    <div>
      <button className="bg-CTA px-6 py-4 shadow-md rounded-md text-background font-semibold transform transition-transform hover:scale-105 ">
        {props.text}
      </button>
    </div>
  );
}

export default Button;
