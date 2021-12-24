import React from "react";
import { useState } from "react";

const TodoInput = (props) => {
  const { addItem, taskLength } = props;
  const [inr, setInr] = useState("");

  const handleClick = () => {
    addItem(inr);
    setInr("");
  };

  return (
    <>
      <div className="inputText">
        <input
          type="text"
          placeholder="Add Task"
          value={inr}
          onChange={(e) => setInr(e.target.value)}
        />
        {inr.length > 0 ? (
          <button type="submit" onClick={handleClick} className="addBtn_active">
            Add
          </button>
        ) : (
          <button type="submit" disabled="disabled" className="addBtn">
            Add
          </button>
        )}
      </div>

      <span>Total Tasks: {taskLength}</span>
    </>
  );
};

export default TodoInput;
