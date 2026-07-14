export interface SearchResult {
  id: string
  title: string
  content: string
  section:
    | "calculator"
    | "information"
    | "resources"
    | "treatments"
    | "about"
    | "documentation"
    | "clinical-support"
    | "tools"
  url: string
}

export const searchData: SearchResult[] = [
  // Calculator section
  {
    id: "calculator-1",
    title: "CTCL Risk Calculator",
    content:
      "Assess CTCL risk from clinical features. The calculator helps determine the likelihood of Cutaneous T-Cell Lymphoma based on clinical presentation and generates an assessment and plan note.",
    section: "calculator",
    url: "/calculator",
  },

  // Clinical tools
  {
    id: "tools-1",
    title: "Clinical Tools",
    content:
      "Point-of-care tools for CTCL: biopsy requisition builder, referral routing, TNMB stager, mSWAT/BSA calculator, and lesion tracker.",
    section: "tools",
    url: "/tools",
  },
  {
    id: "tools-2",
    title: "Biopsy Requisition Builder",
    content:
      "Build a pathology requisition for suspected mycosis fungoides / CTCL: rule-out-MF clinical history, immunohistochemistry panel (CD3, CD4, CD8, CD7, CD30, CD20), and TCR gene rearrangement clonality studies, plus biopsy technique pearls.",
    section: "tools",
    url: "/biopsy-requisition",
  },
  {
    id: "tools-3",
    title: "Referral Routing",
    content:
      "Decide which suspected CTCL patients need urgent cutaneous lymphoma clinic referral versus routine referral or observation, and what to send with the patient.",
    section: "tools",
    url: "/specialist-referral",
  },
  {
    id: "tools-4",
    title: "mSWAT / BSA Calculator",
    content:
      "Modified Severity-Weighted Assessment Tool and body surface area calculator to quantify skin burden at baseline and track treatment response over time.",
    section: "tools",
    url: "/mswat",
  },
  {
    id: "tools-5",
    title: "Lesion Tracker",
    content:
      "Map lesions on a body diagram and follow them with serial photographs over time for longitudinal mycosis fungoides monitoring. Data stays on your device.",
    section: "tools",
    url: "/lesion-tracker",
  },
  {
    id: "tools-6",
    title: "Patient Handouts",
    content:
      "Printable, reassuring handouts explaining why a skin biopsy or specialist referral is a precautionary step.",
    section: "tools",
    url: "/patient-handout",
  },
  {
    id: "calculator-2",
    title: "Risk Assessment Questions",
    content:
      "Questions include history of multiple biopsies, failed steroids, other rash, scaly patch or plaque, erythema, xerosis, and pruritus.",
    section: "calculator",
    url: "/calculator",
  },

  // Clinical Support section
  {
    id: "clinical-support-1",
    title: "TNMB Staging Tool",
    content:
      "Interactive ISCL/EORTC TNMB stage calculator with an auto-generated stage, plus a full TNMB reference table for MF/SS.",
    section: "clinical-support",
    url: "/clinical-support",
  },
  {
    id: "clinical-support-2",
    title: "Referral Guide",
    content:
      "When to refer to dermatologic oncology, hematology-oncology, or a cutaneous lymphoma clinic — urgent vs. routine vs. observe, and what to send with the patient.",
    section: "tools",
    url: "/specialist-referral",
  },
  {
    id: "clinical-support-3",
    title: "Biopsy & Stain Selection Guide",
    content:
      "How to biopsy suspected CTCL and which immunohistochemical stains (CD3, CD4, CD8, CD7, CD30, CD20) and TCR clonality studies to request from pathology.",
    section: "tools",
    url: "/biopsy-requisition",
  },

  // Information section
  {
    id: "information-1",
    title: "What is Cutaneous T-Cell Lymphoma?",
    content:
      "Cutaneous T-cell lymphomas (CTCLs) are a group of rare non-Hodgkin lymphomas that primarily affect the skin. They develop when T-lymphocytes become malignant and affect the skin.",
    section: "information",
    url: "/information",
  },
  {
    id: "information-2",
    title: "Clinical Presentation of CTCL",
    content:
      "CTCL typically presents with persistent, scaly patches or plaques on the skin that may resemble eczema or psoriasis. Common symptoms include itching, dry skin, redness, and scaly patches.",
    section: "information",
    url: "/information",
  },
  {
    id: "information-3",
    title: "Mycosis Fungoides",
    content:
      "Mycosis fungoides typically progresses through several stages: patch stage, plaque stage, tumor stage, and erythrodermic stage.",
    section: "information",
    url: "/information",
  },
  {
    id: "information-4",
    title: "Sézary Syndrome",
    content:
      "Sézary syndrome is characterized by the triad of erythroderma (widespread red skin), lymphadenopathy (enlarged lymph nodes), and the presence of malignant T-cells in the blood (Sézary cells).",
    section: "information",
    url: "/information",
  },
  {
    id: "information-5",
    title: "Diagnostic Approach for CTCL",
    content:
      "Diagnosing CTCL often requires a multidisciplinary approach including clinical evaluation, skin biopsy, immunohistochemistry, T-cell receptor gene rearrangement studies, and imaging.",
    section: "information",
    url: "/information",
  },
  {
    id: "information-6",
    title: "Staging and Prognosis of CTCL",
    content:
      "CTCL is staged using the TNMB system (Tumor, Node, Metastasis, Blood). Stages include IA, IB, IIA, IIB, IIIA/B, IVA, and IVB.",
    section: "information",
    url: "/information",
  },

  // Documentation section
  {
    id: "documentation-1",
    title: "Clinical Note Templates",
    content:
      "Downloadable CTCL clinical documentation — an initial evaluation note template — plus the EPIC medical-form automation helper.",
    section: "documentation",
    url: "/documentation",
  },
  {
    id: "documentation-2",
    title: "mSWAT / BSA Assessment",
    content:
      "Quantify skin burden with the modified Severity-Weighted Assessment Tool (mSWAT) and body surface area calculator; track response over time.",
    section: "tools",
    url: "/mswat",
  },
  {
    id: "documentation-3",
    title: "Assessment & Plan Note Generator",
    content:
      "Generate a copy-paste assessment and plan documenting that CTCL was considered, with the recommended biopsy and referral workup, from the risk calculator.",
    section: "tools",
    url: "/calculator",
  },

  // Resources section
  {
    id: "resources-1",
    title: "Clinical Guidelines for CTCL",
    content:
      "Access evidence-based guidelines for the diagnosis and management of CTCL from organizations like NCCN, EORTC/ISCL, and the British Association of Dermatologists.",
    section: "resources",
    url: "/resources",
  },
  {
    id: "resources-2",
    title: "Key Research Papers on CTCL",
    content:
      "Essential literature for general dermatologists on diagnosis, clinical features, management, and treatment of CTCL.",
    section: "resources",
    url: "/resources",
  },
  {
    id: "resources-3",
    title: "Diagnostic Resources for CTCL",
    content:
      "Tools and resources to aid in diagnosis including biopsy techniques, interpretation, clinical assessment tools, and laboratory testing.",
    section: "resources",
    url: "/resources",
  },
  {
    id: "resources-4",
    title: "CTCL Specialist Centers",
    content: "Directory of specialized centers for CTCL treatment across the United States and Europe.",
    section: "resources",
    url: "/resources",
  },
  {
    id: "resources-5",
    title: "Patient Support Organizations",
    content:
      "Organizations providing support for CTCL patients including the Cutaneous Lymphoma Foundation, Leukemia & Lymphoma Society, and Lymphoma Research Foundation.",
    section: "resources",
    url: "/resources",
  },
  {
    id: "resources-6",
    title: "EORTC Consensus Recommendations",
    content:
      "European Organisation for Research and Treatment of Cancer (EORTC) consensus recommendations for the treatment of mycosis fungoides and Sézary syndrome.",
    section: "resources",
    url: "/resources",
  },
  {
    id: "resources-7",
    title: "NCCN Guidelines for Patients: CTCL",
    content:
      "Patient-friendly guidelines from the National Comprehensive Cancer Network for understanding and managing cutaneous T-cell lymphomas.",
    section: "resources",
    url: "/resources",
  },

  // Treatments section
  {
    id: "treatments-1",
    title: "CTCL Treatment Overview",
    content:
      "Overview of treatment approaches for CTCL including treatment philosophy, goals, selection factors, and categories.",
    section: "treatments",
    url: "/treatments",
  },
  {
    id: "treatments-2",
    title: "Topical Treatments for CTCL",
    content:
      "Medications applied directly to the skin including corticosteroids, nitrogen mustard, retinoids, imiquimod, tacrolimus, and pimecrolimus.",
    section: "treatments",
    url: "/treatments",
  },
  {
    id: "treatments-3",
    title: "Light Therapy for CTCL",
    content:
      "Treatment using ultraviolet light including narrowband UVB, PUVA, extracorporeal photopheresis, and excimer laser.",
    section: "treatments",
    url: "/treatments",
  },
  {
    id: "treatments-4",
    title: "Systemic Treatments for CTCL",
    content:
      "Medications that work throughout the body including retinoids, HDAC inhibitors, immunomodulators, antibody-drug conjugates, chemotherapy, and stem cell transplantation.",
    section: "treatments",
    url: "/treatments",
  },
  {
    id: "treatments-5",
    title: "Radiation Therapy for CTCL",
    content:
      "Using radiation to target cancer cells including localized radiation therapy, total skin electron beam therapy, and palliative radiation.",
    section: "treatments",
    url: "/treatments",
  },
  {
    id: "treatments-6",
    title: "Emerging Treatments for CTCL",
    content:
      "New approaches being investigated including checkpoint inhibitors, CAR-T cell therapy, JAK inhibitors, PI3K inhibitors, and toll-like receptor agonists.",
    section: "treatments",
    url: "/treatments",
  },

  // About section
  {
    id: "about-1",
    title: "About the CTCL Risk Assessment Tool",
    content:
      "The CTCL Risk Assessment Tool was developed to help dermatologists identify patients who may be at higher risk for Cutaneous T-Cell Lymphoma.",
    section: "about",
    url: "/about",
  },
  {
    id: "about-2",
    title: "Data and Methodology",
    content:
      "The risk assessment is calculated based on seven clinical features associated with CTCL: multiple biopsies, failed steroids, other rash, scaly patch/plaque, erythema, xerosis, and pruritus.",
    section: "about",
    url: "/about",
  },
  {
    id: "about-3",
    title: "Limitations of the Tool",
    content:
      "The tool is designed for healthcare professionals, does not incorporate histopathological data, and clinical judgment should always take precedence over the risk assessment.",
    section: "about",
    url: "/about",
  },
]
