import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
interface AccordionProps {
  question: string;
  status: boolean;
  reason: string;
}
const Accordion: React.FC<AccordionProps> = ({ question, reason, status }) => {


  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <motion.div
        className="flex-w flex  w-full items-center justify-between gap-4 rounded-lg border bg-[#f5f5f5] px-2 py-2 hover:cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="w-[90%]">{question}</div>{" "}
        <div className=" flex w-[10%] items-center justify-center gap-2">
          {" "}
          <div className="flex items-center justify-center">
            <div className=" flex ">
              {status ? (
                <AiOutlineCheckCircle size={24} className="text-green-500" />
              ) : (
                <AiOutlineCloseCircle size={24} className="text-red-500" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            {isOpen ? (
              <MdKeyboardArrowUp size={24} />
            ) : (
              <IoIosArrowDown size={18} />
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="px-5 pt-4"
            initial={{ opacity: 0, y: "-10%" }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              y: "-10%",
              transition: {
                duration: 0.2,
              },
            }}
          >
            <span className="">{reason}</span>
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
