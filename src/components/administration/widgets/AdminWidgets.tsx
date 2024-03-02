"use client";
import React, { useRef, useState } from "react";
import { Reorder } from "framer-motion";
import UrgentInfo from "@/components/administration/widgets/UrgentInfo";
import LastUsersWidget from "@/components/administration/widgets/LastUsersWidget";
import { Grip } from "lucide-react";
import LastRidesWidget from "@/components/administration/widgets/LastRidesWidget";

const AdminWidgetsArr = [
  {
    type: "widget",
    name: "ინფორმაცია",
    description: "სასწრაფო ინფორმაცია რომელიც გამოჩნდება საიტის თავში",
    value: UrgentInfo,
  },
  {
    type: "widget",
    name: "ბოლო 5 მომხმარებელი",
    description: "ბოლოს რეგისტრირებული მომხმარებლები",
    value: LastUsersWidget,
  },
  {
    type: "widget",
    name: "ბოლო 5 მგზავრობა",
    description: "ბოლოს გაზიარებული მგზავრობები",
    value: LastRidesWidget,
  },
];

const AdminWidgets = () => {
  const [widgets, setWidgets] = useState(AdminWidgetsArr);

  return (
    <Reorder.Group
      className="inline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-4"
      values={widgets}
      onReorder={setWidgets}
    >
      {widgets.map((widget, index) => (
        <div
          key={index}
          className="h-auto p-4 rounded-xl bg-white flex flex-col flex-shrink-0 gap-4"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-sm font-bold fira-go">{widget.name}</h2>
              <p className="text-xs fira-go">{widget.description}</p>
            </div>
            <Grip size={16} className="cursor-move" />
          </div>
          <widget.value />
        </div>
      ))}
    </Reorder.Group>
  );
};

export default AdminWidgets;
