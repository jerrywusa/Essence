"use client";

import { FunctionComponent, useState } from "react";
import HistoryEntryList from "./historyEntryList";
import LineChart from "./lineChart";

interface HistoryProps {}

const History: FunctionComponent<HistoryProps> = () => {
  const [activeTab, setActiveTab] = useState<"Lessons" | "Growth">("Lessons");

  const TabNavigation: FunctionComponent = () => {
    return (
      <div className="flex">
        <div
          className={`p-4 cursor-pointer text-2xl font-bold ${
            activeTab === "Lessons" ? "text-red-500 underline" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Lessons")}
        >
          Lessons
        </div>
        <div
          className={`p-4 cursor-pointer text-2xl font-bold ${
            activeTab === "Growth" ? "text-red-500 underline" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Growth")}
        >
          Growth
        </div>
      </div>
    );
  };

  return (
    <>
      <p
        style={{
          position: "relative",
          top: "10px",
          left: "70px",
          color: "white",
          fontSize: "56px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          width: "600px",
          marginBottom: "20px",
        }}
      >
        Practice History
      </p>
      <div
        style={{
          marginLeft: "70px",
          marginBottom: "30px",
        }}
      >
        <TabNavigation />
      </div>

      {activeTab == "Lessons" && (
        <>
          <HistoryEntryList />
        </>
      )}
      {activeTab == "Growth" && (
        <div
          style={{
            display: "flex",
            width: "1370px",
            height: "500px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <LineChart />
        </div>
      )}
    </>
  );
};

export default History;
