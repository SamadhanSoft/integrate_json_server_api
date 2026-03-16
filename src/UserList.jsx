import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

const UserList = () => {
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);

  const getUsers = async () => {
    const url = "http://localhost:3000/users";
    let res = await fetch(url);
    let data = await res.json();
    setuserData(data);
    setLoading(false);
    console.log(data);
  };
  return (
    <div>
      <ul>
        <li className="user-list">
          <p className="bold">Name</p>
          <p className="bold">Email</p>
          <p className="bold">Phone</p>
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
                <button>View</button>
                <button>Delete</button>
                <button>Edit</button>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
