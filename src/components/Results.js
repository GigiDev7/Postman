import React, { useState } from "react";

const Results = () => {
  const [activeParam, setActiveParam] = useState("Body");

  const activeClass = "text-gray-600";
  const inactiveClass = "text-blue-600";

  const onActiveParamChange = (val) => {
    setActiveParam(val);
  };

  return (
    <div className="mt-12">
      <h3 className="font-semibold">Response</h3>
      <div className="flex gap-5 mt-3 text-[15px]">
        <div>
          Status: <span>200</span>
        </div>
        <div>
          Time: <span>ms</span>
        </div>
        <div>
          Size: <span>150B</span>
        </div>
      </div>

      <div className="mt-12 mb-12">
        <ul className="flex gap-8">
          <li role="presentation">
            <button
              onClick={() => onActiveParamChange("Body")}
              className={activeParam === "Body" ? activeClass : inactiveClass}
              type="button"
            >
              Body
            </button>
          </li>
          <li role="presentation">
            <button
              onClick={() => onActiveParamChange("Headers")}
              className={
                activeParam === "Headers" ? activeClass : inactiveClass
              }
              type="button"
            >
              Headers
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Results;
