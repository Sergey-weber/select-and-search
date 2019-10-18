import React, { useState, useEffect } from "react";
import axios from "axios";
import Items from "./Items";
import "./App.css";

const count = 100;
const urlData = `https://uinames.com/api/?amount=${count}`;

function App() {
  const [isOpenSelect, setOpenSelect] = useState(false);
  const [data, setData] = useState([]);
  const [currentValue, setCurrentValue] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const [filterData, setFiterData] = useState([]);

  const getData = async url => {
    try {
      const { data } = await axios.get(url);

      const items = [];

      Object.keys(data).map(i => {
        items.push(data[i].name);
      });
      setData(items);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getData(urlData);
  }, []);

  const chooseItem = e => {
    const itemValue = e.target.getAttribute("itemValue");

    setCurrentValue([...currentValue, itemValue]);

    const updateData = data.filter(i => i !== itemValue);

    setData(updateData);

    setOpenSelect(false);
  };

  const removeItem = e => {
    const itemValue = e.target.getAttribute("itemValue");
    const updateCurrentValue = currentValue.filter(i => i !== itemValue);

    setCurrentValue(updateCurrentValue);

    const updateData = [...data, itemValue];

    setData(updateData);
  };

  const changefilterData = e => {
    const { value } = e.target;

    setValueInput(value);

    const search = data.filter(i => i.includes(value));

    setFiterData(search);
  };

  return (
    <section>
      <div className="block">
        <div className="wrap_current">
          {currentValue &&
            currentValue.map((currentItem, index) => (
              <span key={index}>
                {currentItem}
                <span
                  className="removeBtn"
                  itemValue={currentItem}
                  onClick={removeItem}
                >
                  X
                </span>
              </span>
            ))}
        </div>
        <input
          onFocus={() => setOpenSelect(true)}
          onChange={changefilterData}
          value={valueInput}
          className="search"
        />
        <div className="wrap_result">
          {isOpenSelect && data && (
            <Items
              data={filterData.length === 0 ? data : filterData}
              callBack={chooseItem}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
