import React from "react";

interface IErrorPageProps {
  code?: number;
  message?: string;
}

const ErrorPage: React.FC<IErrorPageProps> = ({ code, message }) => {
  let newMessage = message;

  if (code === 404 && !newMessage) {
    newMessage = "404 - Not Found";
  } else if (code === 403 && !newMessage) {
    newMessage = "403 - Forbidden";
  }
  return (
    <div className="w-100 m-auto text-center">
      <img
        className="m-auto"
        alt="Error"
        src="https://app.themartec.com/static/media/Girl.5a129422.png"
      />
      <div>
        {newMessage ||
          "Whoops! Something went wrong. Please refresh and try again!"}
      </div>
    </div>
  );
};

export default ErrorPage;
