import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateGroup from "../CreateGroup/CreateGroup";
import MemberList from "../MemberList/MemberList";

const GroupSearchInterface = ({
  closeSearch,
  joinedGroups,
  setJoinedGroups,
  reloadCalendar,
}) => {
  const [groups, setGroups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    loadGroupsAndMembers();
  }, []);

  // Fetch all groups in our app, then fetch group members
  // using fetched group_id of each group
  const loadGroupsAndMembers = async () => {
    setIsLoaded(false);
    try {
      const groupResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/group.php`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      const formattedGroups = await Promise.all(
        groupResponse.data.map(async (group) => {
          const groupAccessResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/group-access.php`,
            {
              params: {
                group_id: group.group_token,
              },
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );

          return {
            id: group.group_token,
            isPrivate: group.invite_flag,
            title: group.group_title,
            description: group.group_desc,
            members: groupAccessResponse.data,
          };
        })
      );

      setGroups(formattedGroups);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleJoin = async (targetGroup) => {
    const data = {
      group_token: targetGroup.id,
      group_title: targetGroup.title,
      user_id: sessionStorage.getItem("id"),
      username: sessionStorage.getItem("username"),
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/group-access.php`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        // Reload Calendar
        reloadCalendar();
      })
      .catch((error) => console.error(error));
  };

  const isGroupJoined = (groupId) => {
    return joinedGroups.map((group) => group.id).includes(groupId);
  };

  function handleGroupSelect(group) {
    setSelectedGroup(group);
  }

  if (!isLoaded) {
    return (
      <div className="model-content flex items-center justify-center">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="modal-content w-3/5 h-3/5 flex flex-col justify-start space-y-3 bg-slate-200">
        <div>
          {/* Back Button */}
          <button
            className="float-left p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            type="button"
            onClick={() => closeSearch()}
          >
            Back
          </button>
          {/* Create Group */}
          <button
            className="float-right p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            onClick={() => setShowCreate(true)}
          >
            Create Group
          </button>
          {showCreate && (
            <div className="modal-overlay w-full h-full">
              <CreateGroup
                onClose={() => setShowCreate(false)}
                loadGroupsAndMembers={loadGroupsAndMembers}
                reloadCalendar={reloadCalendar}
              />
            </div>
          )}
        </div>
        {/* Search Field */}
        <input
          id="search"
          className="p-1 w-full text-lg text-[#660033] text-center bg-white rounded border placeholder-slate-300 focus:[#ffcccc] focus:[#ebbcbc] resize-none"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Groups Info */}
        <div className="bg-slate-100 rounded-md w-full h-full p-2 space-y-1 overflow-y-scroll">
          {filteredGroups.map((group) => (
            <div className="flex p-1 rounded-sm" key={group.id}>
              <span
                htmlFor={group.id}
                className="w-full rounded-sm px-1 bg-white"
              >
                <div className="p-1">
                  <div className="font-bold text-lg">
                    {group.title}
                    <button
                      className="float-right w-1/4 rounded text-white font-normal bg-slate-400 hover:bg-slate-500 disabled:bg-slate-700"
                      onClick={() => handleJoin(group)}
                      disabled={isGroupJoined(group.id)}
                    >
                      {isGroupJoined(group.id) ? "Joined" : "Join"}
                    </button>
                  </div>
                  <div className="bg-white">
                    <span className="float-left">{group.description}</span>
                    <span
                      className="float-right ml-10 text-sky-400 underline"
                      onClick={() => handleGroupSelect(group)}
                    >
                      {group.members.length} Members
                    </span>
                  </div>
                </div>
              </span>
            </div>
          ))}
        </div>
        {/* Modal to display members of selected group */}
        {selectedGroup && (
          <div className="modal-overlay w-full h-full">
            <MemberList
              group={selectedGroup}
              onClose={() => setSelectedGroup(null)}
            />
          </div>
        )}
      </div>
    );
  }
};

export default GroupSearchInterface;
