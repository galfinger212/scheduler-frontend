import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Appointment {
  id: number;
  date: string;
  hour: number;
}

const MyAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments/my-appointments");
        setAppointments(response.data);
      } catch (error: any) {
        alert("Error fetching appointments: " + error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Appointments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <p>
                <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Hour:</strong> {appointment.hour}:00
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
