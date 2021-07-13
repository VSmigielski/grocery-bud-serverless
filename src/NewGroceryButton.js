import { EasybaseProvider, useEasybase } from 'easybase-react';

function NewGroceryButton() {
    const { Frame, sync } = useEasybase();
  
    const handleClick = () => {
      const newTitle = prompt("Please enter a grocery item");
      
      Frame().push({
        title: newTitle,
      })
      
      sync();
    }
  
    return <button onClick={handleClick}>Submit</button>
  }

  export default NewGroceryButton