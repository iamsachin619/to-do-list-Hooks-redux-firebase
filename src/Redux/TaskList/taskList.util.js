export const add = (list, task) => {
  let newList = [...list, task];
  return newList;
};

export const del = (list, taskToDel) => {
  return list.filter((task) => task.id !== taskToDel.id);
};

export const edit = (list, changeObj) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === changeObj.task.id) {
      list[i].completed = changeObj.checkedValue;
    }
  }

  return [...list];
};
