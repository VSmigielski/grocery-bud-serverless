import React from 'react'
import { useEasybase } from 'easybase-react';
import { FaTrash } from 'react-icons/fa';

function DeleteButton({_key}) {

    const key = _key;

    const { db } = useEasybase();

  const handleDelete = async () => {
    await db('GROCERYLIST').delete().where({ key }).one();
  }

    return <button onClick={handleDelete} type="button" className="delete-btn"><FaTrash></FaTrash></button>
  }

  export default DeleteButton