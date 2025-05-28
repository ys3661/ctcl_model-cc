export const stagingData = {
  title: "ISCL/EORTC TNMB Classification for MF/SS",
  source: "Cutaneous Lymphoma Foundation - Medical Advisory Council (August, 2019)",
  sourceUrl: "https://www.clfoundation.org/staging-cutaneous-t-cell-lymphoma",
  description:
    "The staging of the most common type of CTCL, mycosis fungoides/Sézary syndrome (MF/SS) is classified into stages IA through IVB using the T (tumor, which for CTCL is patches or plaques), N (lymph node), M (presence of metastasis), B (presence of blood involvement) (TNMB) system.",

  categories: {
    t: {
      title: "T (Skin)",
      description:
        "The level of disease is evaluated based on the size of the plaques or patches of affected skin (T1-T4)",
      items: [
        {
          id: "T1",
          title: "T1: Limited patches/plaques",
          description: "Limited patches, papules, and/or plaques covering <10% of the skin surface",
          details: "T1a: Patch only\nT1b: Plaque ± patch",
        },
        {
          id: "T2",
          title: "T2: Generalized patches/plaques",
          description: "Patches, papules, and/or plaques covering ≥10% of the skin surface",
          details: "T2a: Patch only\nT2b: Plaque ± patch",
        },
        {
          id: "T3",
          title: "T3: Tumors",
          description: "One or more tumors (≥1 cm in diameter)",
        },
        {
          id: "T4",
          title: "T4: Erythroderma",
          description: "Confluence of erythema covering ≥80% of body surface area",
        },
      ],
    },
    n: {
      title: "N (Lymph Nodes)",
      description: "The presence or number of cancer cells in lymph nodes (N0-N3)",
      items: [
        {
          id: "N0",
          title: "N0: No abnormal lymph nodes",
          description: "No clinically abnormal peripheral lymph nodes; biopsy not required",
        },
        {
          id: "N1",
          title: "N1: Clinically abnormal, histologically negative",
          description: "Clinically abnormal peripheral lymph nodes; histopathologically negative for CTCL",
          details: "N1a: Clone negative\nN1b: Clone positive",
        },
        {
          id: "N2",
          title: "N2: Clinically normal, histologically positive",
          description: "Clinically normal lymph nodes; histopathologically positive for CTCL",
          details: "N2a: Clone negative\nN2b: Clone positive",
        },
        {
          id: "N3",
          title: "N3: Clinically abnormal, histologically positive",
          description: "Clinically abnormal lymph nodes; histopathologically positive for CTCL",
          details: "N3a: Clone negative\nN3b: Clone positive",
        },
      ],
    },
    m: {
      title: "M (Visceral Organs)",
      description: "The presence of metastasis (M0-M1)",
      items: [
        {
          id: "M0",
          title: "M0: No visceral organ involvement",
          description: "No visceral organ involvement",
        },
        {
          id: "M1",
          title: "M1: Visceral organ involvement",
          description:
            "Visceral involvement (must have pathological confirmation and organ involved should be specified)",
        },
      ],
    },
    b: {
      title: "B (Blood)",
      description: "The presence of blood involvement (B0-B2)",
      items: [
        {
          id: "B0",
          title: "B0: Absent/minimal blood involvement",
          description: "Absence of significant blood involvement: ≤5% of peripheral blood lymphocytes are Sézary cells",
          details: "B0a: Clone negative\nB0b: Clone positive",
        },
        {
          id: "B1",
          title: "B1: Low blood involvement",
          description:
            "Low blood tumor burden: >5% of peripheral blood lymphocytes are Sézary cells but does not meet the criteria of B2",
          details: "B1a: Clone negative\nB1b: Clone positive",
        },
        {
          id: "B2",
          title: "B2: High blood involvement",
          description:
            "High blood tumor burden: ≥1000/μL Sézary cells with positive clone or one of the following: (1) expanded CD4+ or CD3+ cells with CD4/CD8 ratio ≥10, (2) expanded CD4+ cells with abnormal immunophenotype",
        },
      ],
    },
  },

  stages: [
    {
      stage: "IA",
      t: "T1",
      n: "N0",
      m: "M0",
      b: "B0, B1",
      description: "Limited patches/plaques (<10% BSA)",
      prognosis: "Excellent prognosis with 5-year survival >90%. Many patients have normal life expectancy.",
      recommendations: [
        "Skin-directed therapies (topical corticosteroids, topical retinoids, phototherapy)",
        "Regular follow-up every 3-6 months",
        "Patient education on skin care and symptom management",
        "Consider clinical trial participation",
      ],
    },
    {
      stage: "IB",
      t: "T2",
      n: "N0",
      m: "M0",
      b: "B0, B1",
      description: "Generalized patches/plaques (≥10% BSA)",
      prognosis:
        "Very good prognosis with 5-year survival >80%. Disease may wax and wane but is generally controllable with appropriate therapy.",
      recommendations: [
        "Skin-directed therapies (phototherapy, topical nitrogen mustard, topical retinoids)",
        "Consider combination of skin-directed therapies",
        "Regular follow-up every 3-4 months",
        "Consider referral to CTCL specialist center",
        "Consider clinical trial participation",
      ],
    },
    {
      stage: "IIA",
      t: "T1-2",
      n: "N1",
      m: "M0",
      b: "B0, B1",
      description: "Skin involvement + clinically abnormal lymph nodes without histologic involvement",
      prognosis: "Good prognosis with 5-year survival >70%. Higher risk of progression than stages IA/IB.",
      recommendations: [
        "Skin-directed therapies as in stage IA/IB",
        "Consider systemic therapies if skin-directed therapies fail",
        "Regular follow-up every 3 months",
        "Lymph node monitoring",
        "Referral to CTCL specialist center recommended",
      ],
    },
    {
      stage: "IIB",
      t: "T3",
      n: "N0-1",
      m: "M0",
      b: "B0, B1",
      description: "One or more skin tumors",
      prognosis:
        "Moderate prognosis with 5-year survival of 40-65%. Increased risk of disease progression and need for systemic therapy.",
      recommendations: [
        "Referral to multidisciplinary cutaneous lymphoma clinic strongly recommended",
        "Consider radiation therapy for localized tumors",
        "Systemic therapies often required (retinoids, interferon, HDAC inhibitors)",
        "Regular follow-up every 2-3 months",
        "Consider clinical trial participation",
      ],
    },
    {
      stage: "IIIA",
      t: "T4",
      n: "N0-1",
      m: "M0",
      b: "B0, B1",
      description: "Erythroderma without significant blood involvement",
      prognosis: "Moderate prognosis with 5-year survival of 40-60%. Requires more aggressive management.",
      recommendations: [
        "Referral to multidisciplinary cutaneous lymphoma clinic strongly recommended",
        "Consider photopheresis, particularly for erythrodermic disease",
        "Systemic therapies (retinoids, interferon, HDAC inhibitors)",
        "Regular follow-up every 1-2 months",
        "Monitor for blood involvement with flow cytometry",
        "Consider clinical trial participation",
      ],
    },
    {
      stage: "IIIB",
      t: "T4",
      n: "N0-1",
      m: "M0",
      b: "B2",
      description: "Erythroderma with significant blood involvement (B2)",
      prognosis:
        "Guarded prognosis with 5-year survival of 30-50%. Significant blood involvement indicates more aggressive disease.",
      recommendations: [
        "Urgent referral to multidisciplinary cutaneous lymphoma clinic",
        "Extracorporeal photopheresis often first-line therapy",
        "Systemic therapies (mogamulizumab, HDAC inhibitors, alemtuzumab)",
        "Regular follow-up every 1-2 months",
        "Consider clinical trial participation",
        "Monitor for disease progression and infection risk",
      ],
    },
    {
      stage: "IVA1",
      t: "T1-4",
      n: "N2-3",
      m: "M0",
      b: "B0-2",
      description: "Lymph node involvement (N2-N3)",
      prognosis: "Poor prognosis with 5-year survival of 20-40%. Requires aggressive systemic therapy.",
      recommendations: [
        "Urgent referral to multidisciplinary cutaneous lymphoma clinic",
        "Systemic therapies (mogamulizumab, brentuximab vedotin for CD30+ disease)",
        "Consider combination therapies",
        "Regular follow-up every 1-2 months",
        "Consider clinical trial participation",
        "Consider stem cell transplantation for eligible patients",
      ],
    },
    {
      stage: "IVA2",
      t: "T1-4",
      n: "N0-3",
      m: "M0",
      b: "B3",
      description: "Significant blood involvement (B3)",
      prognosis: "Poor prognosis with 5-year survival of 20-40%. Requires aggressive systemic therapy.",
      recommendations: [
        "Urgent referral to multidisciplinary cutaneous lymphoma clinic",
        "Systemic therapies (mogamulizumab, brentuximab vedotin for CD30+ disease)",
        "Consider combination therapies",
        "Regular follow-up every 1-2 months",
        "Consider clinical trial participation",
        "Consider stem cell transplantation for eligible patients",
      ],
    },
    {
      stage: "IVB",
      t: "T1-4",
      n: "N0-3",
      m: "M1",
      b: "B0-3",
      description: "Visceral organ involvement",
      prognosis:
        "Poor prognosis with 5-year survival <20%. Visceral involvement indicates advanced disease requiring aggressive management.",
      recommendations: [
        "Urgent referral to multidisciplinary cutaneous lymphoma clinic",
        "Systemic chemotherapy often required",
        "Consider targeted therapies based on disease characteristics",
        "Regular follow-up every 1-2 months",
        "Consider clinical trial participation",
        "Consider stem cell transplantation for eligible patients",
        "Palliative care consultation for symptom management",
      ],
    },
  ],
}
