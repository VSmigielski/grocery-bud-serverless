import React, {useEffect} from 'react'
import { useEasybase } from 'easybase-react';
import DeleteButton from './DeleteButton';

const List = ({list}) => {
    const { Frame, sync, configureFrame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "GROCERYLIST", limit: 30 });
    sync();
  }, [list]);

  return (
      <>
      <div className="grocery-list">
        {Frame().map((item) => {
            const {id, title} = item;
            return <article key={id} className="grocery-item">
                <p className="title">{title}</p>
                <div className="btn-container">
                    <DeleteButton _key={id} title={title}/> 
                </div>
            </article>
        })}
      </div>
      </>
  )
}

export default List