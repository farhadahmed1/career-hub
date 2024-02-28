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
// import { useContext } from "react";
// import { UserContext } from "../Root/Root";

const Login = () => {
  // useing context api
  //   const [user, setUser] = useContext(UserContext);
  const [user, setUser] = useState({});

  const auth = getAuth(app);
  //console.log(auth);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loginUser = result.user;
        console.log(loginUser);
        setUser(loginUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogleSingOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // singIn user by email address

  const LogInUserByEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Sign in success, update UI with the signed-in user's information
        const loginUser = result.user;
        console.log(loginUser);
        setUser(loginUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // sing Out user by email address
  const handelSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);

        // Sign-out successful.
      })
      .catch((err) => {
        console.log(err);
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
            <form className="card-body">
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
              <div className="form-control">
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
              </div>

              {/* login & logout use email and password */}

              <div className="form-control mt-6">
                {user ? (
                  <button onSubmit={handelSingOut} className="btn btn-primary">
                    SignIn
                  </button>
                ) : (
                  <button
                    onSubmit={LogInUserByEmail}
                    className="btn btn-primary"
                  >
                    SignOut
                  </button>
                )}
              </div>
              <div className="form-control mt-6">
                {user ? (
                  <button
                    onClick={handleGoogleSingOut}
                    className="btn btn-primary"
                  >
                    Google SingOut
                  </button>
                ) : (
                  <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-primary"
                  >
                    Google SingIn
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
