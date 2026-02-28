import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [role, setRole] = useState("student");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  // ✅ LOGIN CONNECTED TO BACKEND
  const handleLogin = async () => {
    if (!loginData.username || !loginData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await api.post("/api/users/login", {
        username: loginData.username,
        password: loginData.password,
        role: role === "faculty" ? "FACULTY" : "STUDENT"
      });

      const user = response.data;

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "FACULTY") {
        navigate("/faculty");
      } else {
        navigate("/student");
      }

    } catch (error) {
      alert("Invalid username or password");
    }
  };

  // ✅ SIGNUP CONNECTED TO BACKEND
  const handleSignUp = async () => {
    if (
      !signUpData.fullname ||
      !signUpData.email ||
      !signUpData.username ||
      !signUpData.password ||
      !signUpData.confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/api/users", {
        username: signUpData.username,
        email: signUpData.email,
        password: signUpData.password,
        role: role === "faculty" ? "FACULTY" : "STUDENT"
      });

      alert("Account created successfully!");
      setIsSignUp(false);

    } catch (error) {
      alert("Error creating account");
    }
  };

  const handleClear = () => {
    if (isSignUp) {
      setSignUpData({
        fullname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
      });
    } else {
      setLoginData({ username: "", password: "" });
    }
  };

  return (
    <div className="login-container">
      <h2>College Cloud LMS</h2>

      <div className="login-form-card">
        <div className="role-select">
          <button onClick={() => setRole("faculty")}>
            Faculty
          </button>
          <button onClick={() => setRole("student")}>
            Student
          </button>
        </div>

        {!isSignUp ? (
          <>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <div className="btn-group">
              <button onClick={handleLogin}>Sign In</button>
              <button onClick={handleClear}>Clear</button>
            </div>

            <p>
              Don't have an account?
              <span onClick={() => setIsSignUp(true)}> Sign Up</span>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={signUpData.fullname}
              onChange={(e) =>
                setSignUpData({ ...signUpData, fullname: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Username"
              value={signUpData.username}
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value
                })
              }
            />

            <div className="btn-group">
              <button onClick={handleSignUp}>Create Account</button>
              <button onClick={handleClear}>Clear</button>
            </div>

            <p>
              Already have an account?
              <span onClick={() => setIsSignUp(false)}> Sign In</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;