import { Calendar, momentLocalizer } from "react-big-calendar";
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
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Chat from "../../components/Chat/Chat";
import GroupListModal from "../../components/GroupListChat/GroupListChat";
import CustomToolbar from "./CustomToolbar";

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
  const [hasNewUpdates, setHasNewUpdates] = useState(false); //for when chat icon has red dot
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showGroupListModal, setShowGroupListModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    loadCalendar();
  }, []);

  // Load user's joined group, group events, and self events
  const loadCalendar = async () => {
    setIsLoaded(false);
    try {
      // Fetch User's Joined Groups
      const userGroupsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/group-access.php`,
        {
          params: {
            user_id: sessionStorage.getItem("id"),
          },
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );

      // Fetch Group Events
      const groupEvents = await Promise.all(
        userGroupsResponse.data.map(async (group) => {
          // console.log(group);
          const groupEventsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/get-calander-events.php`,
            {
              params: {
                group_id: group.group_token,
              },
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );
          return groupEventsResponse.data;
        })
      );

      // Fetch Self Events
      const selfEventResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-calander-events.php`,
        {
          params: {
            user_id: sessionStorage.getItem("id"),
          },
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );

      // Combine self and group events
      let selfEvents = selfEventResponse.data;
      let combinedEvents = [
        ...selfEvents,
        ...groupEvents
          .flat()
          .filter(
            (groupEvent) =>
              !selfEvents.some(
                (selfEvent) => selfEvent["id"] === groupEvent["id"]
              )
          ),
      ];

      // Format events
      const formattedEvents = combinedEvents.map((event) => ({
        id: event.id,
        user_id: event.user_id,
        group_id: event.group_id,
        title: event.title,
        start: moment(event.start_time).toDate(),
        end: moment(event.end_time).toDate(),
        location: event?.location,
        descrip: event?.descrip,
      }));

      // Format groups
      const formattedGroups = userGroupsResponse.data.map((group) => ({
        id: group.group_token,
        // isPrivate: group.invite_flag,
        title: group.group_title,
        // description: group.group_desc,
      }));

      // Update states
      setJoinedGroups(formattedGroups);
      setEvents(formattedEvents);
      setFilteredEvents(formattedEvents);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  };

  // Event Manager
  const handleSave = async (event) => {
    console.log(event);
    if (selectedEvent && selectedEvent.id) {
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
          data,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
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
        .post(`${process.env.REACT_APP_API_URL}/calendar-event.php`, data, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          // console.log(response);
          console.log("Added new event:", data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // reset selected event & reload calander
    setSelectedEvent(null);
    loadCalendar();
  };

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/delete-calander-event.php`, {
        params: {
          id: selectedEvent.id,
        },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        console.log("Deleted event:", selectedEvent);
      })
      .catch((error) => {
        console.error(error);
      });

    // reset selected event & reload calander
    setSelectedEvent(null);
    loadCalendar();
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  // Display Components
  const toggleSetting = () => {
    setShowSetting(!showSetting);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  // const toggleSetting = () => {
  //   setShowSetting(!showSetting);
  //   setShowSearch(!showSearch);
  // };

  // const closeSetting = () => {
  //   setShowSetting(false);
  //   setShowSearch(false);
  // };

  // Display Option Filter Methods
  // Update default display options anytime events or joined groups have changed
  useEffect(() => {
    setDefaultDisplayOptions(true);
  }, [events, joinedGroups]);

  // Update display option on option select
  useEffect(() => {
    if (isOptionsLoaded) {
      filterEvents(displayOptions);
    }
  }, [displayOptions]);

  const filterEvents = (options) => {
    const filteredEvents = events.filter(
      (event) => options[`${event.group_id ? event.group_id : 0}`]
    );
    // console.log(filteredEvents);
    setFilteredEvents(filteredEvents);
  };

  // Set display option for user's joined groups to state
  const setDefaultDisplayOptions = (state) => {
    setIsOptionsLoaded(false);
    let options = {};
    options[0] = state; // self option
    joinedGroups.forEach((group) => (options[group.id] = state)); // group options
    setDisplayOptions(options);
    setIsOptionsLoaded(true);
  };

  const updateDisplayOptions = (option) => {
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

  const toggleNewUpdates = () => {
    setHasNewUpdates(!hasNewUpdates);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatButtonClick = () => {
    setShowGroupListModal(true);
  };

  const handleGroupSelect = (group) => {
    setShowGroupListModal(false);
    setSelectedGroup(group);
  };

  const handleBackToGroupList = () => {
    setShowGroupListModal(true);
    setSelectedGroup(null);
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading...</div>;
  } else {
    return (
      <div className="calendarApp h-full max-h-0 bg-slate-300">
        <Calendar
          localizer={localizer}
          components={{ toolbar: CustomToolbar }}
          events={filteredEvents}
          defaultDate={new Date()}
          defaultView="week"
          startAccessor="start"
          endAccessor="end"
          style={{ height: "90%", padding: "10px 10px" }}
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
              closeSetting={toggleSetting}
              updateDisplayOptions={updateDisplayOptions}
              displayOptions={displayOptions}
            />
          </div>
        )}
        {showSearch && (
          <div className="modal-overlay w-full h-full">
            <GroupSearchInterface
              closeSearch={toggleSearch}
              joinedGroups={joinedGroups}
              setJoinedGroups={setJoinedGroups}
              reloadCalendar={loadCalendar}
            />
          </div>
        )}
        <div className="flex justify-between px-[10px]">
          {/* Groups */}
          <div className="displayButton inline-flex" role="group">
            <button
              className={`p-2 bg-white border border-gray-300 rounded-s-md ${
                showSetting ? "z-10 ring-blue-400 ring-2" : "z-0 ring-0"
              }`}
              onClick={() => toggleSetting()}
            >
              Display Filter
            </button>
            <button
              className={`p-2 bg-white border border-gray-300 rounded-e-md ${
                showSearch ? "z-10 ring-blue-400 ring-2" : "z-0 ring-0"
              }`}
              onClick={() => toggleSearch()}
            >
              Find Group
            </button>
          </div>
          {/* Chat */}
          <div className="flex items-center">
            <button
              onClick={handleChatButtonClick}
              className="chatButton relative"
            >
              <div className="rounded-full bg-blue-800 p-1 flex items-center">
                <span className="ml-2 text-white">Chat </span>
                <ChatBubbleOvalLeftEllipsisIcon className="ml-2 mr-1 h-6 w-6 text-white" />
              </div>
              {hasNewUpdates && (
                <div className="indicator absolute top-0 right-0 bg-red-500 rounded-full w-3 h-3"></div>
              )}
            </button>
          </div>
        </div>
        {/* Conditionally render the Group List Modal */}
        {showGroupListModal && (
          <GroupListModal
            groups={joinedGroups}
            onSelectGroup={handleGroupSelect}
            onClose={() => setShowGroupListModal(false)}
          />
        )}
        {/* Conditionally render the Chat component based on the selected group */}
        {selectedGroup && (
          <div className="modal-overlay w-full h-full">
            {/* Pass the selected group to the Chat component */}
            <Chat
              onClose={() => setSelectedGroup(null)}
              selectedGroup={selectedGroup}
              goBack={handleBackToGroupList}
            />
          </div>
        )}
      </div>
    );
  }
};

export default IndividualCalendar;
