const checklistQuestions: Record<string, string[]> = {
  "Quality Standards Compliance": [
    "1. Does the contract require compliance with relevant local and international quality standards (e.g., ASTM, ISO, EN)?",
    "2. Are detailed technical specifications and quality requirements for the products clearly outlined in the contract?",
    "3. Does the contract specify the required quality and type of materials to be used?",
    "4. Are the manufacturing processes described in the contract to ensure consistency and quality?",
    "5. Does the contract include procedures for testing and inspecting products to ensure they meet the specified quality standards?",
    "6. Are certification requirements (e.g., ISO 9001, CE marking) clearly stated in the contract?",
    "7. Does the contract include a detailed quality control plan?",
    "8. Does the contract grant the buyer the right to inspect the supplier’s facilities and processes?",
    "9. Is there a requirement for the supplier to provide samples for testing and approval before mass production?",
    "10. Does the contract outline procedures for handling non-conforming products, including rework, rejection, and disposal?",
  ],
  "Material Safety Compliance": [
    "1. Does the contract include adherence to safety standards specific to baby products (e.g., crash tests for car seats, stability tests for trolleys)?",
    "2. Does the contract require compliance with relevant regulatory bodies (e.g., CPSC in the USA, EU standards)?",
    "3. Are there clear procedures for handling product recalls if safety issues are identified?",
    "4. Does the contract specify the types of materials that are prohibited or restricted due to safety concerns?",
    "5. Are there requirements for proper labeling and user instructions to ensure the safe use of the products?",
    "6. Does the contract mandate the use of materials that meet specific safety certifications or approvals?",
    "7. Are there provisions in the contract for regular safety audits and inspections?",
    "8. Does the contract require documentation and retention of safety test results and material safety data sheets (MSDS)?",
  ],
  "Conflict Minerals Compliance": [
    "1. Does the contract require compliance with regulations regarding the use of conflict minerals (e.g., Dodd-Frank Act, EU Conflict Minerals Regulation)?",
    "2. Does the contract require the supplier to conduct due diligence on the source and chain of custody of conflict minerals used in the products?",
    "3. Are there provisions in the contract for the supplier to provide periodic reports on conflict minerals sourcing and compliance?",
    "4. Does the contract mandate that the supplier obtain declarations from sub-suppliers regarding the origin of conflict minerals?",
    "5. Are there requirements for the supplier to participate in recognized conflict-free sourcing programs or certifications?",
    "6. Does the contract include clauses for the supplier to disclose any changes in the sourcing of conflict minerals that could affect compliance?",
    "7. Are there penalties or remediation actions specified in the contract if the supplier fails to comply with conflict minerals regulations?",
    "8. Does the contract ensure the traceability of conflict minerals throughout the supply chain?",
  ],
};

export const generateQuestionsArray = (checklistName: string): string[] => {
  const questions = checklistQuestions[checklistName];
  if (questions) {
    return questions;
  } else {
    throw new Error("Checklist name not found");
  }
};

// Example usage:
const checklistName = "Quality Standards Compliance";
const questionsArray = generateQuestionsArray(checklistName);
console.log(questionsArray);
