import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './IndividualCalendar.css';
import 'moment-timezone';
import AddInterface from '../../components/EventManager/AddInterface';
import React, { useEffect, useState } from "react";
import axios from "axios";

moment.tz.setDefault("America/New_York");
const localizer = momentLocalizer(moment);

const IndividualCalendar = (props) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadCalendarEvents();
  }, []);

  const loadCalendarEvents = async () => {
    setIsLoaded(false);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/get-calander-events.php`, {
        params: {
          user_id: sessionStorage.getItem("id"),
        },
      })
      .then((response) => {
        console.log(response);
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: moment(event.start_time).toDate(),
          end: moment(event.end_time).toDate(),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsLoaded(true);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleSave = (event) => {
    if (selectedEvent) {
      event.id = selectedEvent.id;
      selectedEvent.title = event.title;
      selectedEvent.start = moment(event.start).toDate();
      selectedEvent.end = moment(event.end).toDate();
      selectedEvent.location = event.location;
      selectedEvent.description = event.description;
      events[selectedEvent.id - 1] = selectedEvent;
    }
    setEvents(events);
    setSelectedEvent(null);
    console.log("Event saved:", event.id, event);
  };

  const handleDelete = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id
      );
      setEvents(updatedEvents);
      console.log(selectedEvent.title + " is deleted!");
    }
    setSelectedEvent(null);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading...</div>;
  } else {
    return (
      <div className="calendarApp" style={{ backgroundColor: "lightgray" }}>
        <br />
        <div>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="week"
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "70vh", padding: "10px 10px 10px 10px" }}
            onSelectEvent={handleEventSelect}
          />
        </div>
        {selectedEvent && (
          <div className="modal-overlay bg-black w-1/2">
            <AddInterface
              selectedEvent={selectedEvent}
              onSave={handleSave}
              onClose={handleClose}
              onDelete={handleDelete}
              fromCalendar="individual"
            />
          </div>
        )}
      </div>
    );
  }
};

export default IndividualCalendar;