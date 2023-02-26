import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }

    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }

    setErrors(errorObj);

    if (error) return;
    dispatch(loadingToggleAction(true));

    dispatch(loginAction(email, password, props.history));
  }

  return (
      <section>
    <div className="form_data">
      {props.showLoading && <Loader />}
      <div className="form_heading">
        <h1 className="form_heading_title">Login</h1>
        <p>Hi, we are you glad you are back. Please login.</p>
        </div>

        <form onSubmit={onLogin}>

        {props.errorMessage && (
          <div className="title_msg">
            {props.errorMessage}
          </div>
        )}
        {props.successMessage && (
          <div className="title_msg">
            {props.successMessage}
          </div>
        )}

          <div className="form_input">
            <label htmlFor="email">Email</label>
            <div className="form_input-is-text">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <div className="errors">{errors.email}</div>}
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Enter Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && <div className="errors">{errors.password}</div>}
          </div>

          <div className="btn">
            <button type="submit" className="btn_login">
              Login
            </button>
          </div>

        </form>
      {/* </div> */}
    </div>
      </section>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
