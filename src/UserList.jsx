import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "./App.css";

const UserList = () => {
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);
  const url = "http://localhost:3000/users";
  const getUsers = async () => {
    let res = await fetch(url);
    let data = await res.json();
    setuserData(data);
    setLoading(false);
    console.log(data);
  };
  const deleteUser = async (id) => {
    let res = await fetch(url + "/" + id, {
        method: "DELETE"
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
