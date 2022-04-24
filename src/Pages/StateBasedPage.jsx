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
    this.getData();
    this.addItem = this.addItem.bind(this);
    this.delItem = this.delItem.bind(this);
    this.completedChange = this.completedChange.bind(this);
  }
  async getData() {
    const data = await getTasks();
    this.setState({ taskList: data });
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
        <h1>To-Do List (State & firebase)</h1>
        <div className="InputContainer">
          <InputGroup>
            <Input
              placeholder="Add your task here"
              value={this.state.input}
              onChange={(value) => {
                this.setState({ input: value });
              }}
            />
            <InputGroup.Button
              onClick={() => {
                this.addItem();
                this.setState({ input: "" });
              }}
            >
              Add
            </InputGroup.Button>
          </InputGroup>
          {/* <Input placeholder="Add your task here" /> */}
        </div>

        {this.state.taskList === null ? (
          "Loading..."
        ) : this.state.taskList.length === 0 ? (
          <div className="taskContainer">Empty! Please add task</div>
        ) : (
          <div className="taskContainer">
            {this.state.taskList.map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  delItem={this.delItem}
                  completedChange={this.completedChange}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
