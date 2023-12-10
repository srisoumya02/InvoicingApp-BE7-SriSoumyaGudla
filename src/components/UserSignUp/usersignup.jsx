import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar";

const SignUpPage = () => {

  const [requestResponse, setRequestResponse] = useState({
    textMesssage: '',
    alertClass: ''
  })

  const initialValues = {
    name: '',
    email: '',
    password: '',
  }
  const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log(values)
    axios.post("http://127.0.0.1:8000/api/user/signup/", values)
      .then((response) => {
        console.log(response.data);
        setRequestResponse({
          textMesssage: "Registration Sucessfull",
          alertClass: 'alert alert-success'
        })
        navigate("/user/Login/");
      },
        (error) => {
          console.log(error);

          setRequestResponse({
            textMesssage: error.response.data.message,
            alertClass: 'alert alert-danger'
          })
          console.log(error.response.data.message)
        })
      .catch((error) => { console.log(error) })
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('email is required').email('email must be valid'),
    password: Yup.string().required('password is required').min(6, 'password must be atleast 6 characters'),
  });

  const Formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  })

  return (
    <>
      <Navbar />
   
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-5" style={{ display: "flex", justifyContent: "center", border: "solid lightgrey", padding: "20px", margin: "30px" }}>
            <div className="wrapper">
              <div className={requestResponse.alertClass} role="alert">
                {requestResponse.textMesssage}
              </div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>Sign-Up</h1>


              <form onSubmit={Formik.handleSubmit}>
                <div className="form-group">
                  <input type="text"
                    name="name"
                    placeholder="name"
                    id="name"
                    className={Formik.touched.Name && Formik.errors.name ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.name}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.name && Formik.errors.name ? (
                    <small className="text-danger">{Formik.errors.name}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <input type="text"
                    name="email"
                    placeholder="Email Addresses"
                    id="email"
                    className={Formik.touched.email && Formik.errors.email ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.email && Formik.errors.email ? (
                    <small className="text-danger">{Formik.errors.email}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <input type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    className={Formik.touched.password && Formik.errors.password ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.password}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.password && Formik.errors.password ? (
                    <small className="text-danger">{Formik.errors.password}</small>
                  ) : null}
                </div>
                <button type="submit" className="btn-primary btn-block" >
                  <i className="fas fa-user-plus"></i>Sign Up
                </button>

              </form>
              <br />
              <p className="text-center">
                Already have an account? Login <Link to="/user/login/">here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage;