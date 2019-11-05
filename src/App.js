import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

    setValueInput("");
  };

  const removeItem = itemValue => {
    const updateCurrentValue = currentValue.filter(i => i !== itemValue);

    setCurrentValue(updateCurrentValue);

    const updateData = [...data, itemValue];

    setData(updateData);
  };

  const changefilterData = e => {
    const { value } = e.target;
    const valueUpperCase = value.toUpperCase();

    setValueInput(value);

    const search = data.filter(i => i.toUpperCase().includes(valueUpperCase));

    setFiterData(search);
  };

  const chaneOpenSelect = e => {
    const { className, tagName } = e.target;

    if (tagName !== "INPUT" && className !== "list_item") setOpenSelect(false);
  };

  return (
    <section onClick={chaneOpenSelect}>
      <div className="block">
        <ItemsSearch>
          <WrapSelectItems>
            {currentValue &&
              currentValue.map((currentItem, index) => (
                <SelectItem key={index}>
                  {currentItem}
                  <RemoveButton onClick={() => removeItem(currentItem)}>
                    X
                  </RemoveButton>
                </SelectItem>
              ))}
          </WrapSelectItems>
          <Search
            onFocus={() => setOpenSelect(true)}
            onChange={changefilterData}
            value={valueInput}
            placeholder={currentValue.length === 0 && "Выберите язык"}
            className="search"
          />
        </ItemsSearch>
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

const WrapSelectItems = styled.div``;

const SelectItem = styled.span`
  display: block;
  float: left;
  color: #282c34;
`;

const RemoveButton = styled.span`
  color: brown;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  margin-left: 5px;
  margin-right: 15px;
  cursor: pointer;
`;

const Search = styled.input`
  height: 30px;
  border: 2px solid #6ea1f9;
  float: left;
  width: 170px;
`;

const ItemsSearch = styled.div`
  width: 300px;
  height: auto;
  min-height: 20px;
  background-color: #fff;
`;

export default App;
