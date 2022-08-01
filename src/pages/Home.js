import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Parameters from "../components/Parameters";
import axios from "axios";
import Results from "../components/Results";

const Home = () => {
  const [params, setParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [activeParam, setActiveParam] = useState("Query Params");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");

  const [result, setResult] = useState(null);
  const [responseDetails, setResponseDetails] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState(null);

  const activeClass = "text-gray-600";
  const inactiveClass = "text-blue-600";

  const onAddClick = () => {
    if (activeParam === "Query Params") {
      setParams((prevCount) => {
        const id = uuidv4();
        return [...prevCount, { id, paramKey: "", paramVal: "" }];
      });
    } else if (activeParam === "Headers") {
      setHeaders((prevHeaders) => {
        const id = uuidv4();
        return [...prevHeaders, { id, headerKey: "", headerVal: "" }];
      });
    }
  };

  const onActiveParamChange = (val) => {
    setActiveParam(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /*  let paramsObj = {};

    const myUrl = new URL(url);
    for (const [key, value] of myUrl.searchParams.entries()) {
      paramsObj[key] = value;
    } */

    let headersObj = {};

    for (let item of headers) {
      headersObj[item.headerKey] = item.headerVal;
    }

    axios({
      url,
      method,
      headers: headersObj,
      //params: paramsObj,
    }).then((res) => {
      setResult(res.data);
      setResponseHeaders(res.headers);
      console.log(res.headers);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="flex flex-grow-0 w-auto border-[1px] py-2 px-1 outline-0"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            className="w-[400px] pl-1 outline-0 border-[1px]"
            required
            type="text"
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

        {activeParam === "Query Params" &&
          params.map((item) => (
            <Parameters
              {...item}
              key={item.id}
              setUrl={setUrl}
              url={url}
              params={params}
              setParams={setParams}
              activeParam={activeParam}
            />
          ))}

        {activeParam === "Headers" &&
          headers.map((item) => (
            <Parameters
              {...item}
              key={item.id}
              headers={headers}
              setHeaders={setHeaders}
              activeParam={activeParam}
            />
          ))}

        <button
          onClick={onAddClick}
          className="mt-8 text-green-500 border-green-500 border-[1px] px-4 py-1 rounded font-semibold"
          type="button"
        >
          Add
        </button>
      </form>

      {result && (
        <Results
          data={result}
          responseDetails={responseDetails}
          responseHeaders={responseHeaders}
        />
      )}
    </div>
  );
};

export default Home;
