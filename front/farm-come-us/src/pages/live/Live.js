import React from "react";

import { Routes, Route, useMatch } from "react-router-dom";
import RunningLive from "./RunningLive";
import ScheduledLive from "./ScheduledLive";

const Live = () => {
  return (
    <div className={``}>
      <Routes>
        <Route path="" element={<RunningLive />}></Route>
        <Route path="" element={<ScheduledLive />}></Route>
      </Routes>
    </div>
  );
};

export default Live;
