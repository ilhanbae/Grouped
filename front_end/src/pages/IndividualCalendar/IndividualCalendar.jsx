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
    if (selectedEvent) {
        let identification = selectedEvent.id;
        if (identification == null){
            identification = events.length + 1;
        }
        event.id = identification;
        selectedEvent.title = event.title;
        selectedEvent.start = moment(event.start).toDate();
        selectedEvent.end = moment(event.end).toDate();
        selectedEvent.location = event.location;
        selectedEvent.description = event.description;
        events[identification-1] = selectedEvent;
    }
    setEvents(events);
    setSelectedEvent(null);
    console.log('Event saved:', event.id, event);
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