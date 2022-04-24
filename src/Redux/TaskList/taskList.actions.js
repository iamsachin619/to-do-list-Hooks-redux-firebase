export const setTaskList = (data) => ({
  type: "SET_TASKLIST",
  payload: data
});

export const addTaskToList = (task) => ({
  type: "ADD_TASK",
  payload: task
});

export const changeTaskStatus = (checkedValue, task) => ({
  type: "CHANGE_STATUS",
  payload: { checkedValue, task }
});

export const deleteTask = (task) => ({
  type: "DEL_TASK",
  payload: task
});
