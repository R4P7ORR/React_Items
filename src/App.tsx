import React, {useState} from 'react';
import './App.css';
import {create} from "node:domain";
import Item from "./item";
import ItemDisplay from "./ItemDisplay";

let itemList: Item[] =  [ new Item(1,"Orange Juice", "Food"), new Item(2,"Cheese", "Food"),
    new Item(3,"Ford Focus", "Vehicles"), new Item(4,"Samsung Galaxy A70", "Electronics")];
const App: React.FC = () => {
    let popUpToggle = false;


    let nextId = itemList.length;


    function CreateItem(){
        const name = document.getElementById("itemInpName") as HTMLInputElement;
        const category = document.getElementById("itemInpCategory") as HTMLInputElement;
        const item: Item = new Item(nextId, name.value, category.value);

        if (name.value === undefined || name.value.trim().length < 1){
            return;
        }else if (category.value === undefined || category.value.trim().length < 1){
            return;
        }else{
            itemList.push(item);
            console.log(items)
            name.value = "";
            category.value = "";
        }
        setItems(itemList);

        nextId++;
        ShowCreateItem();
    }
    function DeleteItem(item: Item){
        const index = itemList.indexOf(item, 0);
        if (index > -1) {
            itemList.splice(index, 1);
            setItems(itemList);
        }
    }
    function ShowCreateItem(){
        const popUp = document.getElementById("popUpDiv") as HTMLElement;
        if (!popUpToggle){
            popUp.style.visibility = "visible";
            popUpToggle = true;
        }else{
            popUp.style.visibility = "collapse";
            popUpToggle = false;
        }
    }

    function FilterItemList(filterCategory: string){
        const filteredList = itemList.filter((filter => filter.category === filterCategory));
    }


    const [items, setItems] = useState<Item[]>(itemList);

  return (
    <div className="App">
        <div id={"popUpDiv"} className="popUpDiv">
            <div className="divWindow">
                <div className="divItem">
                    <div className="label">
                        <label htmlFor="itemInpName">Name: </label>
                        <br/>
                        <label htmlFor="itemInpCategory">Category: </label>
                    </div>
                    <div>
                        <div>
                            <input type="text" id="itemInpName"/>
                        </div>
                        <div>
                            <input type="text" id="itemInpCategory"/>
                        </div>
                    </div>
                </div>
                <div className="divItem">
                    <button onClick={CreateItem}>Create</button>
                </div>
            </div>
        </div>

        <div className="mainDiv">
            <button onClick={ShowCreateItem}>New Item</button>

            {items.map((item: Item) => <ItemDisplay name={item.name} handleClick={() => {DeleteItem(item)}}/>)}
        </div>
    </div>
  );
}

export default App;
