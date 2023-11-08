import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './IndividualCalendar.css';
import 'moment-timezone';
import AddInterface from '../../components/EventManager/AddInterface';
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
    const startMoment = moment(event.start).toDate();
    const endMoment = moment(event.end).toDate();

    if (selectedEvent && selectedEvent.id != null) {
      // If it's an existing event, update it in the events array
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === selectedEvent.id
            ? {
                ...e,
                title: event.title,
                start: startMoment,
                end: endMoment,
                location: event.location,
                description: event.description,
              }
            : e
        )
      );

      // Update the event on the server
      const data = {
        id: selectedEvent.id,
        user_id: sessionStorage.getItem("id"),
        title: event.title,
        start_time: startMoment,
        end_time: endMoment,
        location: event.location,
        descrip: event.description,
      };

      await axios
        .post(`${process.env.REACT_APP_API_URL}/update-calander-event.php`, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log('Event updated:', selectedEvent.id, event);
      loadCalendarEvents();
    } else {
      // If it's a new event, create it with a unique ID and the converted times
      const newEvent = {
        id: events.length + 1,
        title: event.title,
        start: startMoment,
        end: endMoment,
        location: event.location,
        description: event.description,
      };

      // Add the new event to the events array
      setEvents((prevEvents) => [...prevEvents, newEvent]);

//       // Create and send the new event data to the server
//       const newData = {
//         id: events.length + 1,
//         user_id: sessionStorage.getItem("id"),
//         title: event.title,
//         start_time: startMoment,
//         end_time: endMoment,
//         location: event.location,
//         descrip: event.description,
//       };
//
//       await axios
//         .post(`${process.env.REACT_APP_API_URL}/add-calander-event.php`, newData)
//         .then((response) => {
//           console.log(response);
//         })
//         .catch((error) => {
//           console.error(error);
//         });

      console.log('New event added:', newEvent.id, event);
    }

    setSelectedEvent(null);
//     loadCalendarEvents();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id
      );
      setEvents(updatedEvents);
      console.log(selectedEvent.id + ": " + selectedEvent.title + " is deleted!")
    }
    setSelectedEvent(null);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  const clickRef = useRef(null);
    const onSelectSlot = useCallback((slotInfo) => {
      window.clearTimeout(clickRef.current);
      clickRef.current = window.setTimeout(() => {
          setSelectedEvent({start:moment(slotInfo.start).toDate(), end:moment(slotInfo.end).toDate()});
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
          <div className="modal-overlay bg-black w-auto h-auto">
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