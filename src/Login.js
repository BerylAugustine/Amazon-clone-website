import React, { useState } from 'react';
import './Login.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginApi, RegisterApi } from './login/Api';

export const isAUthenticated = () => {
    return localStorage.getItem('idToken') != null ? true : false
}

function Login() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const initialStateErrors = {
        email: { required: false },
        name: { required: false },
        password: { required: false },
        custom_error: null
    };

    const [errors, setErrors] = useState(initialStateErrors)

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
    })

    const handleInput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        console.log(inputs)
    }

    const handleClick_logo = () => {
        navigate("/")
    }



    const signIn = async (e) => {
        e.preventDefault();

        e.preventDefault();
        let hasError = false;
        let errors = initialStateErrors
        if (inputs.name == "") {
            hasError = true;
            errors.name.required = true
        }
        if (inputs.email == "") {
            hasError = true;
            errors.email.required = true
        }
        if (inputs.password == "") {
            hasError = true;
            errors.password.required = true
        }

        if (!hasError) {
            setLoading(true)

            LoginApi(inputs).then((response) => {
                console.log(response)
                localStorage.setItem("idToken", response.data.idToken)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })


            // await signInWithEmailAndPassword(auth, email, password)
            //     .then((userCredential) => {
            //         console.log(userCredential)
            //         navigate("/")
            //     }).catch((error) => {
            //         console.log(error)
            //     })
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        let hasError = false;
        let errors = initialStateErrors
        if (inputs.name == "") {
            hasError = true;
            errors.name.required = true
        }
        if (inputs.email == "") {
            hasError = true;
            errors.email.required = true
        }
        if (inputs.password == "") {
            hasError = true;
            errors.password.required = true
        }

        if (!hasError) {
            setLoading(true)

            RegisterApi(inputs).then((response) => {
                console.log(response)
                localStorage.setItem("idToken", response.data.idToken)
            }).catch((err) => {
                if (err.response.data.error.message == "EMAIL_EXISTS") {
                    setErrors({ ...errors, custom_error: "Already this Email has been Registered" })
                } else if (String(err.response.data.error.message)) {
                    setErrors({ ...errors, custom_error: "Password should be at least 6 characters" })
                }
            }).finally(() => {
                setLoading(false)
            })
        }
        setErrors({ ...errors })
    }


    const handleSignIn = (e) => {
        console.log(inputs)
        e.preventDefault();
        let hasError = false;
        let errors = initialStateErrors;

        if (inputs.email == "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
            hasError = true;
        }

        if (!hasError) { //hasError!=true
            setLoading(true)
            //Sending register api request
            LoginApi(inputs).then((response) => {
                console.log(response)
                localStorage.setItem("idToken", response.data.idToken)
            }).catch((err) => {
                if (err.code = "ERR_BAD_REQUEST") {
                    setErrors({ ...errors, custom_error: "Invalid Credentials" })
                }
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }
        setErrors({ ...errors })
    }

    if (isAUthenticated()) {
        //redirect user to dashboard
        return <Navigate to='/' />
    }

    return (
        <div className='login'>

            <img
                className="login__logo"
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                onClick={handleClick_logo} />

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>User Name</h5>
                    <input type='text' name="name" onChange={handleInput} placeholder='Enter User-Name' />
                    {errors.name.required ?
                        (<span style={{ color: "red" }}>
                            Name is required.
                        </span>) : null}

                    <h5>E-mail</h5>
                    <input type='text' name='email' onChange={handleInput} placeholder='Enter-Email' />
                    {errors.email.required ?
                        (<span style={{ color: "red" }}>
                            Email is required.
                        </span>) : null}

                    <h5>Password</h5>
                    <input type='password' name='password' onChange={handleInput} placeholder='Enter-Password' />
                    {errors.password.required ?
                        (<span style={{ color: "red" }}>
                            Password is required.
                        </span>) : null}

                    <span style={{ color: "red" }} >
                        {errors.custom_error ?
                            (<p>{errors.custom_error}</p>) : null}
                    </span>
                    {loading ?
                        (<div className="text-center">
                            <div className="spinner-border text-primary " role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>) : null}

                    <button type='submit' onClick={handleSignIn} className='login__signInButton' disabled={loading}>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={handleRegister} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div >
    )
}

export default Login