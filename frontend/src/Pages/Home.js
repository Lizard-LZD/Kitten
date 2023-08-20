import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import { connect } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../Redux/Reducers/Reducer1"; // Import your action creators here

// Define mapStateToProps function
const mapStateToProps = (state) => {
  return {
    count: state.counter.count, // Bind counter slice's count state to the component's props
  };
};

// Define mapDispatchToProps function (using object syntax)
const mapDispatchToProps = {
  increment, // Bind the increment action creator to the component's props
  decrement, // Bind the decrement action creator to the component's props
  incrementByAmount, // Bind the incrementByAmount action creator to the component's props
};

// Define a React component
function MyComponent(props) {
  return (
    <div>
      <p>Count: {props.count}</p>
      <button onClick={() => props.increment()}>Increment</button>
      <button onClick={() => props.decrement()}>Decrement</button>
      <button onClick={() => props.incrementByAmount(5)}>Increment by 5</button>
      <br />
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

// Use connect to wrap the component and pass both mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
