import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { DocumentSummaryResponse } from "~/utils/openAiUtils";

const SummaryAndChecklist: React.FC<DocumentSummaryResponse> = ({
  summary,
  checklist,
}) => {
  return (
    <div className="overflow-y-auto p-5 text-xs">
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Summary</h3>
        <p className="text-sm">{summary}</p>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">Checklist</h3>
        <div className="space-y-4">
          {checklist.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 items-center rounded-lg bg-white p-4 shadow-md"
            >
              <p className="col-span-10 text-sm text-black">{item.question}</p>
              <div className="col-span-2 flex justify-end">
                {item.status ? (
                  <AiOutlineCheckCircle size={24} className="text-green-500" />
                ) : (
                  <AiOutlineCloseCircle size={24} className="text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryAndChecklist;
