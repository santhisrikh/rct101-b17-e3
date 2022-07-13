import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      res = await res.json();
      // update auth
      console.log(res);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: res.token
        }
      });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <div>
          <label>
            {" "}
            Email
            <input
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Password
            <input
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </label>
        </div>
        <div>
          <input data-testid="form-submit" type="submit" value="SUBMIT" />
        </div>
      </form>
      <div>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
}
export default Login;
