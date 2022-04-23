import "rsuite/dist/rsuite.min.css";
import "./Page.css";
import { Checkbox, Input, InputGroup, SearchIcon } from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import {
  addTask,
  getTasks,
  updateTask,
  delTask
} from "../Firebase/firebase.util";
import { useState, useEffect } from "react";
import { TaskItem } from "../Components/TaskItem";

export function HookBasedPage() {
  const [taskList, setTaskList] = useState(null);

  async function getData() {
    const data = await getTasks();

    setTaskList(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const [input, setInput] = useState("");

  //adding data
  const addItem = async () => {
    let newTask = { name: input, completed: false };
    let id = await addTask(newTask);

    setTaskList([...taskList, { ...newTask, id }]);
  };

  //delet data
  const delItem = (taskToDel) => {
    let newT = [...taskList];
    let index;
    // newT.filter(task => task.name !== taskToDel.name);
    for (let i = 0; i < newT.length; i++) {
      if (newT[i].name === taskToDel.name) {
        index = i;
      }
    }

    newT.splice(index, 1);
    // console.log(newT, taskToDel);
    delTask(taskToDel);
    setTaskList([...newT]);
  };

  //update
  const completedChange = (checkValue, taskToUpdate) => {
    let newT = [...taskList];

    for (let i = 0; i < newT.length; i++) {
      if (newT[i].name === taskToUpdate.name) {
        newT[i].completed = checkValue;
      }
    }
    setTaskList([...newT]);
    updateTask(checkValue, taskToUpdate);
  };

  return (
    <div>
      <h1>To-Do List (Hooks & firebase)</h1>
      <div className="InputContainer">
        <InputGroup>
          <Input
            placeholder="Add your task here"
            value={input}
            onChange={(value) => {
              setInput(value);
            }}
          />
          <InputGroup.Button
            onClick={() => {
              addItem();
              setInput("");
            }}
          >
            Add
          </InputGroup.Button>
        </InputGroup>
        {/* <Input placeholder="Add your task here" /> */}
      </div>

      {taskList === null ? (
        "Loading..."
      ) : taskList.length === 0 ? (
        <div className="taskContainer">Empty! Please add task</div>
      ) : (
        <div className="taskContainer">
          {taskList.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                delItem={delItem}
                completedChange={completedChange}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
