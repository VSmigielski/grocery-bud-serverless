import React, {useState, useEffect} from 'react';
import { useEasybase } from 'easybase-react';

function ClearItems() {
    const { Frame, sync, Query } = useEasybase();
    
      const [arr, setArr] = useState([]);
    
      useEffect(() => {
        Query({ queryName: "AllTitles", tableName: "GROCERYLIST" }).then(res => {
          setArr(res);
        });
      }, [Query])

    const handleClear = () => {
        console.log(arr);
      
        for (var i = 0; i < arr.length; i++) {
            console.log(i);
            Frame().pop(i)
      
            sync();
        }
    }
  
    return <button className="clear-btn" onClick={handleClear}>Clear Items</button>
  }

  export default ClearItems