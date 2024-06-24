import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

interface ChecklistItem {
  question: string;
  reason: string;
  status: boolean;
}
interface props {
  analyzeTextGpt: string | null;
  percentage: number;
}
const ComplianceScore: React.FC<props> = ({ analyzeTextGpt, percentage }) => {
  return (
    <CircularProgressbarWithChildren
      styles={buildStyles({
        textColor: "red",
        pathColor: "green",
        trailColor: "#",
      })}
      value={analyzeTextGpt ? percentage : 0}
    >
      {" "}
      <div style={{ fontSize: 18, marginTop: -5, color: "black" }}>
        <strong> {analyzeTextGpt ? percentage : 0} %</strong>
      </div>
    </CircularProgressbarWithChildren>
  );
};

export default ComplianceScore;
