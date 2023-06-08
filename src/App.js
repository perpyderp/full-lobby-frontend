import { useState, useEffect } from "react";
import axios from "axios";
import { Home, UserProfile, Friends, Register } from "./pages";

import { MainNavbar } from "./components";

import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";


import "./App.css";

function App() {

  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: ""
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/user/:id",
      element: <UserProfile user={user}/>
    },
    {
      path: "/friends",
      element: <Friends />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  useEffect(() => {
      loadUser();
  }, [])

  const {id} = useParams();

  const loadUser = async() => {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      // console.log(result.data.username);
      setUser(result.data);

  }

  return (
    <div className="App">
      <MainNavbar user={user}/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
