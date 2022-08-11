import React, {useEffect, useState} from "react"; 
import './App.css';
import Login from "./Login.tsx";
import Navbar from "./comps/Navbar.tsx";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home.tsx";
import Register from "./Register.tsx";

function App() {
  
  const [name, setName] = useState("");

  useEffect(() => {
    (
      async () => {
        const response = await fetch("http://localhost:8080/api/user", {
          headers: {"Content-Type": "application/json"},
          credentials: "include",
        });

        const content = await response.json();
        setName(content.name);
      }
    )();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar name={name} setName={setName} />
          <main className="form-signin">
            <Route path="/" exact component={() => <Home name={name} />}> </Route>
            <Route path="/login" component={() => <Login setName={setName} />}></Route>
            <Route path="/register" component={Register} />
          </main>
      </BrowserRouter>
    </div>
  );
}
export default App;