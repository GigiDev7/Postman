import React, { useRef } from "react";

const Parameters = ({
  url,
  setUrl,
  id,
  paramKey,
  paramVal,
  params,
  setParams,
  headerKey,
  headerVal,
  headers,
  setHeaders,
  activeParam,
}) => {
  const urlRef = useRef(url);

  const handleChange = (e) => {
    if (activeParam === "Headers") {
      setHeaders((prev) => {
        const target = prev.find((el) => el.id === id);
        const newArr = prev.filter((el) => el.id !== id);
        return [...newArr, { ...target, [e.target.name]: e.target.value }];
      });
    } else if (activeParam === "Query Params") {
      if (e.target.name === "paramKey") {
        if (params.length > 1) {
          setUrl(urlRef.current + "&" + e.target.value);
        } else {
          setUrl(urlRef.current + "?" + e.target.value);
        }
      } else {
        if (params.length > 1) {
          setUrl(urlRef.current + "&" + paramKey + "=" + e.target.value);
        } else {
          setUrl(urlRef.current + "?" + paramKey + "=" + e.target.value);
        }
      }

      setParams((prev) => {
        const temp = params.find((el) => el.id === id);
        const newArr = prev.filter((el) => el.id !== id);
        return [...newArr, { ...temp, [e.target.name]: e.target.value }];
      });
    }
  };

  const onRemoveClick = () => {
    if (activeParam === "Headers") {
      setHeaders((prev) => prev.filter((item) => item.id !== id));
    } else if (activeParam === "Query Params") {
      const str = `${paramKey}=${paramVal}`;

      setUrl((prev) => {
        const indx = prev.indexOf(str);
        if (prev[indx - 1] === "?") {
          return (
            prev.slice(0, indx - 1) +
            (prev.slice(indx + str.length + 1) ? "?" : "") +
            prev.slice(indx + str.length + 1)
          );
        } else if (str === "=") {
          return prev;
        } else {
          return prev.slice(0, indx - 1) + prev.slice(indx + str.length);
        }
      });
      setParams((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="mt-2">
      <div>
        <input
          value={activeParam === "Headers" ? headerKey : paramKey}
          name={`${activeParam === "Headers" ? "headerKey" : "paramKey"}`}
          onChange={(e) => handleChange(e)}
          type="text"
          className="border-[1px] outline-1 outline-blue-600 py-1"
          placeholder="Key"
        />
        <input
          value={activeParam === "Headers" ? headerVal : paramVal}
          name={`${activeParam === "Headers" ? "headerVal" : "paramVal"}`}
          onChange={(e) => handleChange(e)}
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
