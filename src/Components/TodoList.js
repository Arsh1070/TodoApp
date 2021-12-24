import React from "react";
import TodoInput from "./TodoInput";
import { useReducer, useEffect } from "react";
import TodoItem from "./TodoItem";

const Reducer = (initial, action) => {
  switch (action.type) {
    case "Add_item":
      return [
        ...initial,
        {
          content: action.input,
          id: action.id,
          CreateDate: action.createDate,
          CreateTime: action.createTime,
          done: false,
        },
      ];
    case "Del_item":
      return initial.filter((item) => item.content !== action.input);
    case "edit_item":
      const updatedState = initial.map((item) => {
        if (item.id === action.identity) {
          item.content = action.input;
        }
        return item;
      });
      return updatedState;
    case "done_item":
      const doneState = initial.map((item) => {
        if (item.id === action.identity) {
          item.done = true;
        }
        return item;
      });
      return doneState;

    default:
      return initial;
  }
};
const initial = [];
const TodoList = () => {
  const [Tasks, dispatch] = useReducer(Reducer, initial, () => {
    const data = JSON.parse(localStorage.getItem("Todo"));
    return data ? data : [];
  });

  const addItem = (taskValue) => {
    dispatch({
      type: "Add_item",
      input: taskValue,
      id: new Date().getTime(),
      createDate: DateObj().setDates,
      createTime: DateObj().setTimes,
    });
  };
  const deleteItem = (taskValue) => {
    dispatch({ type: "Del_item", input: taskValue });
  };
  const editItem = (taskValue, id) => {
    dispatch({ type: "edit_item", input: taskValue, identity: id });
  };
  const doneItem = (id) => {
    dispatch({ type: "done_item", identity: id });
  };

  useEffect(() => {
    localStorage.setItem("Todo", JSON.stringify(Tasks));
  }, [Tasks]);

  const DateObj = () => {
    const date = new Date();
    const GetDate = date.toDateString();
    const time = date.toLocaleString("en-us", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
    return {
      setDates: `${GetDate}`,
      setTimes: `${time}`,
    };
  };

  return (
    <div className="todo_container">
      <div className="todo_header">
        <h1>My TodoList</h1>

        <TodoInput addItem={addItem} taskLength={Tasks.length} />
      </div>
      <div>
        <ol>
          {Tasks.map((item) => {
            return (
              <>
                <TodoItem
                  deleteItem={deleteItem}
                  editItem={editItem}
                  doneItem={doneItem}
                  doneValue={item.done}
                  key={item.id}
                  identity={item.id}
                >
                  {item.content}
                </TodoItem>
                <p className="created">
                  Created at : {item.CreateDate} <span>{item.CreateTime}</span>
                </p>
              </>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
export default TodoList;
