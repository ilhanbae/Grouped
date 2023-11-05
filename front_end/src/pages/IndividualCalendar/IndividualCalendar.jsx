import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './IndividualCalendar.css';
import 'moment-timezone';
import AddInterface from '../../components/EventManager/AddInterface';
import React, { useState } from 'react';

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
    console.log('Event saved:', event);
  };

  const handleDelete = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      console.log(selectedEvent.title + " is deleted!")
    }
    setSelectedEvent(null);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  const addEvent = (newEvent) => {
    const newEvents = [
    ...events,
    {
        ...newEvent,
        id:events.length + 1,
    },
    ];
    setEvents(newEvents);
  };

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
        />
      </div>
      {selectedEvent && (
        <div className="modal-overlay bg-black w-1/2">
          <AddInterface
            selectedEvent={selectedEvent}
            onSave={addEvent}
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