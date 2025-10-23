import { useState } from "react";

export default function App() {
  const [name, setName] = useState("Chris");
  function handleClick() {
    const inputName = prompt("名前を入力して下さい");
    setName(inputName);
  }
  return <p onClick={handleClick}>Player 1: {name}</p>;
}