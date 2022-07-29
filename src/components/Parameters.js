import React from "react";

const Parameters = ({ setParamsCount }) => {
  const onRemoveClick = () => {
    setParamsCount((prevCount) => (prevCount -= 1));
  };

  return (
    <div className="mt-2">
      <div>
        <input
          type="text"
          className="border-[1px] outline-1 outline-blue-600 py-1"
          placeholder="Key"
        />
        <input
          type="text"
          className="border-[1px]  py-1 outline-1 outline-blue-600"
          placeholder="Value"
        />
        <button
          type="button"
          onClick={onRemoveClick}
          className="px-4 border-[1px] border-red-600 py-1 ml-2 text-red-600 rounded font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Parameters;
