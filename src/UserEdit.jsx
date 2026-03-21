//import { useParams } from "react-router";
import { useState, useEffect, useContext, useCallback } from "react";
import "./App.css";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

const UserEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const { id } = useParams();
  console.log(id);
  const { token } = useContext(AuthContext);

  const url = "http://localhost:3000/users/" + id;
  let navigate = useNavigate();

  const getUserEdit = useCallback(async () => {
    let res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res = await res.json();
    console.log(res);
    setFirstName(res.firstName);
    setLastName(res.lastName);
    setEmail(res.email);
    setPhone(res.phone);
    setUsername(res.username);
    setPassword(res.password);
  }, [token, url]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserEdit();
  }, [getUserEdit]);

  const updateUserData = async () => {
    let res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, email, phone, username, password }),
    });
    res = await res.json();
    console.log(res);
    //console.log(name, lastName, email, phone, username);
    if (res) {
      setMsg("User updated successfully");
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 1000);
    } else {
      setMsg("User updated Failed");
      setIsSuccess(false);
    }
  };
  return (
    <div>
      <h1>Edit User</h1>
      <div
        className="form-data"
        style={{ backgroundColor: "#f0f0f0", padding: "20px" }}
      >
        <p>
          <input
            type="text"
            placeholder="First Name"
            className="form-control"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Last Name"
            className="form-control"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </p>
        <p>
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Phone"
            className="form-control"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>

        <button onClick={updateUserData}>Update User</button>
      </div>
      <p className={isSuccess ? "record-added success" : "record-added error"}>
        {msg}
      </p>
    </div>
  );
};

export default UserEdit;
