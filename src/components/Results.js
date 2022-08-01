import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const Results = ({ data, responseDetails, responseHeaders }) => {
  const [activeParam, setActiveParam] = useState("Body");

  const activeClass = "text-gray-600";
  const inactiveClass = "text-blue-600";

  const onActiveParamChange = (val) => {
    setActiveParam(val);
  };

  return (
    <div className="mt-12 mb-8">
      <h3 className="font-semibold">Response</h3>
      <div className="flex gap-5 mt-3 text-[15px]">
        <div>
          Status: <span>{responseDetails.status}</span>
        </div>
        <div>
          Time: <span>{responseDetails.time}ms</span>
        </div>
        <div>
          Size: <span>{responseDetails.size}</span>
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

      {responseHeaders !== null && activeParam === "Headers" && (
        <div className="border-[1px] border-gray-200 py-2 pl-1">
          {Object.entries(responseHeaders).map((item) => (
            <div className="flex mt-2" key={item[0]}>
              <p className="w-[40%]">{item[0]}</p>
              <p className="w-[40%]">{item[1]}</p>
            </div>
          ))}
        </div>
      )}

      {activeParam === "Body" && (
        <Editor
          height="200px"
          defaultLanguage="json"
          defaultValue="{}"
          value={JSON.stringify(data)}
          options={{ readOnly: true }}
        />
      )}
    </div>
  );
};

export default Results;
