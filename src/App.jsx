/* eslint-disable no-unused-vars */
import './App.css';
import {use, useState} from 'react';
import List from './pages/List';
import Add from './pages/Add';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import  Login  from './pages/Login';
import Home from './pages/Home';
import { useEffect } from 'react';


function App() {
  const [items, setItems] = useState([]);
  // const [count, setCount] = useState(0);
  const [isLogin, setisLogin] = useState(false);
  useEffect(() => { 
    if(isLogin) {
      getItems();
    }
  }, [isLogin]);
  const getItems = async () =>{
    const result = await fetch("http://localhost:5000/items/");
    const data = await result.json();
    setItems(data);
  };

  // const sum = () => {
  //   setCount(count + 1);
  //   console.log(count);
  // };
  // const resta = () => {
  //   setCount(count - 1);
  //   console.log(count);
  // } ;

  const add = async (item) => {
    // item.id = items.length + 1;
    const result = await fetch("http://localhost:5000/items/",{
      method: "POST",
      headers:{"content-type":"application/json"},
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
  }

  const login = async (user) =>{
    const result = await fetch("http://localhost:5000/login/",{
     method: "POST",
     headers:{"content-type":"application/json"},
    body: JSON.stringify(user),
  });
  const data = await result.json();
  setisLogin(data.isLogin);
  console.log(data);
  return data.isLogin;
  }

  const setlogout = () => {
    setisLogin(false);
  }

  return (
<div>
  <BrowserRouter>
  {isLogin && <ResponsiveAppBar 
  setlogout={setlogout} />}

      <Routes>
        <Route path="/" element={<Login login = {login}/>}/>
        <Route path="/add" element={<Add add={add}/>}/>
        <Route path="/items" element={<List items={items} ondelete={del}/>}/>
        <Route path="/home" element={<Home />}/>
      </Routes> 

  </BrowserRouter>
  
  {/* {count}
   <Button name={"suma"} click={sum} />
  <Button name={"resta"} click={resta} />
  <Button name={"mensaje"} click={() => alert("hola")}/> */}
  
  

  
</div>
  );
}

export default App;
    