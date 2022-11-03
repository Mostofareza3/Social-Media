import React from "react";
import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";

import "./style.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />

        <div className="register">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Login;
