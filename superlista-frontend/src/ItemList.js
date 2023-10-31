import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/items');
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }

        fetchData();
    }, []);

    const addItem = async () => {
        if (itemName.trim() === "") {
            console.log("Item name is empty. Cannot add.");
            return;
        }
        
        try {
            console.log("Trying to add item:", itemName);
            const response = await axios.post('/api/items', { name: itemName });
            
            if(response.data && response.status === 201) {
                console.log("Item added successfully:", response.data);
                setItems([...items, response.data]);
                setItemName('');
            } else {
                console.error('Response from server:', response);
            }
        } catch (error) {
            console.error("Error adding item", error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const response = await axios.delete(`/api/items/${itemId}`);
            if(response.status === 200) {
                setItems(items.filter(item => item._id !== itemId));
            } else {
                console.error('Error deleting item:', response);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div>
            <input value={itemName} onChange={e => setItemName(e.target.value)} />
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.name} <button onClick={() => deleteItem(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;

