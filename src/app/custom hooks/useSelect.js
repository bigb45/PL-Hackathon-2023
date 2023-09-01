import React, { useState } from "react";
export const useSelect = (initial = "") => {
  const [state, setState] = useState(initial);
  const setSelect = (newState) => {
    setState(newState);
  };
  return [state, setSelect];
};
