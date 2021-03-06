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
import {
  setTaskList,
  addTaskToList,
  deleteTask,
  changeTaskStatus
} from "../Redux/TaskList/taskList.actions";
//import { useState, useEffect } from "react";
import { TaskItem } from "../Components/TaskItem";
import { connect } from "react-redux";
class ReduxBasedPage extends React.Component {
  constructor(props) {
    super(props);
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
    console.log(data);
    this.props.setTaskList(data);
  }
  //adding data
  addItem = async () => {
    let newTask = { name: this.state.input, completed: false };
    let id = await addTask(newTask);

    this.props.addTaskToList({ ...newTask, id });
  };

  //delet data
  delItem = (taskToDel) => {
    delTask(taskToDel);
    this.props.deleteTask(taskToDel);
  };

  //update
  completedChange = (checkValue, taskToUpdate) => {
    this.props.changeTaskStatus(checkValue, taskToUpdate);
    updateTask(checkValue, taskToUpdate);
  };

  render() {
    return (
      <div>
        <h1>To-Do List (Redux & firebase)</h1>
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

        {this.props.taskList === null ? (
          "Loading..."
        ) : this.props.taskList.length === 0 ? (
          <div className="taskContainer">Empty! Please add task</div>
        ) : (
          <div className="taskContainer">
            {this.props.taskList.map((task) => {
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

const mapStateToProps = (state) => ({
  taskList: state.taskList.taskList
});

const mapDispatchToProps = (dispatch) => ({
  setTaskList: (data) => dispatch(setTaskList(data)),
  addTaskToList: (task) => dispatch(addTaskToList(task)),
  deleteTask: (task) => dispatch(deleteTask(task)),
  changeTaskStatus: (checkedValue, task) =>
    dispatch(changeTaskStatus(checkedValue, task))
});
export default connect(mapStateToProps, mapDispatchToProps)(ReduxBasedPage);
