import React, { useState } from "react";
import "./App.css";

const UserAdd = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const createUser = async () => {
    //const url = "http://localhost:3000/users";
    console.log(name, lastName, email, phone, username);
    //clear textboc
    setName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setUsername("");
    const url = "http://localhost:3000/users";
    let res = await fetch(url,{
        method: "POST",
        body:JSON.stringify({
            firstName: name,
            lastName: lastName,
            email: email,
            phone: phone,
            username: username
        })
    });

    res = await res.json();
   if(res){
     setMsg("User added successfully");
     setIsSuccess(true);
   }
   else{
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
          />
        </p>
        <button onClick={createUser}>Add User</button>
      </div>
      <p className = {isSuccess ? "record-added success" : "record-added error"}>{msg}</p>

      {/* <p className={isSuccess ? "record-added success" : "record-added error"}>
  {msg}
</p> */}
    </div>
  );
};

export default UserAdd;
