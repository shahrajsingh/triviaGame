import { Link, Outlet } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/navbar";
import { Button } from "@mui/material";

function App() {

  return (
    <div className="App">
      <Navbar></Navbar>
      dashboard
      <Outlet></Outlet>
      <Link to="/admin/home">
        <Button variant="contained" color="primary">
          Create New Quiz
        </Button>
      </Link>
    </div>
  );
}

export default App;
