import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Parameters from "../components/Parameters";

const Home = () => {
  const [paramsCount, setParamsCount] = useState(0);
  const [activeParam, setActiveParam] = useState("Query Params");

  const activeClass = "text-gray-600";
  const inactiveClass = "text-blue-600";

  const onAddClick = () => {
    setParamsCount((prevCount) => (prevCount += 1));
  };

  const onActiveParamChange = (val) => {
    setActiveParam(val);
  };

  return (
    <div>
      <form>
        <div className="mb-4 flex">
          <select
            defaultValue="GET"
            className="flex flex-grow-0 w-auto border-[1px] py-2 px-1 outline-0"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            className="w-[400px] pl-1 outline-0 border-[1px]"
            required
            type="url"
            placeholder="http://example.com"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 px-5 text-white"
            type="submit"
          >
            Send
          </button>
        </div>

        <div className="mt-12 mb-12">
          <ul className="flex gap-8">
            <li role="presentation">
              <button
                onClick={() => onActiveParamChange("Query Params")}
                className={
                  activeParam === "Query Params" ? activeClass : inactiveClass
                }
                type="button"
              >
                Query Params
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
            <li role="presentation">
              <button
                onClick={() => onActiveParamChange("JSON")}
                className={activeParam === "JSON" ? activeClass : inactiveClass}
                type="button"
              >
                JSON
              </button>
            </li>
          </ul>
        </div>

        {[...Array(paramsCount)].map((item) => (
          <Parameters setParamsCount={setParamsCount} key={uuidv4()} />
        ))}

        <button
          onClick={onAddClick}
          className="mt-8 text-green-500 border-green-500 border-[1px] px-4 py-1 rounded font-semibold"
          type="button"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Home;
