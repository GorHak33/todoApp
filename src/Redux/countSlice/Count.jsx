import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCount,
  decrementCount,
  reset,
  incrementByAmount,
} from "./countSlice";
import About from "../../Components/pages/About";

export default function Count() {
  const count = useSelector(state => state.count.count);
  const dispatch = useDispatch();

  const resetCount = () => {
    dispatch(reset(0));
  };
  return (
    <div>
      <h1>Count Component</h1>
      <h2>{count}</h2>

      <button onClick={() => dispatch(incrementCount(1))}>
        Increment count
      </button>
      <button onClick={() => dispatch(decrementCount(1))}>
        Decrement count
      </button>
      <button onClick={resetCount}>Reset count</button>
      <button onClick={() => dispatch(incrementByAmount(count))}>
        Increment by amount
      </button>
      <About />
    </div>
  );
}
