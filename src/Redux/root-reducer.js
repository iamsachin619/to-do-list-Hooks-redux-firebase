import { combineReducers } from "redux";

import TaskListReducer from "./TaskList/taskList.reducer";

export default combineReducers({
  taskList: TaskListReducer
});
