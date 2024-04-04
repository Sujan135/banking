import React, { HTMLAttributes } from "react";

type InputTextProps = {
  input: string;
  onChange: HTMLAttributes<HTMLInputElement>["onChange"];
  type?: string;
};

const InputText = (props: InputTextProps) => {
  return (
    <input
      className="border px-2 py-1 hover:border-b-3 border-b-3 border-b-transparent outline outline-1 outline-gray-500 hover:border-b-solid hover:border-b-green-600"
      type={props.type || "text"}
      value={props.input}
      onChange={props.onChange}
      required
    ></input>
  );
};

export default InputText;
