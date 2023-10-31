import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
            console.log("Tentando adicionar item:", itemName);
            const response = await axios.post('/api/items', { name: itemName });
            
            if(response.data && response.status === 201) {
                console.log("Item adicionado", response.data);
                setItems([...items, response.data]);
                setItemName('');
            } else {
                console.error('Resposta do servidor:', response);
            }
        } catch (error) {
            console.error("Erro ao adicionar item", error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const response = await axios.delete(`/api/items/${itemId}`);
            if(response.status === 200) {
                setItems(items.filter(item => item._id !== itemId));
            } else {
                console.error('Erro ao excluir item:', response);
            }
        } catch (error) {
            console.error("Erro ao deletar item:", error);
        }
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        
        <div class='centro'>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={itemName} onChange={e => setItemName(e.target.value)} />
                <Button variant="contained" size="medium" onClick={addItem}>Adicionar</Button>
            </Box>  
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        <Checkbox {...label} />
                        {item.name}  <Button variant="contained" size="small" onClick={() => deleteItem(item._id)}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
}

export default ItemList;

