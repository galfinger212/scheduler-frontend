import React, { useState, useEffect } from "react";
import api from "../services/api";

export function Scheduler() {
  const [availableHours, setAvailableHours] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(""); // User-selected date
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  // Fetch available hours whenever the selected date changes
  useEffect(() => {
    if (!selectedDate) return; // Skip fetching if no date is selected

    const fetchAvailableHours = async () => {
      try {
        const response = await api.get("/appointments/available", {
          params: { date: selectedDate }, // Pass the selected date
        });
        setAvailableHours(response.data);
      } catch (error: any) {
        alert("Error fetching available hours: " + error.response?.data?.message || error.message);
      }
    };

    fetchAvailableHours();
  }, [selectedDate]);

  const handleBooking = async () => {
    try {
      await api.post("/appointments/book", {
        date: selectedDate, // Use the selected date
        hour: selectedHour,
      });

      alert("Appointment booked successfully!");

      // Re-fetch available hours after booking
      const response = await api.get("/appointments/available", {
        params: { date: selectedDate }, // Fetch for the same date
      });

      setAvailableHours(response.data);
      setSelectedHour(null);
    } catch (error: any) {
      alert("Error booking appointment: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h1>Scheduler</h1>

      {/* Date Picker */}
      <div>
        <label>Select a date:</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>

      {/* Time Selector */}
      <div>
        <label>Select an hour:</label>
        <select
          value={selectedHour || ""}
          onChange={(e) => setSelectedHour(Number(e.target.value))}
          disabled={!selectedDate || availableHours.length === 0}
        >
          <option value="" disabled>
            {availableHours.length > 0 ? "Select an hour" : "No available hours"}
          </option>
          {availableHours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}:00
            </option>
          ))}
        </select>
      </div>

      {/* Booking Button */}
      <button onClick={handleBooking} disabled={!selectedDate || selectedHour === null}>
        Book Appointment
      </button>
    </div>
  );
}

export default Scheduler;
