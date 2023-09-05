import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setField, loginUser, logoutUser } from "../../Redux/Reducers/LoginSlice";

function Login(props) {
  const { email, password, error } = props;

  const onChange = (e) => {
    console.log("Changing field:", e.target.name, e.target.value);
    props.setField({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Redux Store Data:", email, password);
      const authUser = {
        email,
        password,
      };
      console.log("Submitting login data:", authUser);
      props.logoutUser();
      props.loginUser(authUser);
    }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
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
            autoComplete="new-password"
          />
        </div>
        {/* Display error */}
        {error && <p>{error.errors[0].msg}</p>}
        <input type="submit" value="Login" />
      </form>
      <br />
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
    error: state.login.error,
  };
};

const mapDispatchToProps = {
  setField,
  loginUser,
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

