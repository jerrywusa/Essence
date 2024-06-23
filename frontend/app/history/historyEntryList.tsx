"use client";

import { FunctionComponent, useContext } from "react";
import { Context } from "../page";
import HistoryEntry from "./historyEntry";
import { uid } from "uid";
import { HistoryEntryType } from "../types";

interface HistoryEntryListProps {}

const HistoryEntryList: FunctionComponent<HistoryEntryListProps> = () => {
  const { historyEntryList } = useContext(Context);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      {historyEntryList.map((historyEntry: HistoryEntryType) => (
        <HistoryEntry key={uid()} historyEntry={historyEntry} />
      ))}
    </div>
  );
};

export default HistoryEntryList;
