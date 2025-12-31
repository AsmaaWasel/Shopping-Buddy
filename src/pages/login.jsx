import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/auth.service";
import { getUserByUsername } from "../services/users.service";

const Login = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(username, password);

      localStorage.setItem("token", data.token);
      setToken(data.token);

      const user = await getUserByUsername(username);
      setUser(user);

      console.log("Logged in user:", user);

      // 🔹 redirect حسب username
      if (user.username === "johnd") {
        navigate("/dashboard"); // الادمن
      } else {
        navigate("/"); // باقي المستخدمين
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
