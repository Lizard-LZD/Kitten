import { Spin } from "antd";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./style.css";

export default function Loading(props) {
  const spinnerRoot = document.getElementById("spinnerRoot");
  // const el = useRef(document.createElement("div"));
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    spinnerRoot.appendChild(el.current);
    return () => {
      spinnerRoot.removeChild(el.current);
    };
  }, [spinnerRoot]);
  return ReactDOM.createPortal(
    <div className="loadingContent">
      <Spin className="loadingSpinner" tip="Please wait..." size="large"></Spin>
    </div>,
    el.current
  );
}
