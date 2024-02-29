import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firbase/firbase.init";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserRegister = () => {
  const auth = getAuth(app);

  const [register, setRegister] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Regular expression to match password requirements:
  // At least 8 characters long
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one number
  // Contains at least one special character

  const handleRegister = (e) => {
    e.preventDefault();
    //console.log("from register");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password, accepted);

    // reset Error state
    setRegisterError("");
    setSuccess("");

    // added validation
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Your password must be at least one uppercase ");
      return;
    } else if (!accepted) {
      setRegisterError("Please accept our terms and conditions");
      return;
    }
    //create user and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setRegister(user);
        setSuccess("Successfully registered");
      })
      .catch((err) => {
        console.log(err);
        setRegisterError(err.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>
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
              </div>
              <div>
                <input type="checkbox" name="terms" id="terms" />
                <label className="ml-2" htmlFor="terms">
                  {" "}
                  Accept Our Condition
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <p className="mb-6 text-center">
              Already have an account ? Please
              <Link to="/login" className="text-green-600 ml-1/2">
                {" "}
                Login
              </Link>
            </p>
            {registerError && (
              <div className="alert alert-danger  bg-red-500/100" role="alert">
                {registerError}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
