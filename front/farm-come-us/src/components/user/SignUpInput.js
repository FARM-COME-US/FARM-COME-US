import { useState } from "react";
import { IconName } from "react-icons/md";
import classes from "./SignUpInput.module.scss";

const SignUpInput = (props) => {
  //   const [onFocus, setOnFocus] = useState(false);
  const onFocus = "";
  const setOnFocus = () => {
    console.log("as");
  };

  return (
    <div className={`${classes.outerInput} ${onFocus ? classes.focus : ""}`}>
      {/* {props.render} */}
      <input
        className={classes.innerInput}
        onFocus={() => {
          setOnFocus(true);
        }}
        onBlur={() => {
          setOnFocus(false);
          props.onBlur;
        }}
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={props.type}
      ></input>
    </div>
  );
};

export default SignUpInput;
