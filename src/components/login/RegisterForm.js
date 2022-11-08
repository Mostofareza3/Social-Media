import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import RegisterInput from "../inputs/registerInput/RegisterInput";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import BACKEND_URL from "../../utils/backendUrl";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const userInfo = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};

const RegisterForm = ({ setVisible }) => {
  const [user, setUser] = useState(userInfo);
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    first_name,
    last_name,
    email,
    password,
    bDay,
    bMonth,
    bYear,
    gender,
  } = user;

  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => tempYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const handleRegisterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your first name?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special character are not allowed."),
    last_name: Yup.string()
      .required("What's your last name?")
      .min(2, "last name must be between 2 and 16 characters.")
      .max(16, "last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special character are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password Must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),
  });

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BACKEND_URL}/register`, {
        first_name,
        last_name,
        email,
        password,
        bDay,
        bMonth,
        bYear,
        gender,
      });
      setError("");
      setSuccess(data.message);
      setTimeout(() => {
        const { message, ...rest } = data;
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bDay,
            bMonth,
            bYear,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);

            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMore70 = new Date(1970 + 70, 0, 1);

            // console.log(atleast14, noMore70);
            if (current_date - picked_date < atleast14) {
              setDateError("Age must be greater than 14.");
            } else if (current_date - picked_date > noMore70) {
              setDateError("Age must be under 70.");
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender that you can change later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="first name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_col_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                  days={days}
                  years={years}
                  months={months}
                />
              </div>
              <div className="reg_col">
                <div className="reg_col_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you may agree to our{" "}
                <span>Terms, Data Policy &nbps;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button type="submit" className="blue_btn open_signup">
                  Sign Up
                </button>
              </div>
              <SyncLoader
                color="#1876f2"
                loading={loading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
