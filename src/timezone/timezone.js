import React, { useState, useEffect } from 'react';
import './timezone.css';

const TimeZoneInput = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);


  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const timeSlots = ['5:00AM','5:30AM','6:00AM','6:30AM','7:00AM','7:30AM','8:00 AM','8:30AM',
     '9:00 AM','9:30AM', '10:00 AM','10:30AM',
    '11:00AM','11:30AM','12:00PM','12:30PM','1:00AM','1:30AM','2:00PM','2:30PM','3:00PM','3:30PM',
    '4:00PM','4:30PM','5:00PM','5:30PM','6:00PM','6:30PM','7:00PM' /* ... */];

    useEffect(() => {
        // Fetch data from JSON file (replace with actual URL)
        fetch('../scheduleData.json')
          .then((response) => response.json())
          .then((data) => setScheduleData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

  const handleTimeZoneChange = (event) => {
    setSelectedTimeZone(event.target.value);
    setCurrentDate(new Date()); // Update current date when timezone changes
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7); // Move back 7 days for previous week
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7); // Move forward 7 days for next week
    setCurrentDate(newDate);
  };

  return (
    <div className="timezone-container">
      <div className="button-container">
        <button onClick={handlePreviousWeek}>Previous Week</button>
        <input
        className="timeZone"
        type="text"
        value={currentDate.toLocaleDateString()}
        readOnly
      />
        <button onClick={handleNextWeek}>Next Week</button>
      </div>
     
      <p>TimeZone: {selectedTimeZone}</p>
      <select
        className="timeZone"
        value={selectedTimeZone}
        onChange={handleTimeZoneChange}
      >
        <option value="UTC">UTC</option>
        <option value="America/New_York">America/New_York</option>
        <option value="Asia/Tokyo">Asia/Tokyo</option>
        <option value="India">India</option>
        {/* Add more time zones here */}
      </select>
      <div className="week-schedule">
        {weekDays.map((day) => (
          <div key={day} className="day">
            <p>{day}</p>
            {timeSlots.map((time) => {
              const hasSchedule = scheduleData.some(
                (item) =>
                  item.Date === currentDate.toISOString().split('T')[0] &&
                  item.Time === time
              );
              const isPast = new Date() > new Date(`${currentDate.toISOString().split('T')[0]} ${time}`);
              
              return (
                <label key={time} className="time-slot">
                  <input
                    type="checkbox"
                    value={`${day} ${time}`}
                    checked={hasSchedule}
                    disabled={isPast}
                  />
                  {time}
                </label>
              );
            })}
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default TimeZoneInput;
