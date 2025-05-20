// src/ShoppingListWithImmer.js
import React from 'react';
import { useImmer } from 'use-immer';

const ShoppingListWithImmer = () => {
  const [shoppingList, updateShoppingList] = useImmer([
    {
      id: 1,
      name: 'Apples',
      quantity: 5,
      details: {
        category: 'Fruit',
        notes: 'Red apples only',
      },
    },
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: 'Bananas',
      quantity: 3,
      details: {
        category: 'Fruit',
        notes: 'Ripe ones',
      },
    };
    updateShoppingList(draft => {
      draft.push(newItem);
    });
  };

  const updateItem = (id) => {
    updateShoppingList(draft => {
      const item = draft.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
        item.details.notes = 'Updated quantity';
      }
    });
  };

  const removeItem = (id) => {
    updateShoppingList(draft => {
      const index = draft.findIndex(item => item.id === id);
      if (index !== -1) draft.splice(index, 1);
    });
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> — {item.quantity} ({item.details.category})
            <br />
            Notes: {item.details.notes}
            <br />
            <button onClick={() => updateItem(item.id)}>Update</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListWithImmer;
