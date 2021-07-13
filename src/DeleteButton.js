import { useEasybase } from 'easybase-react';
import { FaTrash } from 'react-icons/fa';

function DeleteButton({title}) {
    const { Frame, sync } = useEasybase();
  
    const handleDelete = ({}) => {
      const deleteTitle = title;
      
      Frame().pop({
        title: deleteTitle,
      })
      
      sync();
    }
  
    return <button onClick={handleDelete} type="button" className="delete-btn"><FaTrash></FaTrash></button>
  }

  export default DeleteButton