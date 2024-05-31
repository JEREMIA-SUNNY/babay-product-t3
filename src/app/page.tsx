"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { convertFileToBase64 } from "~/utils/fileUtils";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { api } from "~/trpc/react";
import ThreeDotsWaveMain from "./ThreeDotWaveMain";
type FileArray = File[];
interface FilePreviewProps {
  files: File[];
}
export default function Home() {
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const { mutate: uploadDocument, isPending: isDocumentUploading } =
    api.document.uploadDocument.useMutation({
      onSuccess: (data) => {
        setFileKey(data.fileName);
        handleExtraction(data.fileName);
      },
      onError: (error) => {
        alert(error.message);
      },
    });

  const { mutate: extractText, isPending: isExtractingText } =
    api.document.extractDocument.useMutation({
      onSuccess: (data) => {
        setExtractedText(data);
      },
      onError: (error) => {
        alert(error.message);
      },
    });

  const router = useRouter();
  const contractTypeList = [
    { name: "Supply Agreements" },
    { name: "Purchase Orders (POs)" },
    { name: "Open Purchase Orders" },
    { name: "Manufacturing Contracts" },
    { name: "Distribution and Sales Agreements" },
    { name: "Logistics and Transportation Contracts" },
    { name: "Service Contracts" },
    { name: "Intellectual Property (IP) Agreements" },
    { name: "Quality Assurance and Compliance Contracts" },
    { name: "Partnership and Joint Venture Agreementss" },
    { name: "Financial Agreements" },
    { name: "Environmental and Sustainability Contracts" },
  ];

  const templateType = [
    [
      { name: "Raw Materials Supply Agreement" },
      { name: "Component Supply Agreement" },
      { name: "Vendor Managed Inventory (VMI) Agreement" },
    ],
    [
      { name: "Standard Purchase Orders" },
      { name: "Blanket Purchase Orders" },
      { name: "Open Purchase Orders" },
    ],
    [
      { name: "Contract Manufacturing Agreement" },
      { name: "OEM (Original Equipment Manufacturer) Agreement" },
      { name: "Joint Manufacturing Agreement" },
    ],
    [
      { name: "Distribution Agreement" },
      { name: "Franchise Agreement" },
      { name: "Sales Agency Agreement" },
    ],
    [
      { name: "Freight and Transportation Agreement" },
      { name: "Warehousing Agreement" },
      { name: "Third-Party Logistics (3PL) Agreement" },
    ],
    [
      { name: "Maintenance Service Agreement" },
      { name: "IT Service Agreement" },
      { name: "Consulting Service Agreement" },
    ],
    [
      { name: "Patent Licensing Agreement" },
      { name: "Non-Disclosure Agreement (NDA)" },
      { name: "Technology Transfer Agreement" },
    ],
    [
      { name: "Quality Assurance Agreement" },
      { name: "Regulatory Compliance Agreement" },
    ],
    [
      { name: "Strategic Partnership Agreement" },
      { name: "Joint Venture Agreement" },
      ,
    ],
    [
      { name: "Employment Contracts" },
      { name: "Union Agreements" },
      { name: "Independent Contractor Agreement" },
    ],
    [{ name: "Loan Agreement" }, { name: "Lease Agreement" }],
    [
      { name: "Environmental Compliance Agreement" },
      { name: "Sustainability Partnership Agreement" },
    ],
  ];

  const [selectedContractTypeName, setSelectedContractTypeName] = useState(
    "Select Contract Type",
  );
  const [selectedContractTemplateName, setSelectedContractTemplateName] =
    useState("Select Contract Template");
  const [selectedTemplateType, setSelectedTemplateType] = useState(
    templateType[0],
  );
  const [checklistTypeIndex, setChecklistTypeIndex] = useState<number>(0);

  const handleContractTypeChange = (index: number) => {
    
    setSelectedContractTypeName(contractTypeList[index]?.name ?? "");
    setChecklistTypeIndex(index);
    
    setSelectedTemplateType(templateType[index]);
  };
  console.log(checklistTypeIndex);

  const ChecklistType = [
    { name: "Supply Agreements" },
    { name: "Purchase Orders (POs)" },
    { name: "Open Purchase Orders" },
    { name: "Manufacturing Contracts" },
    { name: "Distribution and Sales Agreements" },
    { name: "Logistics and Transportation Contracts" },
    { name: "Service Contracts" },
    { name: "Intellectual Property (IP) Agreements" },
    { name: "Quality Assurance and Compliance Contracts" },

    { name: "Partnership and Joint Venture Agreementss" },
    { name: "Financial Agreements" },
    { name: "Environmental and Sustainability Contracts" },
  ];

  const ChecklistTemplate = [
    [
      { name: "Quality Standards Compliance" },
      { name: "Material Safety Compliance" },
      { name: "Conflict Minerals Compliance" },
    ],
    [{ name: "Contractual Compliance" }, { name: "Financial Compliance" }],
    [
      { name: "Environmental Compliance:" },
      { name: "Labor Standards Compliance" },
      { name: "Health and Safety Compliance" },
    ],
    [{ name: "Trade Compliance" }, { name: "Consumer Protection Compliance" }],
    [
      { name: "Customs Compliance" },
      { name: "Transport Safety Compliance" },
      { name: "Carrier Liability Compliance" },
    ],
    [{ name: "Data Privacy Compliance" }, { name: "Service Level Compliance" }],
    [{ name: "Patent Compliance" }, { name: "Confidentiality Compliance" }],
    [{ name: "Regulatory Compliance" }, { name: "Product Safety Compliance" }],
    [
      { name: "Anti-Corruption Compliance" },
      { name: "Antitrust Compliance" },
      ,
    ],
    [
      { name: "Labor Law Compliance" },
      { name: "Employment Eligibility Compliance" },
    ],
    [{ name: "Financial Reporting Compliance" }, { name: "Tax Compliance" }],
    [
      { name: "Sustainability Standards Compliance" },
      { name: "Environmental Impact Compliance" },
    ],
  ];

  const Geography = [
    { name: "European Union" },
    { name: "United Kingdom" },
    { name: "North America" },

    { name: "China" },
    { name: "India" },
    { name: "Australia" },
  ];

  const [selectedChecklistTypeName, setSelectedChecklistTypeName] = useState(
    "Select Checklist Type",
  );
  const [
    selectedChecklistTemplateTypeName,
    setSelectedChecklistTemplateTypeName,
  ] = useState("Select Checklist Template");

  const handleTemplateTypChange = (index: string) => {
    setSelectedContractTemplateName(index);
  };

  const [selectedChecklistType, setSelectedChecklistType] = useState(
    ChecklistTemplate[0],
  );

  useEffect(() => {
    if (checklistTypeIndex) {
      setSelectedChecklistTypeName(
        ChecklistType[checklistTypeIndex]?.name ?? "",
      );
    }
  }, [checklistTypeIndex]);

  const [selectedGeograhyName, setSelectedGeograhyName] =
    useState("Select Geography");
  const handleGeographyChange = (index: string) => {
    setSelectedGeograhyName(index);
  };

  const handleChecklistTypeChange = (index: number) => {
    if (ChecklistType[checklistTypeIndex]) {
      setSelectedChecklistTypeName(
        ChecklistType[checklistTypeIndex]?.name ?? "",
      );
      const selectedTemplates = ChecklistTemplate[checklistTypeIndex] ?? [];
      setSelectedChecklistType(selectedTemplates);
      if (selectedTemplates.length > 0) {
        setSelectedChecklistTemplateTypeName(selectedTemplates[0]?.name ?? "");
      } else {
        setSelectedChecklistTemplateTypeName("Select Checklist Template");
      }
    }
  };
  const handleChecklistTemplateTypChange = (index: string) => {
    setSelectedChecklistTemplateTypeName(index);
  };

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLUListElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    if (event.dataTransfer.files.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
    overlayRef.current?.classList.remove("draggedover");
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (Array.from(event.dataTransfer.types).indexOf("Files") > -1) {
      overlayRef.current?.classList.add("draggedover");
    }
  };

  const handleDragLeave = () => {
    overlayRef.current?.classList.remove("draggedover");
  };

  const handleDelete = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    setFileKey(null);
    setExtractedText(null);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = "";
    }
  };

  const handleSubmit = async (files: FileArray) => {
    if (files.length === 0) {
      alert("No files selected");
      return;
    }
    const file = files[0];
    if (!file) {
      alert("No file selected");
      return;
    }
    const authTokenReq = process.env.NEXT_PUBLIC_AUTH_TOKEN_REQ;

    if (!authTokenReq) {
      throw new Error("Missing Token");
    }

    const base64 = await convertFileToBase64(file);
    await uploadDocument({
      base64,
      token: authTokenReq,
    });
    setIsUploading(false);
  };

  const handleCancel = () => {
    setFiles([]);
  };

  const percentage = 85;
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");

    router.push("/login");
  };

  const handleExtraction = (fileKey: string) => {
    if (fileKey) {
      const authTokenReq = process.env.NEXT_PUBLIC_AUTH_TOKEN_REQ;
      if (!authTokenReq) {
        throw new Error("Missing Token");
      }
      extractText({
        fileKey,
        token: authTokenReq,
      });
    }
  };

  const filePreviews = useMemo(() => {
    return files.map((file) => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }));
  }, [files]);

  const truncateFileName = (fileName: String, maxLength = 32) => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    const truncated = fileName.slice(0, maxLength);
    return `${truncated}...`;
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      const file = files[0];
      if (!file) throw new Error("No file selected");
      const base64 = await convertFileToBase64(file);
      const response = await axios.post("/api/uploadFile", { base64 });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <>
      <div
        onClick={handleLogout}
        className="items-  fixed right-14 top-8 z-[1000] flex h-2  gap-4 text-black transition-all duration-700 ease-in-out hover:scale-105 hover:cursor-pointer"
      >
        <svg
          className="mt-1"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="20.943px"
          height="20.943px"
          viewBox="0 0 96.943 96.943"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path
                d="M61.168,83.92H11.364V13.025H61.17c1.104,0,2-0.896,2-2V3.66c0-1.104-0.896-2-2-2H2c-1.104,0-2,0.896-2,2v89.623
         c0,1.104,0.896,2,2,2h59.168c1.105,0,2-0.896,2-2V85.92C63.168,84.814,62.274,83.92,61.168,83.92z"
              />
              <path
                d="M96.355,47.058l-26.922-26.92c-0.75-0.751-2.078-0.75-2.828,0l-6.387,6.388c-0.781,0.781-0.781,2.047,0,2.828
         l12.16,12.162H19.737c-1.104,0-2,0.896-2,2v9.912c0,1.104,0.896,2,2,2h52.644L60.221,67.59c-0.781,0.781-0.781,2.047,0,2.828
         l6.387,6.389c0.375,0.375,0.885,0.586,1.414,0.586c0.531,0,1.039-0.211,1.414-0.586l26.922-26.92
         c0.375-0.375,0.586-0.885,0.586-1.414C96.943,47.941,96.73,47.433,96.355,47.058z"
              />
            </g>
          </g>
        </svg>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center  bg-[#f5f5f5] ">
        <section className="r  4 w-full bg-white">
          <div className="   flex flex-col items-center justify-center rounded-xl">
            <div className="flex  items-center pt-4">
              <img src="/logo.png" className="h-14 object-cover" alt="" />
            </div>

            <div className=" flex  w-full   justify-center rounded-xl  bg-white px-2">
              <div className=" flex flex-col justify-center  bg-white  ">
                <div className="flex items-center justify-center px-5 pb-6">
                  <div className=" dropdown relative z-[10000] inline-block text-left">
                    <span className="rounded-md shadow-sm">
                      <button
                        className="focus: focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-[#f5f5f5] px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                        aria-controls="headlessui-menu-items-117"
                      >
                        <span>{selectedContractTypeName}</span>
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <div className="dropdown-menu invisible  origin-top-right -translate-y-2 scale-95 transform opacity-0 transition-all duration-300">
                      <div
                        className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none"
                        aria-labelledby="headlessui-menu-button-1"
                        id="headlessui-menu-items-117"
                        role="menu"
                      >
                        <div className="py-1">
                          {contractTypeList.map((item, index) => (
                            <div
                              key={index}
                              className="hover:duration-800 flex w-full justify-between px-4 py-2 text-left text-sm leading-5 text-gray-700 ease-in hover:scale-105 hover:cursor-pointer hover:font-semibold hover:transition-all"
                              role="menuitem"
                              onClick={() => handleContractTypeChange(index)}
                            >
                              {item.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col justify-center bg-white ">
                <div className="flex items-center justify-center px-5 pb-6">
                  <div className=" dropdown relative z-[10000] inline-block text-left">
                    <span className="rounded-md shadow-sm">
                      <button
                        className="focus: focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-[#f5f5f5] px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                        aria-controls="headlessui-menu-items-117"
                      >
                        <span>{selectedContractTemplateName}</span>
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <div className="dropdown-menu invisible z-[10000] origin-top-right -translate-y-2 scale-95 transform opacity-0 transition-all duration-300">
                      <div
                        className="absolute  right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none"
                        aria-labelledby="headlessui-menu-button-1"
                        role="menu"
                      >
                        <div className="py-1">
                          {selectedTemplateType?.map((item, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                handleTemplateTypChange(item?.name ?? "")
                              }
                              className="hover:duration-800 flex w-full justify-between px-4 py-2 text-left text-sm leading-5 text-black ease-in hover:scale-105 hover:cursor-pointer hover:font-semibold hover:transition-all"
                              role="menuitem"
                            >
                              {item?.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col justify-center bg-white  ">
                <div className="flex items-center justify-center px-5 pb-6">
                  <div className=" dropdown relative z-[10000] inline-block text-left">
                    <span className="rounded-md shadow-sm">
                      <button
                        className="focus: focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-[#f5f5f5] px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                        aria-controls="headlessui-menu-items-117"
                      >
                        <span>{selectedGeograhyName}</span>
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <div className="dropdown-menu invisible origin-top-right -translate-y-2 scale-95 transform opacity-0 transition-all duration-300">
                      <div
                        className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none"
                        aria-labelledby="headlessui-menu-button-1"
                        role="menu"
                      >
                        <div className="py-1 text-black">
                          {Geography.map((item, index) => (
                            <p
                              key={index}
                              className="hover:duration-800 flex w-full justify-between px-4 py-2 text-left text-sm leading-5 text-black ease-in hover:scale-105 hover:cursor-pointer hover:font-semibold hover:transition-all"
                              onClick={() => handleGeographyChange(item.name)}
                            >
                              {item.name}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col justify-center bg-white  ">
                <div className="flex items-center justify-center px-5 pb-6">
                  <div className=" dropdown  relative z-[10000] inline-block text-left">
                    <span className="rounded-md shadow-sm">
                      <button
                        className="focus: focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-[#f5f5f5] px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                        aria-controls="headlessui-menu-items-117"
                      >
                        <span>{selectedChecklistTypeName}</span>
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <div className="dropdown-menu invisible origin-top-right -translate-y-2 scale-95 transform opacity-0 transition-all duration-300">
                      <div
                        className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none"
                        aria-labelledby="headlessui-menu-button-1"
                        id="headlessui-menu-items-117"
                        role="menu"
                      >
                        <div className="py-1">
                          {ChecklistType.map((item, index) => (
                            <div
                              key={index}
                              className="hover:duration-800 flex w-full justify-between px-4 py-2 text-left text-sm leading-5 text-gray-700 ease-in hover:scale-105 hover:cursor-pointer hover:font-semibold hover:transition-all"
                              role="menuitem"
                              onClick={() => handleChecklistTypeChange(index)}
                            >
                              {item.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col justify-center bg-white  ">
                <div className="flex items-center justify-center px-5 pb-6">
                  <div className=" dropdown relative z-[10000] inline-block text-left">
                    <span className="rounded-md shadow-sm">
                      <button
                        className="focus: focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-[#f5f5f5] px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                        aria-controls="headlessui-menu-items-117"
                      >
                        <span>{selectedChecklistTemplateTypeName}</span>
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <div className="dropdown-menu invisible origin-top-right -translate-y-2 scale-95 transform opacity-0 transition-all duration-300">
                      <div
                        className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none"
                        aria-labelledby="headlessui-menu-button-1"
                        role="menu"
                      >
                        <div className="py-1">
                          {selectedChecklistType?.map((item, index) => (
                            <div
                              onClick={() =>
                                handleChecklistTemplateTypChange(
                                  item?.name ?? "",
                                )
                              }
                              key={index}
                              className="hover:duration-800 flex w-full justify-between px-4  py-2 text-left text-sm leading-5 text-gray-700 ease-in hover:scale-105 hover:cursor-pointer hover:font-semibold hover:transition-all"
                              role="menuitem"
                            >
                              {item?.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex max-h-[550px] w-full    gap-4 px-8 pt-4">
          <div className="flex   w-[25%]  flex-col gap-3 rounded-2xl ">
            <div className=" h-[250px] max-h-[250px] flex-1 rounded-2xl  bg-white">
              {" "}
              <div>
                {" "}
                <div className=" h- w- sm:px-2  sm:py-2">
                  <main className="container relative mx-auto  h-full ">
                    {/* <div className="absolute inset-0 z-[2000] flex  items-center justify-center border">
                      {" "}
                      <div>
                        {" "}
                        <ThreeDotsWaveMain />
                      </div>
                    </div> */}

                    <article
                      aria-label="File Upload Modal"
                      className="bg-w relative flex h-full flex-col  rounded-md"
                    >
                      <section className="flex   h-full  w-full flex-col">
                        <input
                          id="hidden-input"
                          type="file"
                          multiple
                          className="hidden"
                          ref={hiddenInputRef}
                          onChange={(e) => {
                            setIsUploading(true);
                            const newFiles = e.target.files
                              ? Array.from(e.target.files)
                              : [];
                            if (newFiles.length === 0) {
                              alert("No files selected");
                              return;
                            }

                            setFiles((prevFiles) => {
                              const updatedFiles = [...prevFiles, ...newFiles];
                              handleSubmit(updatedFiles); // Call handleSubmit with updated files
                              return updatedFiles;
                            });

                            if (hiddenInputRef.current) {
                              hiddenInputRef.current.value = "";
                            }
                          }}
                        />
                        <div className="flex justify-center gap-4">
                          {" "}
                          <button
                            id="button"
                            className={`${files.length > 0 ? "pointer-events-none brightness-50" : "pointer-events-auto"} focus:shadow-outline disabled:   mt-2 min-w-[130px]  rounded-md border-2 border-black bg-black px-3 py-2 text-sm text-white transition-all duration-300 ease-linear hover:scale-105 focus:outline-none `}
                            onClick={() => hiddenInputRef.current?.click()}
                            disabled={!files || isUploading}
                          >
                            Select File
                          </button>
                        </div>

                        <ul
                          id="gallery"
                          className="-m-1 flex flex-1 flex-wrap justify-center py-4 pl-2"
                          ref={galleryRef}
                        >
                          {files.length === 0 ? (
                            <li
                              id="empty"
                              className="flex h-full w-full flex-col items-center  justify-center text-center"
                            >
                              <img
                                className="mx-auto w-32"
                                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                alt="no data"
                              />
                              <span className="text-sm text-gray-500">
                                No files selected
                              </span>
                            </li>
                          ) : (
                            files.map((file) => (
                              <li
                                key={file.name}
                                className="block h-32  w-32 p-1"
                              >
                                <article
                                  tabIndex={0}
                                  className="focus:shadow-outline group relative h-full w-full cursor-pointer rounded-md bg-gray-100 shadow-sm focus:outline-none"
                                >
                                  {file.type.match("image.*") ? (
                                    <img
                                      alt="upload preview"
                                      className="img-preview sticky h-full w-full rounded-md bg-fixed object-cover"
                                      src={URL.createObjectURL(file)}
                                    />
                                  ) : (
                                    <div className="img-preview sticky hidden h-full w-full rounded-md bg-fixed object-cover" />
                                  )}
                                  <section className="absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md py-2 text-xs ">
                                    <h1 className="flex-1 px-1 text-black">
                                      {truncateFileName(file.name)}
                                    </h1>
                                    <div className="flex justify-end">
                                      <button
                                        className="delete  rounded-md px-2  text-black hover:bg-gray-300 focus:outline-none"
                                        onClick={() => handleDelete(file)}
                                      >
                                        <svg
                                          className="pointer-events-none ml-auto h-4 w-4 fill-current"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            className="pointer-events-none"
                                            d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </section>
                                </article>
                              </li>
                            ))
                          )}
                        </ul>
                      </section>
                    </article>
                  </main>
                </div>
              </div>
            </div>
            <div className="  h-[260px] rounded-2xl   bg-white   ">
              <p className="mt-4 pb-4 text-center text-sm font-semibold text-black ">
                Compliance Score
              </p>
              <div className="md:px-32">
                <CircularProgressbarWithChildren
                  styles={buildStyles({
                    textColor: "red",
                    pathColor: "green",
                    trailColor: "#ebecf0",
                  })}
                  value={percentage}
                >
                  {" "}
                  <div style={{ fontSize: 18, marginTop: -5, color: "black" }}>
                    <strong> {percentage} %</strong>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
          </div>{" "}
          {files.length !== 0 ? (
            <div className="h-full w-full flex-1 overflow-x-auto rounded-xl bg-white  p-1 text-center">
              {files.length !== 0 && (
                <ul>
                  {filePreviews.map((file) => (
                    <li key={file.name} className="flex h-full">
                      <article
                        tabIndex={0}
                        className="focus:shadow-outline group relative h-full w-full cursor-pointer rounded-md shadow-sm focus:outline-none"
                      >
                        {file.type === "application/pdf" ? (
                          <iframe
                            className="max-h-[520px] min-h-[519px]  w-full rounded-xl bg-red-400 text-center"
                            src={`${file.url}#toolbar=0`}
                            title={file.name}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-white">
                            <p className="font-semibold text-black">
                              Document Preview
                            </p>
                          </div>
                        )}
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className=" l h- bg flex w-full flex-1 items-center justify-center rounded-xl bg-white p-1 text-center text-sm font-semibold text-black">
              <p>Document Preview</p>
            </div>
          )}
          <div
            className={`r flex h-[530px] flex-1 items-center justify-center rounded-xl bg-white  p-2 text-justify text-xs text-black ${
              extractedText
                ? extractedText.length > 200
                  ? "overflow-hidden"
                  : ""
                : ""
            }`}
          >
            <div className="m flex h-full w-full items-center justify-center">
              {!extractedText && fileKey ? (
                isExtractingText ||
                fileKey ||
                isDocumentUploading ||
                isUploading ||
                files.length > 0 ? (
                  <ThreeDotsWaveMain />
                ) : (
                  "Analysis/Recommendations"
                )
              ) : extractedText ? (
                <div
                  className={`p-5 ${extractedText.length > 200 ? "h-full overflow-y-scroll" : ""}`}
                >
                  {extractedText}
                </div>
              ) : (
                <p className="font-semibold">Analysis/Recommendations</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
