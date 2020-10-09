import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login/index";
import Sidebar from "./components/Sidebar/";
import Chat from "./components/Chat/";
import { selectUser } from "./features/userSlice";
import { auth } from "./utils/firebase";
import { login, logout } from "./features/userSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
