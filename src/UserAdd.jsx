import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./App.css";

const UserAdd = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    clearForm();
  }, []);

  const clearForm = () => {
    setName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setUsername("");
    setPassword("");
  }
  const createUser = async () => {
    //const url = "http://localhost:3000/users";
    console.log(name, lastName, email, phone, username);
    //clear textbox

    setMsg("");

    //Validation
    if (!name.trim()) {
      setMsg("First Name is required");
      setIsSuccess(false);
      return;
    }

    if (!lastName.trim()) {
      setMsg("Last Name is required");
      setIsSuccess(false);
      return;
    }
    if (!email.trim()) {
      setMsg("Email is required");
      setIsSuccess(false);
      return;
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setMsg("Email is invalid");
      setIsSuccess(false);
      return;
    }
    if (!phone.trim()) {
      setMsg("Phone is required");
      setIsSuccess(false);
      return;
    }
    if (phone.length !== 10) {
      setMsg("Phone number must be 10 digits");
      setIsSuccess(false);
      return;
    }
    if (!username.trim()) {
      setMsg("Username is required");
      setIsSuccess(false);
      return;
    }
    if (!password.trim()) {
      setMsg("Password is required");
      setIsSuccess(false);
      return;
    }

    const url = "http://localhost:3000/users";

    let res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        firstName: name,
        lastName: lastName,
        email: email,
        phone: phone,
        username: username,
        password: password,
      }),
    });

    res = await res.json();
    if (res) {
      setMsg("User added successfully");
      setIsSuccess(true);
        clearForm();
      setTimeout(() => navigate("/"), 1000);
    } else {
      setMsg("Failed to add user");
      setIsSuccess(false);
    }
    console.log(res);
  };

  return (
    <div>
      <h1>Add New User</h1>

      {/* Form to add new user 
      {name && <p>Name: {name}</p>}
      {lastName && <p>Last Name: {lastName}</p>}
      {email && <p>Email: {email}</p>}
      {phone && <p>Phone: {phone}</p>}
      {username && <p>Username: {username}</p>}
      */}

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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            autoComplete="off"
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
            autoComplete="off"
          />
        </p>
        <button onClick={createUser}>Add User</button>
      </div>
      <p className={isSuccess ? "record-added success" : "record-added error"}>
        {msg}
      </p>
    </div>
  );
};

export default UserAdd;
