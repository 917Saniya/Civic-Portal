import React from "react";
import { CircleAlert, CircleCheckBig } from "lucide-react";

function Alert({ type = "success", message }) {
  return (
    <div className={`alert ${type === "error" ? "alert-error" : "alert-success"}`}>
      {type === "error" ? <CircleAlert size={16} /> : <CircleCheckBig size={16} />}
      {message}
    </div>
  );
}

export default Alert;
