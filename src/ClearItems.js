import { useEasybase } from 'easybase-react';

function ClearItems() {
    const { Frame, sync, db } = useEasybase();

    const handleClear = () => {
        Frame().pop();
      
        sync();
    }
  
    return <button className="clear-btn" onClick={handleClear}>Clear Items</button>
  }

  export default ClearItems