import logoUrl from "./logo.svg";
import assert from "@brillout/assert";

import React from "react";

export const tab_app_name = "minutetimer";
export const tab_app_url = "https://www.minutetimer.one";
export const tab_app_source_code = "https://github.com/halun803/clocktab";
export const tab_app_mail = compute_mail("minutetimer");

export const TabAppRoadmap = () => (
  <>
    <li>
      Make Clock Tab more robust. (Less bugs, more resilient, and please{" "}
      <a href="/repair">report any bug</a> you may find!)
    </li>
    <li>Make Clock Tab work offline.</li>
    <li>
      Remove memory leak. (Clock Tab can sometimes consumes a lot of CPU and
      RAM.)
    </li>
    <li>Detect and adapt to browser dark theme mode.</li>
    <li>Improve theme customization.</li>
    <li>More themes.</li>
    <li>Beautiful analog clock.</li>
    <li>Option to move position of Clock, e.g. in the top left corner.</li>
    <li>Option to set YouTube live stream as background.</li>
    <li>Make Clock Tab load faster.</li>
  </>
);

