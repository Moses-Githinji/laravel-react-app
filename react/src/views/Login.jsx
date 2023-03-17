import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors({});

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                // Perform some checks based on the error response given
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        // If we experience an error during validation
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return (
        <form onSubmit={onSubmit} className="animated fadeInDown">
            <h1 className="title">Login into your Account</h1>
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
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
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Yet Registered? <Link to="/signup">Create an Account</Link>
            </p>
        </form>
    );
};

export default Login;
