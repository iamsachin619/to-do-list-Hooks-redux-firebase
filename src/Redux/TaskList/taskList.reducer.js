import { add, del, edit } from "./taskList.util.js";

const initialState = {
  taskList: null
};

const TaskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TASKLIST":
      return { ...state, taskList: action.payload };
    case "ADD_TASK":
      return {
        ...state,
        taskList: add(state.taskList, action.payload)
      };
    case "DEL_TASK":
      return {
        ...state,
        taskList: del(state.taskList, action.payload)
      };
    case "CHANGE_STATUS":
      return {
        ...state,
        taskList: edit(state.taskList, action.payload)
      };
    default:
      return state;
  }
};

export default TaskListReducer;
