import "./App.css";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import UserEdit from "./UserEdit";

function App() {
  return (
    <div className="App">
      <ul className="nav-list">
        <li>
          <NavLink to="/">User List</NavLink>
        </li>
        <li>
          <NavLink to="/add-user">Add User</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<UserAdd />} />
        <Route path="/edit-user/:id" element={<UserEdit />} />
      </Routes>
    </div>
  );
}

export default App;
