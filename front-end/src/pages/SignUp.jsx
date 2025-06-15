// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       await axios.post("http://localhost:3000/api/auth/signup", {
//         email,
//         password,
//       });

//       alert("Registered successfully! You can now log in.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Error occurred during registration");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignup}>Register</button>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link for navigation
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    try {
      await axios.post("http://localhost:3000/api/auth/signup", {
        email,
        password,
      });

      alert("Registered successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred during registration");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>

      {/* ✅ Link to Sign In page */}
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </form>
  );
}
