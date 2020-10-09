import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Add,
  Call,
  ExitToApp,
  ExpandMore,
  Headset,
  InfoOutlined,
  Mic,
  SignalCellularAlt,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import SidebarChannel from "../SidebarChannel";
import { selectUser } from "../../features/userSlice";
import db, { auth } from "../../utils/firebase";
import "./style.css";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Feruzjon Majidov</h3>
        <ExpandMore />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMore />
            <h4>Channels</h4>
          </div>
          <Add onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 10)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <Mic />
          <Headset />
          <ExitToApp
            className="sidebar__exitIcon"
            onClick={() => auth.signOut()}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
