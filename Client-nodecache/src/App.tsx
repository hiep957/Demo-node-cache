// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./Layout/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useAppContext } from "./contexts/AppContext";
import Home from "./Pages/Home";

function App() {
  // const [count, setCount] = useState(0);
  // const { isLoggedIn, role } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
