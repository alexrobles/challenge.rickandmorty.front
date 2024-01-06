import React from "react";

interface ContextInterface {
  filterSelected?: { get: string; set: (value: string) => void};
}

const context: ContextInterface = {};

const Context = React.createContext(context);

export default Context;
