import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './IndividualCalendar.css';
import 'moment-timezone';
import AddInterface from '../../components/EventManager/AddInterface';
import React, { useState, useRef, useCallback, } from 'react';

moment.tz.setDefault('America/New_York');
const localizer = momentLocalizer(moment);

const IndividualCalendar = (props) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      title: 'Some title',
      description: 'Some description',
      location: 'Some location',
    },
    {
      id: 2,
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      title: 'Another title',
      description: 'Another description',
      location: 'Another location',
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelect = (event) => {
    event.start = moment(event.start);
    event.end = moment(event.end);
    setSelectedEvent(event);
  };

  const handleSave = (event) => {
      // Convert the times to moment objects and to Dates
      const startMoment = moment(event.start).toDate();
      const endMoment = moment(event.end).toDate();

      // Check if the selectedEvent is an existing event or a new one
      if (selectedEvent && selectedEvent.id != null) {
        // existing event
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
        console.log('Event updated:', selectedEvent.id, event);
      } else {
        // new event
        const newEvent = {
          id: events.length + 1,
          title: event.title,
          start: startMoment,
          end: endMoment,
          location: event.location,
          description: event.description,
        };

        setEvents((prevEvents) => [...prevEvents, newEvent]);
        console.log('New event added:', newEvent.id, event);
      }

      setSelectedEvent(null);
  };


  const handleDelete = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
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

  return (
    <div className="calendarApp" style={{ backgroundColor: 'lightgray' }}>
      <br />
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '70vh', padding: '10px 10px 10px 10px' }}
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
};

export default IndividualCalendar;