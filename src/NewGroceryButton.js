import { useEasybase } from 'easybase-react';

function NewGroceryButton({name}) {
    const { Frame, sync } = useEasybase();
  
    const handleClick = () => {
      const newTitle = name;
      
      Frame().push({
        title: newTitle,
      })
      
      sync();
    }
  
    return <button onClick={handleClick} type="submit" className="submit-btn">Submit</button>
  }

  export default NewGroceryButton