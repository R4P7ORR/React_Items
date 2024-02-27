import React, {useState} from 'react';
import './App.css';
import Item from "./item";
import ItemDisplay from "./ItemDisplay";
import CategoryDisplay from "./CategoryDisplay";

const initialItemList: Item[] =  [
    new Item(1, "Orange Juice", "Food"),
    new Item(2, "Cheese", "Food"),
    new Item(3, "Ford Focus", "Vehicles"),
    new Item(4, "Samsung Galaxy A70", "Electronics")
];

const App: React.FC = () => {
    const [items, setItems] = useState<Item[]>(initialItemList);
    const [filteredItems, setFilteredItems] = useState<Item[]>(items);
    const [selectedFilter, setFilter] = useState<string>('all');
    const [searchText, setSearchText] = useState<string>('');
    const [uniqueCategories, setUniqueCategories] = useState<string[]>(GetUniqueCategories);

    const [nextId, setNextId] = useState(initialItemList.length)

    let popUpToggle = false;

    function GetUniqueCategories(){
        const unique: Set<string> = new Set();
        items.forEach(item => {
            unique.add(item.category);
        });
        return Array.from(unique);
    }

    function CreateItem(){
        const name = (document.getElementById("itemInpName") as HTMLInputElement);
        const category = (document.getElementById("itemInpCategory") as HTMLInputElement);

        if (!name.value.trim() || !category.value.trim()){
            return;
        }

        const newItem: Item = new Item(nextId, name.value, category.value);
        setItems(prevItems => [...prevItems, newItem]);
        if(!uniqueCategories.includes(category.value)){
            setUniqueCategories(prevCategories => [...prevCategories, category.value]);
        }

        setNextId(nextId+1);
        ShowCreateItem();
    }

    function DeleteItem(item: Item){
        setItems(prevItems => prevItems.filter(i => i !== item));
        if (items.filter(i =>i.category === item.category).length === 1){
            setUniqueCategories(prevCategories => prevCategories.filter(i => i !== item.category));
        }
    }

    function ShowCreateItem(){
        const popUp = document.getElementById("popUpDiv") as HTMLElement;
        if (!popUpToggle){
            popUp.style.visibility = "visible";
            popUpToggle = true;
            const name = (document.getElementById("itemInpName") as HTMLInputElement);
            const category = (document.getElementById("itemInpCategory") as HTMLInputElement);
            name.value = '';
            category.value = '';
        } else {
            popUp.style.visibility = "collapse";
            popUpToggle = false;
        }
    }

    function FilterItemList(filterCategory: string){
        switch (filterCategory){
            case 'all':
                setFilteredItems(items);
                break;
            default:
                const filteredList = items.filter(item => item.category === filterCategory);
                setFilteredItems(filteredList);
                break;
        }
        setFilter(filterCategory);
        setSearchText('');
    }

    function SearchItems(searchText: string){
        switch (searchText){
            case '':
                if (selectedFilter === 'all'){
                    setFilteredItems(items);
                }else{
                    setFilteredItems(items.filter(item => item.category === selectedFilter));
                }
                break;
            default:
                if (selectedFilter === 'all'){
                    setFilteredItems(items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
                }else{
                    setFilteredItems(items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) && item.category === selectedFilter));
                }
                break;
        }
    }

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
                <div className="categoryDiv">
                    <button onClick={() => FilterItemList('all')}>All</button>
                    {uniqueCategories.map((category: string) =>(
                        <CategoryDisplay name={category} handleClick={() => FilterItemList(category)}/>
                    ))}
                </div>
                <div>
                    <input id="searchInp" type="search" value={searchText} onChange={(e) => {
                        const searchText = e.target.value;
                        setSearchText(searchText);
                        SearchItems(searchText);
                    }}/>
                </div>
                <div>
                    {filteredItems.map((item: Item) => (
                        <ItemDisplay key={item.id} name={item.name} handleClick={() => DeleteItem(item)} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default App;
