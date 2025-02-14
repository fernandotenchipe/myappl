import React from 'react'
import Button from './Button';

const Item = ({ item,ondelete }) => {
    return <div>
        <ol>
            <li>{item.name} </li>
            <li>{item.price} </li>
            <li> <Button click = {() => 
            ondelete(item.id)}
            name = {"X"}/> </li>
        </ol>
    </div>

}

export default Item;
