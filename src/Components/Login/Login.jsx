import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);

  async function LoginSubmit(userData) {
  
    isLoading(true);
    const { data } = await axios
      .post(
        `https://note-sigma-black.vercel.app/api/v1/users/signIn
      `,
        userData
      )
      .catch((error) => {
        console.log(error);
        isLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg + "!",
          footer: "Try Another Email",
        });
      });

    // console.log("data");
    isLoading(false);
    Swal.fire({
      icon: "success",
      title: "Congratulation",
      text: "You are logged in welcome home",
    });
    localStorage.setItem("token", data.token);
    navigate("/home");
  }

  const validationSchema = yup.object({
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "min length is 6 char"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: LoginSubmit,
  });

  return (
    <>
      <div className="parent  text-white vh-100 w-75 mx-auto d-flex  align-items-center">
        <div className="container h-100 rounded-3 p-4">
          <div className="row h-100 bg-white rounded-3 text-center justify-content-center">
            <div className="col-md-5 bg-left rounded-3">
              <div className="item text-capitalize h-100 d-flex justify-content-center flex-column align-items-center ">
                <h2 className="fw-bold fs-1 mb-3">welcome back!</h2>
                <p className="text-white">
                  if you are not joined to us please go to Register first
                </p>
                <Link className="btn-main" to="/register">
                  Register
                </Link>
              </div>
            </div>
            <div className="col-md-7 bg-white text-dark rounded-3">
              <div className="d-flex h-100 justify-content-center flex-column align-items-center">
                <h2 className="fs-1 text-main text-capitalize fw-bold ">
                  Login Now
                </h2>
                <div className="icons my-3">
                  <i className="fa-brands icon fa-facebook"></i>
                  <i className="fa-brands icon mx-4 fa-instagram"></i>
                  <i className="fa-brands icon fa-google"></i>
                </div>
                <form onSubmit={formik.handleSubmit} className="w-75">
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Enter Email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="text-danger mt-1 fw-bold text-start">
                      {formik.errors.email}
                    </p>
                  ) : (
                    ""
                  )}
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className="text-danger mt-1 fw-bold text-start">
                      {formik.errors.password}
                    </p>
                  ) : (
                    ""
                  )}
                  <button
                    type="submit"
                    className="btn-reg mt-3 w-100 d-flex justify-content-center"
                  >
                    {loading ? (
                      <Oval
                        height={20}
                        width={20}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
