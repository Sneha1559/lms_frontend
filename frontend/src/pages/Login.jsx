import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({ fullname: "", email: "", username: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginData.username && loginData.password) {
      if (role === "faculty") {
        navigate("/faculty");
      } else {
        navigate("/student");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleSignUp = () => {
    if (signUpData.fullname && signUpData.email && signUpData.username && signUpData.password && signUpData.confirmPassword) {
      if (signUpData.password !== signUpData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      alert(`Account created successfully for ${signUpData.fullname} as ${role}`);
      setIsSignUp(false);
      setSignUpData({ fullname: "", email: "", username: "", password: "", confirmPassword: "" });
      setLoginData({ username: "", password: "" });
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleClear = () => {
    if (isSignUp) {
      setSignUpData({ fullname: "", email: "", username: "", password: "", confirmPassword: "" });
    } else {
      setLoginData({ username: "", password: "" });
    }
  };

  return (
    <div className="login-container">
      <h2>College Cloud LMS</h2>
      <div className="login-form-card">
        <div className="role-select">
          <button onClick={() => setRole("faculty")} style={role === "faculty" ? {background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", borderColor: "transparent"} : {}}>Faculty</button>
          <button onClick={() => setRole("student")} style={role === "student" ? {background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", borderColor: "transparent"} : {}}>Student</button>
        </div>

        {!isSignUp ? (
          <>
            <input 
              type="text" 
              placeholder="Username" 
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />

            <div className="btn-group">
              <button onClick={handleLogin}>Sign In</button>
              <button onClick={handleClear}>Clear</button>
            </div>

            <div className="signup-toggle">
              <p>Don't have an account? <span onClick={() => setIsSignUp(true)}>Sign Up</span></p>
            </div>
          </>
        ) : (
          <>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={signUpData.fullname}
              onChange={(e) => setSignUpData({...signUpData, fullname: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={signUpData.email}
              onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Username" 
              value={signUpData.username}
              onChange={(e) => setSignUpData({...signUpData, username: e.target.value})}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={signUpData.password}
              onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={signUpData.confirmPassword}
              onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
            />

            <div className="btn-group">
              <button onClick={handleSignUp}>Create Account</button>
              <button onClick={handleClear}>Clear</button>
            </div>

            <div className="signup-toggle">
              <p>Already have an account? <span onClick={() => setIsSignUp(false)}>Sign In</span></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;