import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return (
    <p className="text-xs text-red-600 mt-1" role="alert">
      * {props.message}
    </p>
  );
};

export default ErrorMessage;
