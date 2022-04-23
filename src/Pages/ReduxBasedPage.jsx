import React from "react";
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

export class ReduxBasedPage extends React.Component {
  constructor() {
    super();
    this.state = {
      taskList: null,
      input: ""
    };
  }

  //adding data
  addItem = async () => {
    let newTask = { name: this.state.input, completed: false };
    let id = await addTask(newTask);

    this.setState({ taskList: [...this.state.taskList, { ...newTask, id }] });
  };

  //delet data
  delItem = (taskToDel) => {
    let newT = [...this.state.taskList];
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
    this.setState({ taskList: [...newT] });
  };

  //update
  completedChange = (checkValue, taskToUpdate) => {
    let newT = [...this.state.taskList];

    for (let i = 0; i < newT.length; i++) {
      if (newT[i].name === taskToUpdate.name) {
        newT[i].completed = checkValue;
      }
    }
    this.setState({ taskList: [...newT] });
    updateTask(checkValue, taskToUpdate);
  };

  render() {
    return (
      <div>
        <h2>This is redux page</h2>
      </div>
    );
  }
}
