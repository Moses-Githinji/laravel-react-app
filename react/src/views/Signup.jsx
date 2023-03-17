import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                // Perform some checks based on the error response given
                if (response && response.status === 422) {
                    // If we experience an error during validation
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <form onSubmit={onSubmit} className="animated fadeInDown">
            <h1 className="title">Register an Account</h1>
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <input
                ref={nameRef}
                type="text"
                name="text"
                placeholder="Your Name..."
            />
            <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Your Email..."
            />
            <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Your Password..."
            />
            <input
                ref={passwordConfirmationRef}
                type="password"
                name="password"
                placeholder="Confirm Your Password..."
            />
            <button className="btn btn-block">Register</button>
            <p className="message">
                Already Registered? <Link to="/login">Sign In</Link>
            </p>
        </form>
    );
};

export default Signup;
