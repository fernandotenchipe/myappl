import React,{useState} from 'react'
import Button from './Button'

const Add = () => {
    const[name, setName] = useState('');

  return (
    <div>
      <input onChange={(e) =>setName(e.target.value)} 
      value = {name}
       type="text"
        name=''
         id=''/>
         
        <input type="text" name='' id=''/>
        <Button name = "agregar"/>
    </div>
  )
}

export default Add
