import React from "react";
import { AccountInfo } from "./AccountToggle";

import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

export const Sidebar = () => {
  return (
    <div>
      <div className="overflow sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountInfo />
        
        <RouteSelect />
      </div>

      <Plan />
    </div>
  );
};
