import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../inputs/loginInput/LoginInput";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import BACKEND_URL from "../../utils/backendUrl";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const loginInfo = {
  email: "",
  password: "",
};

const LoginForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email."),
    password: Yup.string().required("Password is required"),
  });

  const submitLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BACKEND_URL}/login`, {
        email,
        password,
      });
      // const { message, ...rest } = data;
      dispatch({ type: "LOGIN", payload: data });
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login-1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login-2">
        <div className="login-2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={submitLogin}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  placeholder="Email address or phone number"
                  type="text"
                  name="email"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password?
          </Link>
          <SyncLoader
            color="#1876f2"
            loading={loading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a page </b>
          for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
