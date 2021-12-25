import React from "react";
import { useState } from "react";

const TodoItem = (props) => {
  const { children, editItem, deleteItem, doneItem, doneValue, identity } =
    props;
  const [mode, setMode] = useState("list");
  const [inr, setInr] = useState(children);

  const handleDelete = () => {
    deleteItem(children);
  };
  const handleEdit = () => {
    setMode("edit");
  };
  const handleSave = () => {
    editItem(inr, identity);
    setMode("list");
  };
  const handleDone = () => {
    doneItem(identity);
  };

  return (
    <>
      {mode === "list" ? (
        <li>
          <div className="list_items">
            <div className="btNs_1" style={{ opacity: doneValue ? 0.06 : 1.0 }}>
              {children}
            </div>
            <div className="btNs_2">
              {doneValue ? (
                <>
                  <button disabled="disabled" className="btNs_inactive">
                    <i class="far fa-save"></i>
                  </button>
                  <button disabled="disabled" className="btNs_inactive">
                    <i class="far fa-check-circle"></i>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleEdit} className="btNs_active">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onClick={handleDone} className="btNs_active">
                    <i class="far fa-check-circle"></i>
                  </button>
                </>
              )}
              <button onClick={handleDelete} className="btNs_active">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </li>
      ) : (
        <li>
          <input
            type="text"
            placeholder="Edit Task"
            value={inr}
            onChange={(e) => setInr(e.target.value)}
          />
          {inr.length > 0 ? (
            <button onClick={handleSave} className="btNs_active">
              <i class="far fa-save"></i>
            </button>
          ) : (
            <button disabled="disabled">
              <i class="far fa-save"></i>
            </button>
          )}
        </li>
      )}
    </>
  );
};

export default TodoItem;
