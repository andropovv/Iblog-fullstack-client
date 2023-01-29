import React from "react";

const MyButtonBlue = ({ children, ...rest }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl disabled:bg-blue-400`}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default MyButtonBlue;
