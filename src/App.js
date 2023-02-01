import React, { useState, useEffect } from "react";

import "./App.css";

import { data, strengthPassword } from "./data";

function App() {
  const [password, setPassword] = useState("");
  const [strenthColorPassword, setStrenthColorPassword] = useState([]);

  const inputChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const chekPaswword = () => {
    let res = {};
    data.arrNum.forEach((num) => {
      if (password.includes(num)) {
        res.hasNumber = true;
        return;
      }
    });
    data.arrLetters.forEach((num) => {
      if (password.includes(num)) {
        res.hasLetters = true;
        return;
      }
    });
    data.arrSymb.forEach((num) => {
      if (password.includes(num)) {
        res.hasSymbols = true;
        return;
      }
    });
    return res;
  };

  const {
    hasLetters = false,
    hasNumber = false,
    hasSymbols = false,
  } = chekPaswword();

  useEffect(() => {
    if (!password.length) {
      setStrenthColorPassword(strengthPassword.empty);
    } else if (password.length < "8") {
      setStrenthColorPassword(strengthPassword.lessEightSymbol);
    } else if (password.length >= 8 && hasNumber && !hasLetters & !hasSymbols) {
      setStrenthColorPassword(strengthPassword.easy);
    } else if (password.length >= 8 && !hasNumber && hasLetters & !hasSymbols) {
      setStrenthColorPassword(strengthPassword.easy);
    } else if (password.length >= 8 && !hasNumber && !hasLetters & hasSymbols) {
      setStrenthColorPassword(strengthPassword.easy);
    } else if (password.length >= 8 && hasNumber && hasLetters & !hasSymbols) {
      setStrenthColorPassword(strengthPassword.medium);
    } else if (password.length >= 8 && hasNumber && !hasLetters & hasSymbols) {
      setStrenthColorPassword(strengthPassword.medium);
    } else if (password.length >= 8 && !hasNumber && hasLetters & hasSymbols) {
      setStrenthColorPassword(strengthPassword.medium);
    } else if (password.length >= 8 && hasNumber && hasLetters & hasSymbols) {
      setStrenthColorPassword(strengthPassword.strong);
    }
  }, [hasLetters, hasNumber, hasSymbols, password.length]);

  return (
    <div className="App">
      <div className="Container">
        <div>
          <h1>Test password</h1>
        </div>
        <div className="Main-container">
          <input
            value={password}
            onChange={inputChange}
            type={"password"}
            style={{ width: "95%" }}
          ></input>
          <div className="Strength-container">
            <span
              className="Strength"
              style={{ backgroundColor: `${strenthColorPassword[0]}` }}
            ></span>
            <span
              className="Strength"
              style={{ backgroundColor: `${strenthColorPassword[1]}` }}
            ></span>
            <span
              className="Strength"
              style={{ backgroundColor: `${strenthColorPassword[2]}` }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
