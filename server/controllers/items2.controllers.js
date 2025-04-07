/* eslint-disable no-undef */
import Item from "../utils/item.model.js";

export const getItems = async(req, res ) =>{
    const items = await Item.find();
    res.json(items);
};

export const getItem = async(req, res ) =>{
    const item = await Item.findByid(req.params.id);
    res.json(item);
    };

export const postItem = async(req, res ) =>{
    const item = new Item(request.body);
    await item.save();
    res.json(item);
    };

    
export const putItem = async(req, res ) =>{
    const item = await Item.findByidAndUpdate(req.params.id,req.body, {
            new:true
        });
    res.json(item);
    }

export const deleteItem = async(req, res ) =>{
    await Item.findByidAndDelete(req.params.id);
    res.status(200).json({message:"Item eliminado"});
    }