import React from "react";
import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

import "./App.css";

const UserList = () => {
  const [userData, setuserData] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const url = "http://localhost:3000/users";

  const getUsers = useCallback(async () => {
    let res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let data = await res.json();
    setuserData(data);
    console.log(data);
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();
  }, [getUsers]);

  const deleteUser = async (id) => {
    let res = await fetch(url + "/" + id, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    res = await res.json();
    if (res) {
      alert("User deleted successfully");
      getUsers();
    } else {
      alert("Failed to delete user");
    }
  };

  const editUser = async (id) => {
    navigate("/edit-user/" + id);
  }
  return (
    <div>
      <ul>
        <li className="user-list">
          <p className="bold">Name</p>
          <p className="bold">Email</p>
          <p className="bold">Phone</p>
          <p className="bold">Username</p>
          <p className="bold">Password</p>
          <p className="bold">Action</p>
        </li>
        {userData &&
          userData.map((user) => (
            <li key={user.id} className="user-list">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.username}</p>
              <p>{user.password}</p>
              <p>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => editUser(user.id)}>Edit</button>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
