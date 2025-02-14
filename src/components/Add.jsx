/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import Button from './Button'

const Add = ({add}) => {
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const onSubmit = (e) => {
      if(!name || !price){ alert("llene todos los campos");
        return;}
      e.preventDefault();
      add({name: name, price: price});
      setName('');
      setPrice('');
    }


  return (
    <form onSubmit={onSubmit}>
      <input 
      onChange={(e) =>setName(e.target.value)} 
      value = {name}
       type="text"
        name=''
        id=''/>  
        <input 
        onChange={(e) =>setPrice(e.target.value)} 
        value = {price}
        type="text"
         name='' 
         id=''/>
        <input type="submit" value = {"agregar"}/>
    </form>
  )
}

export default Add
