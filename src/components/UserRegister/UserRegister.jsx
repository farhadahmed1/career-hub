import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firbase/firbase.init";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

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
    console.log(email, password);

    // reset Error state
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    } else if (/[A-Z]/.test.password) {
      setRegisterError(
        "length 6  two digits tow lowercase letters  one special case letter two uppercase letters"
      );
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

              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            {registerError && (
              <div className="alert alert-danger" role="alert">
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
