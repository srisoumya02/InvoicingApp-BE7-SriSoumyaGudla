import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";

import Navbar from "../NavBar/Navbar";



const LoginPage = () => {


    const [requestResponse, setRequestResponse] = useState({
        textMesssage: '',
        alertClass: ''
    })

    const initialValues = {
        email: '',
        password: ''
    }
    const navigate = useNavigate();

    const onSubmit = (values) => {
        console.log(values)
        const val = JSON.stringify( values )
        console.log(val)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios
            .post("http://127.0.0.1:8000/api/user/login/", val, config)

            .then((response) => {

                try {
                    
                    const token = response.token;
                    console.log(token) // Assuming the API response contains a 'token' property
                    localStorage.setItem('token', token);
                  
                    setRequestResponse({
                        textMesssage: "Login Successful",
                        alertClass: 'alert alert-success'
                    });
                    navigate("/invoices/");
                } catch (error) {
                    // Response data is not in valid JSON format
                    console.log("Response data is not in valid JSON format:", response.data);
                    setRequestResponse({
                        textMesssage: "Login not successful",
                        alertClass: 'alert alert-danger'
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                setRequestResponse({
                    textMesssage: "Login not successful",
                    alertClass: 'alert alert-danger'
                });
            });
    }


    const validationSchema = Yup.object({
        email: Yup.string().required('user Name is required'),
        password: Yup.string().required('password is required').min(6, 'password must be atleast 6 characters')
    })
    return (
        <>
            <Navbar />
            <div className="container" >
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-5" style={{ display: "flex", justifyContent: "center", border: "solid lightgrey", padding: "20px", margin: "30px" }}>
                        <div className="wrapper">
                            <div className={requestResponse.alertClass} role="alert">
                                {requestResponse.textMesssage}
                            </div>
                            <h2 style={{ display: "flex", justifyContent: "center" }}>Login</h2>

                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                validationSchema={validationSchema}
                                validateOnMount
                            >
                                {
                                    (formik) => {
                                        return (
                                            <Form>
                                                <div className="form-group">
                                                    <Field
                                                        type="text"
                                                        name="email"
                                                        placeholder="email"
                                                        id="userName"
                                                        className={formik.touched.email && formik.errors.email ? "form-control is-invalid" : "form-control"}
                                                    />
                                                    <ErrorMessage name="email">
                                                        {(ErrorMessage) => (
                                                            <small className="text-danger">{ErrorMessage}</small>
                                                        )}
                                                    </ErrorMessage>

                                                </div>
                                                <div className="form-group">
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        id="password"
                                                        className={formik.touched.password && formik.errors.password ? "form-control is-invalid" : "form-control"}
                                                    />
                                                    <ErrorMessage name="password">
                                                        {(ErrorMessage) => (
                                                            <small className="text-danger">{ErrorMessage}</small>
                                                        )}
                                                    </ErrorMessage>

                                                </div>

                                                <button  type="submit" className="btn-primary btn-block" >
                                                    <i className="fas fa-sign-in-alt"></i> Login
                                                </button>

                                            </Form>
                                        )
                                    }
                                }

                            </Formik>

                            <br />
                            <p className="text-center">
                                Don't have an account? Sign up <Link to="/user/signup/">here</Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>


            </div>
        </>
    )
}

export default LoginPage;