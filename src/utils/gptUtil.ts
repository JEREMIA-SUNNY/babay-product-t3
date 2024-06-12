const checklistQuestions: Record<string, string[]> = {
  "Quality Standards Compliance": [
    "1. Is the contract in compliance with relevant local and international quality standards (e.g., ASTM, ISO, EN)?",
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
  "Data Privacy Compliance": [
    "1. Does the contract clearly define the scope of work to be completed?",
    "2. Does the contract clearly mention about what is out of scope explicitly?",
    "3. Does the contract specify the start and end dates for the scope of work to be completed?",
    "4. For T&M contracts, is there a Cap defined in the contract, either in value or effort?",
    "5. Does the contract state clearly upon completion of which milestones, the Vendor can invoice Cybex and alsoupto how much amount?",
    "6. Does the contract specify who would bear the travel costs?",
    "7. Does the contract state that only Cybex tools would be used for project management and documentation?(Asana, Sharepoint, DrupalWiki, etc)",
    "8. Does the contract mention about the roles & responsibilities for Cybex and Vendor project member roles?",
    "9. Does the contract specify that if people change at the Vendor, onboarding and handover costs are with theVendor?",
    "10. Does the contract specify that for any people change/unavailability at the Vendor, the Vendor is responsible toensure on time delivery?",
    "Does the contract state a clear definition of change request process ?",
    "Does the contract specify the agreed rates and conditions for change requests?",
    "Does the contract specify a condition that all documentation and communication would be in English?",
    "Does the contract state any condition that the rates and the contract conditions are fixed and would remain unchanged during the contract period?",
    "Does the contract state the regulations for renewal of contract after the contract period ends ? (For eg: %increase in rates, etc)",
    "Does the contract mention about SLAs for support which need to be aligned with Business Requirements?",
    "Does the contract mention about emergency support outside office hours?",
    "Does the contract list down the assumptions based on which this contract is being set up?",
    "Does the contract specify that the impact of changes to dependant 3rd party applications?",
  ],
  "Service Level Compliance": [
    "1. Does the contract clearly define the scope of work to be completed?",
    "2. Does the contract clearly mention about what is out of scope explicitly?",
    "3. Does the contract specify the start and end dates for the scope of work to be completed?",
    "4. For T&M contracts, is there a Cap defined in the contract, either in value or effort?",
    "5. Does the contract state clearly upon completion of which milestones, the Vendor can invoice Cybex and alsoupto how much amount?",
    "6. Does the contract specify who would bear the travel costs?",
    "7. Does the contract state that only Cybex tools would be used for project management and documentation?(Asana, Sharepoint, DrupalWiki, etc)",
    "8. Does the contract mention about the roles & responsibilities for Cybex and Vendor project member roles?",
    "9. Does the contract specify that if people change at the Vendor, onboarding and handover costs are with theVendor?",
    "10. Does the contract specify that for any people change/unavailability at the Vendor, the Vendor is responsible toensure on time delivery?",
    "Does the contract state a clear definition of change request process ?",
    "Does the contract specify the agreed rates and conditions for change requests?",
    "Does the contract specify a condition that all documentation and communication would be in English?",
    "Does the contract state any condition that the rates and the contract conditions are fixed and would remain unchanged during the contract period?",
    "Does the contract state the regulations for renewal of contract after the contract period ends ? (For eg: %increase in rates, etc)",
    "Does the contract mention about SLAs for support which need to be aligned with Business Requirements?",
    "Does the contract mention about emergency support outside office hours?",
    "Does the contract list down the assumptions based on which this contract is being set up?",
    "Does the contract specify that the impact of changes to dependant 3rd party applications?",
  ],
};

export const generateQuestionsArray = (checklistName: string): string[] => {
  console.log(checklistName);
  const questions = checklistQuestions[checklistName];
  console.log(questions);
  if (questions) {
    return questions;
  } else {
    throw new Error("Checklist name not found");
  }
};
