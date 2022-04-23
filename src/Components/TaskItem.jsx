import { Checkbox } from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";

export function TaskItem(props) {
  return (
    <div className="taskItem">
      <Checkbox
        onChange={(value, checked) => {
          console.log(checked);
          props.completedChange(checked, props.task);
        }}
        defaultChecked={props.task.completed}
      >
        {props.task.completed ? <del>{props.task.name}</del> : props.task.name}
      </Checkbox>
      <span
        className="delBtn"
        onClick={() => {
          console.log("del!!");
          props.delItem(props.task);
        }}
      >
        <CloseOutlineIcon />
      </span>
    </div>
  );
}
