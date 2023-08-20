import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setField, registerUser } from "../../Redux/Reducers/RegisterSlice";

function Register(props) {
  const { name, email, password, password2, error } = props;

  const onChange = (e) => {
    console.log("Changing field:", e.target.name, e.target.value);
    props.setField({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Redux Store Data:", name, email, password, password2);
    if (password !== password2) {
      console.log("password do not match");
    } else {
      const newUser = {
        name,
        email,
        password,
      };
      console.log("Submitting data:", newUser);
      props.registerUser(newUser);
    }
  };

  return (
    <div>
      <h1>Create your account</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength={6}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength={6}
          />
        </div>
        {/* Display error */}
        {error && <p>{error.errors[0].msg}</p>}
        <input type="submit" value="Register" />
      </form>
      <br />
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.register.name,
    email: state.register.email,
    password: state.register.password,
    password2: state.register.password2,
    error: state.register.error,
  };
};

const mapDispatchToProps = {
  setField,
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
