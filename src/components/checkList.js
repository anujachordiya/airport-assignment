import React, { useState } from "react";
import '../css/checkList.css';

const types= [
    {
        "id":1,
        "type":"small"
    },
    {
        "id":2,
        "type":"medium"
    },
    {
      "id":3,
      "type":"large"
    },
    {
      "id":4,
      "type":"Heliport"
    },
    {
      "id":5,
      "type":"Closed"
    },
    {
      "id":6,
      "type":"In your favorites"
    }

]

//console.log(Types);
const CheckList = ({ active, onChange }) => {

  const [checked,setChecked] = useState([])

  const handleToggle = (item) =>{
    const  currentIndex = checked.indexOf(item);
    const newChecked = [...checked];

    if(currentIndex === -1)
    {
      newChecked.push(item)
    }
    else{
      newChecked.splice(currentIndex,1)
    }
    setChecked(newChecked)
  }

  return (
    <div>
      {types.map((item, index) => (
        <label key={item.label}>
          <input
            type="checkbox"
            onChange={()=>handleToggle(item.id)}
          />
         
         
        
        <span className="types-checklist">{item.type}</span>
        </label>
            
      ))}
    </div>
  );
};

export default CheckList;
