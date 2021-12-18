import React, { useState } from 'react';

const useToggle = (initialState) => {
  const [state, setState] = useState(initialState || false);

  const toggleState = () => {
    setState((st) => !st);
  };

  return [state, toggleState];
};

export default useToggle;
