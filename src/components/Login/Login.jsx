import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firbase/firbase.init";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../Root/Root";

const Login = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState({});
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //console.log(auth);
  const provider = new GoogleAuthProvider();

  // Google provider
  // const handleGoogleSignIn = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const loginUser = result.user;
  //       console.log(loginUser);
  //       setUser(loginUser);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // const handleGoogleSingOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       setUser(null);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // singIn user by email address

  const LogInUserByEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset Error state
    setLoginError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Sign in success, update UI with the signed-in user's information
        const loginUser = result.user;
        console.log(loginUser);
        setUser(loginUser);
        setSuccess("Successfully Login");
      })
      .catch((err) => {
        console.log(err);
        setLoginError(err.message);
      });
  };

  // sing Out user by email address
  const handelSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setSuccess("Successfully Logged Out");
        // Sign-out successful.
      })
      .catch((err) => {
        //console.log(err);
        setLoginError(err.message);
        // An error happened.
      });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={LogInUserByEmail} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder=" Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div> */}
              <div className="form-control ">
                <div>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                </div>

                <div className=" form-control relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered"
                    required
                  />
                  <span
                    className=" absolute right-2 top-1/3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* login & logout use email and password */}

              <div className="form-control mt-6">
                {user ? (
                  <button onClick={handelSingOut} className="btn btn-primary">
                    SignOut
                  </button>
                ) : (
                  <button
                    // onSubmit={LogInUserByEmail}
                    className="btn btn-primary"
                  >
                    SignIn
                  </button>
                )}
              </div>
            </form>
            <p className="mb-6 text-center">
              New to this website ? Please{" "}
              <Link to="/register" className="text-green-600">
                Register
              </Link>
            </p>
            {loginError && (
              <p className="alert alert-danger bg-red-500/100" role="alert">
                {loginError}
              </p>
            )}

            {success && (
              <p className="alert alert-success" role="alert">
                {success}
              </p>
            )}
            {/* <p className="m-6 text-center">
              New to this website Please{" "}
              <Link to="/register">Register Now</Link>
            </p> */}
          </div>
        </div>
      </div>

      {/* <div className=" pl-10 right-6 center">
        {user ? (
          <button onClick={handleGoogleSingOut} className="btn btn-primary">
            Google SingOut
          </button>
        ) : (
          <button onClick={handleGoogleSignIn} className="btn btn-primary">
            Google SingIn
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Login;
