import { React, useState, useEffect } from "react";
import "./Todoitem.css";

function Todoitem() {
  function getdatafromstorage() {
    const todolist = localStorage.getItem("my todos item");
    if (todolist) {
      return JSON.parse(todolist);
    } else {
      return [];
    }
  }

  const [edititem, setEdititem] = useState(false);
  const [todos, setTodos] = useState(getdatafromstorage());
  const [todoitem, setTodoitem] = useState("");
  const [getindex, setGetindex] = useState();

  function addtodo() {
    if (todoitem) {
      setTodos([...todos, todoitem]);
      setTodoitem("");
    } else {
      alert("write something please");
    }
  }

  function edittodo(todo, index) {
    setGetindex(index);
    setEdititem(true);
    setTodoitem(todo);
  }
  function updatetodo() {
    if (todoitem !== "") {
      todos.splice(getindex, 1, todoitem);
    } else {
      alert("write something please");
    }
    setEdititem(false);
    setTodoitem("");
    localStorage.setItem("my todos item", JSON.stringify(todos));
  }

  function deletetodo(index) {
    const newtodo = todos.filter((todo2, index2) => {
      return index2 !== index;
    });
    setTodos(newtodo);
  }

  useEffect(() => {
    localStorage.setItem("my todos item", JSON.stringify(todos));
  }, [todos]);

  function deleteall() {
    setTodos([]);
    localStorage.clear();
  }

  return (
    <div className="maindiv">
      <div className="tododiv">
        <h1 className="h1">
          {" "}
          <u> MY TODO APP </u>{" "}
        </h1>
        <input
          type="text"
          className="input1"
          placeholder="WRITE YOUR TODO HERE"
          value={todoitem}
          onChange={(elem) => {
            setTodoitem(elem.target.value);
          }}
        />
        {edititem === true ? (
          <button
            className="yellowbtn"
            onClick={() => {
              updatetodo();
            }}
          >
            {" "}
            <b>UPDATE</b>{" "}
          </button>
        ) : (
          <button
            className="greenbtn"
            onClick={() => {
              addtodo();
            }}
          >
            <b>ADD</b>
          </button>
        )}
      </div>
      <div className="listdiv">
        {todos.map((todo, index) => {
          return (
            <div className="listdiv2" key={index}>
              <button
                className="bluebtn"
                onClick={() => {
                  edittodo(todo, index);
                }}
              >
                <b>EDIT</b>
              </button>
              <pre>
                <p>
                  <b>{`${index + 1}: `}</b>
                  {`${todo}`}
                </p>
              </pre>
              <button
                className="redbtn"
                onClick={() => {
                  deletetodo(index);
                }}
              >
                <b>REMOVE</b>
              </button>
            </div>
          );
        })}
        {todos.length !== 0 ? (
          <button className="redbtn2" onClick={deleteall}>
            <b>REMOVE ALL</b>
          </button>
        ) : (
          <p>NO TODO HERE</p>
        )}
      </div>
    </div>
  );
}

export default Todoitem;
