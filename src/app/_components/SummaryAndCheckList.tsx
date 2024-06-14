import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { DocumentSummaryResponse } from "~/utils/openAiUtils";
import Accordion from "./Accordion";
import { MdKeyboardArrowUp } from "react-icons/md";

const SummaryAndChecklist: React.FC<DocumentSummaryResponse> = ({
  summary,
  checklist,
}) => {
  const data = [1, 2, 3, 4, 5, 6];

  return (
    <div className="overflow-y-auto p-2  text-xs">
      <div className="mb-6 px-4 py-2">
        <h3 className=" mb-2 text-sm font-semibold">Summary</h3>
        <p className="text-xs">{summary}</p>
      </div>
      <div>
        <h3 className="mb-2 px-4 text-sm font-semibold">Checklist</h3>
        <div className="space-y-4  px-4">
          {checklist.map((item, index) => (
            <div>
              <div key={index} className=" ">
                <div className="col-span-10">
                  <Accordion
                    question={item.question}
                    status={item.status}
                    reason={item.reason}
                  />
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryAndChecklist;
