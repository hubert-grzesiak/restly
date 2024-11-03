// app/dashboard/page.js
"use client";

import { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/users");
    const result = await res.json();
    setData(result);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={fetchData}>Load Users</button>
      {data && data.map((user) => <p key={user.id}>{user.name}</p>)}
    </div>
  );
};

export default Dashboard;
