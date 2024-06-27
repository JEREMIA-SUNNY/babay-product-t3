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
  console.log(percentage);
  return (
    <CircularProgressbarWithChildren
      styles={buildStyles({
        textColor: "red",
        pathColor:
          percentage < 50 ? "red" : percentage >= 80 ? "green" : "orange",
        trailColor: "#",
      })}
      value={analyzeTextGpt ? percentage : 0}
    >
      {" "}
      {analyzeTextGpt ? (
        <div style={{ fontSize: 18, marginTop: -5, color: "black" }}>
          <strong> {analyzeTextGpt ? percentage : 0} %</strong>
        </div>
      ) : null}
    </CircularProgressbarWithChildren>
  );
};

export default ComplianceScore;
