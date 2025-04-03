/* eslint-disable no-unused-vars */
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import List from './pages/List';
import Add from './pages/Add';
import ResponsiveAppBar from './components/AppBar';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser'; // Asumo que lo agregarás tú mismo

function App() {
  const [items, setItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isLogin) {
      getItems();
    }
  }, [isLogin]);

  const getItems = async () => {
    const result = await fetch("http://localhost:5000/items/");
    const data = await result.json();
    setItems(data);
  };

  const add = async (item) => {
    const result = await fetch("http://localhost:5000/items/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await result.json();
    setItems([...items, data.item]);
    console.log(items);
  };

  const del = async (id) => {
    await fetch(`http://localhost:5000/items/` + id, {
      method: "DELETE",
    });
    setItems(items.filter((item) => item.id !== id));
  };

  const login = async (user) => {
    try {
      const result = await fetch("http://localhost:5000/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!result.ok) throw new Error("Login failed");

      const data = await result.json();
      console.log(data);
      setIsLogin(data.isLogin);
      return data.isLogin;
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
      return false;
    }
  };

  const createUser = async (user) => {
    try {
      const result = await fetch("http://localhost:5000/create/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!result.ok) throw new Error("User creation failed");

      const data = await result.json();
      console.log(data);
      return true;
    } catch (error) {
      console.error("User creation failed:", error);
      alert("User creation failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setIsLogin(false);
  };

  return (
    <div>
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar setlogout={logout} />}

        <Routes>
          {!isLogin && (
            <>
              <Route path="/" element={<Login login={login} />} />
              <Route path="/create" element={<CreateUser createUser={createUser} />} />
            </>
          )}

          {isLogin && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/add" element={<Add add={add} />} />
              <Route path="/items" element={<List items={items} ondelete={del} />} />
            </>
          )}

          {/* Redirección global según login */}
          <Route
            path="*"
            element={<Navigate to={isLogin ? "/home" : "/"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
