import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./IndividualCalendar.css";
import "moment-timezone";
import AddInterface from "../../components/EventManager/AddInterface";
import React, { useEffect, useState, useRef, useCallback } from "react";
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

  const handleSave = async (event) => {
    if (selectedEvent && selectedEvent.id != null) {
      // If it's an existing event, send update calendar event request
      const data = {
        id: selectedEvent.id,
        user_id: sessionStorage.getItem("id"),
        title: event.title,
        start_time: event.start,
        end_time: event.end,
        location: event.location,
        descrip: event.description,
      };
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/update-calander-event.php`,
          data
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log("Event updated:", selectedEvent.id, event);
    } else {
      // If it's a new event, send create calendar event request
      const data = {
        user_id: sessionStorage.getItem("id"),
        title: event.title,
        start_time: event.start,
        end_time: event.end,
        location: event.location,
        descrip: event.description,
      };

      await axios
        .post(`${process.env.REACT_APP_API_URL}/calendar-event.php`, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log("New event added:", event);
    }

    // reset selected event & load calander events
    setSelectedEvent(null);
    loadCalendarEvents();
  };

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/delete-calander-event.php`, {
        params: {
          id: selectedEvent.id,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    setSelectedEvent(null);
    loadCalendarEvents();
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  const clickRef = useRef(null);
  const onSelectSlot = useCallback((slotInfo) => {
    window.clearTimeout(clickRef.current);
    clickRef.current = window.setTimeout(() => {
      setSelectedEvent({
        start: moment(slotInfo.start).toDate(),
        end: moment(slotInfo.end).toDate(),
      });
    }, 250);
  }, []);

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
            onSelectSlot={onSelectSlot}
            selectable
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
