import React from "react";

interface LabelProps {
  htmlFor: string;
  text: string;
}

const Label: React.FC<LabelProps> = (props: LabelProps) => {
  return (
    <label
      htmlFor={props.htmlFor}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {props.text}:
    </label>
  );
};

export default Label;
