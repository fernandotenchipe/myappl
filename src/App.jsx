/* eslint-disable no-unused-vars */
import './App.css';
import {useState} from 'react';
import List from './pages/List';
import Add from './pages/Add';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import  Login  from './pages/Login';
import Home from './pages/Home';

function App() {
  const [items, setItems] = useState([
      {name: "item1", price: 100},
      {name: "item2", price: 200},
      {name: "item3", price: 300}
    ]);

  let [count, setCount] = useState(0);
  const [islogin, setisLogin] = useState(false);

  const sum = () => {
    setCount(count + 1);
    console.log(count);
  };
  const resta = () => {
    setCount(count - 1);
    console.log(count);
  } ;

  const add = (item) => {
    item.id = items.length + 1;
    setItems([...items, item]);
    console.log(items);
  };

  const del = (id) => {
    setItems(items.filter((item) => item.id !== id));
  }

  const login = (user) =>{
    if(user.username === "tenchis@gmail.com" && user.password === "password"){
      setisLogin(true);}
    return islogin;
  }

  const setlogout = () => {
    setisLogin(false);
  }

  return (
<div>
  <BrowserRouter>
  {islogin && <ResponsiveAppBar 
  setlogout={setlogout} />}

      <Routes>
        <Route path="/" element={<Login login = {login}/>}/>
        <Route path="/add" element={<Add add={add}/>}/>
        <Route path="/items" element={<List items={items} ondelete={del}/>}/>
        <Route path="/home" element={<Home/>}/>
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
    