
import React, { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/allusers")
      .then((res) => res.json())   // backend returns JSON list
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li> // change based on your Users model field
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
