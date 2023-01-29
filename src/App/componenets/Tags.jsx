import React from "react";

const Tags = ({ tags }) => {
  return (
    <>
      {tags[0] && (
        <div className="text-blue-800 text-lg flex mt-1">
          {tags.map((t, index) => {
            if (index === 0) return <p key={index}>#{t}</p>;
            return <p key={index}>, #{t}</p>;
          })}
        </div>
      )}
    </>
  );
};

export default Tags;
