import React from "react";

const Items = ({ data, callBack }) => {
  return (
    <div className="result">
      <ul className="list">
        {data.map((item, index) => (
          <li
            onClick={e => callBack(e)}
            className="list_item"
            key={index}
            itemValue={item}
          >
            - {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
