import React, { useState } from "react";
export const useSelect = (initial = "", setParent) => {
  const [state, setState] = useState(initial);
  const setSelect = (newState) => {
    setState(newState);
    setParent(newState);
  };
  return [state, setSelect];
};
