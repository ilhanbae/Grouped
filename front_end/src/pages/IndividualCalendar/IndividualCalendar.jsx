import { Calendar, momentLocalizer, ToolbarProps, Navigate, Toolbar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./IndividualCalendar.css";
import "moment-timezone";
import AddInterface from "../../components/EventManager/AddInterface";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { getSelfEventProp, getGroupEventProp } from "../../utils/getEventProp";
import SettingInterface from "../../components/DisplaySetting/SettingInterface";
import GroupSearchInterface from "../../components/GroupSearch/GroupSearchInterface";

moment.tz.setDefault("America/New_York");
const localizer = momentLocalizer(moment);

const IndividualCalendar = (props) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [displayOptions, setDisplayOptions] = useState({});
  const [isOptionsLoaded, setIsOptionsLoaded] = useState(false);

  useEffect(() => {
    loadCalendarEvents();
    loadUserGroups();
  }, []);

  // Loaders
  const loadCalendarEvents = async () => {
    setIsLoaded(false);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/get-calander-events.php`, {
        params: {
          user_id: sessionStorage.getItem("id"),
        },
      })
      .then((response) => {
        // console.log(response);
        const formattedEvents = response.data.map((event) => ({
          id: event.id,
          user_id: event.user_id,
          group_id: event.group_id,
          title: event.title,
          start: moment(event.start_time).toDate(),
          end: moment(event.end_time).toDate(),
          location: event?.location,
          descrip: event?.descrip,
        }));
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsLoaded(true);
  };

  const loadUserGroups = async () => {
    setIsLoaded(false);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/group-access.php`, {
        params: {
          user_id: sessionStorage.getItem("id"),
        },
      })
      .then((response) => {
        // console.log(response.data);
        const formattedGroups = response.data.map((group) => ({
          id: group.group_token,
          // isPrivate: group.invite_flag,
          title: group.group_title,
          // description: group.group_desc,
        }));
        setJoinedGroups(formattedGroups);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsLoaded(true);
  };

  // Event Manager
  const handleSave = async (event) => {
    if (selectedEvent && selectedEvent.id != null) {
      // If it's an existing event, send update calendar event request
      const data = {
        id: selectedEvent.id,
        user_id: sessionStorage.getItem("id"),
        group_id: event?.group_id,
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
          // console.log(response);
          console.log("Updated event:", data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // If it's a new event, send create calendar event request
      const data = {
        user_id: sessionStorage.getItem("id"),
        group_id: event?.group_id,
        title: event.title,
        start_time: event.start,
        end_time: event.end,
        location: event.location,
        descrip: event.description,
      };

      await axios
        .post(`${process.env.REACT_APP_API_URL}/calendar-event.php`, data)
        .then((response) => {
          // console.log(response);
          console.log("Added new event:", data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // reset selected event & load calander events
    setSelectedEvent(null);
  };

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/delete-calander-event.php`, {
        params: {
          id: selectedEvent.id,
        },
      })
      .then((response) => {
        // console.log(response);
        console.log("Deleted event:", selectedEvent);
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

  // Display Components
  const toggleSetting = () => {
    setShowSetting(!showSetting);
    setShowSearch(!showSearch);
  };

  const closeSetting = () => {
    setShowSetting(false);
    setShowSearch(false);
  };

  // Display Option Filter Methods
  // Update display option on option select
  useEffect(() => {
    if (isOptionsLoaded) {
      filterEvents(displayOptions);
    }
  }, [displayOptions]);

  // Update default display options when events and joined groups are loaded
  useEffect(() => {
    setDefaultDisplayOptions(true);
  }, [events, joinedGroups]);

  const filterEvents = (options) => {
    const filteredEvents = events.filter(
      (event) => options[`${event.group_id ? event.group_id : 0}`]
    );
    // console.log(filteredEvents);
    setFilteredEvents(filteredEvents);
  };

  const setDefaultDisplayOptions = (state) => {
    setIsOptionsLoaded(false);
    let options = {};
    options[0] = state; // self option
    joinedGroups.forEach((group) => (options[group.id] = state)); // group options
    setDisplayOptions(options);
    setIsOptionsLoaded(true);
  };

  const updateDisplayOptions = (option) => {
    // console.log(option);
    setDisplayOptions({ ...displayOptions, [option]: !displayOptions[option] });
  };

  // Event Select
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
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

  // Customize event props
  const eventPropGetter = (event, start, end, isSelected) => {
    // console.log(event);

    let eventProp = { style: {}, className: {} };
    if (event.user_id) {
      // Individual events
      const isOpaque = true;
      const isDisplayed = true;
      eventProp = { ...getSelfEventProp(isOpaque, isDisplayed) };
    }
    if (event.group_id) {
      // Group events
      const isOpaque = true;
      const isDisplayed = true;
      eventProp = {
        ...getGroupEventProp(event.group_id, isOpaque, isDisplayed),
      };
    }
    return eventProp;
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading...</div>;
  } else {
    return (
      <div className="calendarApp h-full max-h-0 bg-slate-300">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          //           components={{toolbar: CustomToolbar}}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "85%", padding: "10px 10px" }}
          onSelectEvent={handleEventSelect}
          onSelectSlot={onSelectSlot}
          eventPropGetter={eventPropGetter}
          selectable
        />
        {selectedEvent && (
          <div className="modal-overlay w-full h-full">
            <AddInterface
              selectedEvent={selectedEvent}
              groups={joinedGroups}
              onSave={handleSave}
              onClose={handleClose}
              onDelete={handleDelete}
              fromCalendar="individual"
            />
          </div>
        )}
        {showSetting && (
          <div className="modal-overlay w-full h-full">
            <SettingInterface
              groups={joinedGroups}
              toggleSetting={toggleSetting}
              closeSetting={closeSetting}
              updateDisplayOptions={updateDisplayOptions}
              displayOptions={displayOptions}
            />
          </div>
        )}
        {showSearch && (
          <div className="modal-overlay w-full h-full">
            <GroupSearchInterface
              toggleSetting={toggleSetting}
              closeSetting={closeSetting}
              joinedGroups={joinedGroups}
              setJoinedGroups={setJoinedGroups}
            />
          </div>
        )}
        <button
          onClick={() => setShowSetting(true)}
          className="displayButton ml-4 p-2"
        >
          Display Setting
        </button>
      </div>
    );
  }
};

export default IndividualCalendar;

// const CustomToolbar = (props: ToolbarProps) => {
//     const [viewState, setViewState] = useState('month');
//
//     const goToDayView = () => {
//         props.onView('day');
//         setViewState('day');
//     };
//     const goToWeekView = () => {
//         props.onView('week');
//         setViewState('week');
//     };
//     const goToMonthView = () => {
//         props.onView('month');
//         setViewState('month');
//     };
//
//     const goToBack = () => {
//         props.onNavigate(Navigate.PREVIOUS);
//     };
//
//     const goToNext = () => {
//         props.onNavigate(Navigate.NEXT);
//     };
//
//     const goToToday = () => {
//         props.onNavigate(Navigate.TODAY);
//     };
//
//     return (
//         <div className='rbc-toolbar'>
//             <span className="rbc-btn-group">
//               <button onClick={goToBack}>&#8249;</button>
//               <label>{moment(props.date).format('DD/MM/YYYY')}</label>
//               <button onClick={goToNext}>&#8250;</button>
//               <button onClick={goToToday}>today</button>
//               <button onClick={goToMonthView}>month</button>
//               <button onClick={goToWeekView}>week</button>
//               <button onClick={goToDayView}>day</button>
//             </span>
//         </div>
//     );
// };