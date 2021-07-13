import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { EasybaseProvider, useEasybase } from 'easybase-react';
import ebconfig from './ebconfig';
import NewGroceryButton from './NewGroceryButton';

// const getLocalStorage = () => {
//   let list = localStorage.getItem('list');
//   if(list) {
//     return JSON.parse(localStorage.getItem('list'))
//   } 
//   else {
//     return []
//   }
// }

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show:false, msg:'',type:''});

  const { Frame, sync, configureFrame } = useEasybase();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, 'danger', 'Please enter a value')
    } else if (name && isEditing) {
      // deal with edit
      setList(list.map((item) => {
        if (item.id === editID) {
          return {...item, title:name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Value has been changed')
    } else {
      // show alert
      // add item to list
      showAlert(true, 'success', 'Item Added to the List')
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'Emptied List')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item has been removed');
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id)
    setName(specificItem.title)
  }

  // useEffect(() => {
  //   localStorage.setItem('list', JSON.stringify(list))
  // }, [list])

  useEffect(() => {
    configureFrame({ tableName: "GROCERYLIST", limit: 10 });
    sync();
  }, [list]);

  return (
    <>
    <EasybaseProvider ebconfig={ebconfig}>
      <NewGroceryButton/>
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}
        list={list}/>}
        <h3>Grocery Buddy</h3>
        <div className="form-control">
          <input type="text" className="grocery" 
          placeholder="Ex. Eggs" value={name} onChange={(e) => setName(e.target.value)}/>
          <NewGroceryButton type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </NewGroceryButton>
        </div>
      </form>
      {list.length > 0 && (
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className="clear-btn" onClick={clearList}>
          Clear Items
        </button>
      </div>
      )}
      
    </section>
    </EasybaseProvider>
    </>
  )
}

export default App
