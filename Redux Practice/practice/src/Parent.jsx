import { useContext } from "react";
import { CONTEXT } from "./App";

function Parent() {
  const { count } = useContext(CONTEXT);
  
  return <p>Count from Parent: {count}</p>;
}

export default Parent;
