/* eslint-disable no-unused-vars */
import './App.css';
import {useState} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import List from './components/List';
import Add from './components/Add';

function App() {
  const items = [
      {name: "item1", price: 100},
      {name: "item2", price: 200},
      {name: "item3", price: 300}
    ];

  let [count, setCount] = useState(0);
  const sum = () => {
    setCount(count + 1);
    console.log(count);
  };
  const resta = () => {
    setCount(count - 1);
    console.log(count);
  } ;

  const add = (item) => {item.id = items.length + 1;
    items.push(item);
    console.log(items);
  };
  return (
<div>
  
  <Header/>
  {count}
  <Button name={"suma"} click={sum} />
  <Button name={"resta"} click={resta} />
  <Button name={"mensaje"} click={() => alert("hola")}/>
    <Add add={add}/>
    <List items={items}/>
  <Footer/>
  
</div>
  );
}

export default App;
    