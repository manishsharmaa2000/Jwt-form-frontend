import React from "react";
import "./static/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="card-container">
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <h2>500</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Teachers</h3>
          <h2>50</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Courses</h3>
          <h2>20</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <h2>550</h2>
        </div>
      </div>

      <div className="recent-section">
        <div className="recent-card">
          <h3>Recent Students</h3>

          <ul>
            <li>Rahul Sharma</li>
            <li>Priya Verma</li>
            <li>Aman Gupta</li>
            <li>Neha Singh</li>
          </ul>
        </div>

        <div className="recent-card">
          <h3>Recent Activities</h3>

          <ul>
            <li>New Student Added</li>
            <li>Course Updated</li>
            <li>Teacher Assigned</li>
            <li>User Login</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
