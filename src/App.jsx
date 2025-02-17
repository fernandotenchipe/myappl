/* eslint-disable no-unused-vars */
import './App.css';
import {useState} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import List from './components/List';
import Add from './components/Add';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import CredentialsSignInPage from './components/Login';

function App() {
  const [items, setItems] = useState([
      {name: "item1", price: 100},
      {name: "item2", price: 200},
      {name: "item3", price: 300}
    ]);

  let [count, setCount] = useState(0);
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
  return (
<div>
  <BrowserRouter>
  <ResponsiveAppBar />
    <Header />
      <Routes>
        <Route path="/" element={<CredentialsSignInPage/>}/>
        <Route path="/add" element={<Add add={add}/>}/>
        <Route path="/items" element={<List items={items} ondelete={del}/>}/>
      </Routes> 
    <Footer/>
  </BrowserRouter>
  
  {/* {count}
   <Button name={"suma"} click={sum} />
  <Button name={"resta"} click={resta} />
  <Button name={"mensaje"} click={() => alert("hola")}/> */}
  
  

  
</div>
  );
}

export default App;
    