"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, Printer, FileDown, FileText, Edit, Eye } from "lucide-react"

export default function InitialEvaluationTemplate() {
  // State for customizable fields
  const [customFields, setCustomFields] = useState({
    clinicName: "Division of Cutaneous Oncology",
    patientName: "@NAME@",
    patientAge: "@AGE@",
    patientSex: "@SEX@",
    ctclType: "***(CTCL type suspected)",
    referredBy: "***",
    narrativeHPI: "***",
    allergies: "@ALLERGIES@",
    pastMedical: "@PASTMEDICAL@",
    pastSurgical: "@PASTSURGICAL@",
    familyHistory: "@FAMILYHISTORY@",
    socialHistory: "@SOCIALHISTORY@",
    ros: "@ROS@",
    vitals: "@VITALSALL@",
    lymphNodes: "***",
    tbsa: "***",
    mswat: "***",
    stage: "***",
    ctclExplanation: "@CTCLEXPLANATION@",
    treatmentPlan: "@TREATMENTPLAN@",
    followUp: "@FOLLOWUP@",
  })

  // Function to handle input changes
  const handleInputChange = (field: string, value: string) => {
    setCustomFields((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Function to generate customized text content
  const generateCustomizedText = () => {
    return `${customFields.clinicName}
Initial Visit  
 
History of Present Illness: ${customFields.patientName} is a ${customFields.patientAge} ${customFields.patientSex} who presents for initial 
consultation for suspected ${customFields.ctclType}, referred by ${customFields.referredBy}.  
 
Narrative HPI: ${customFields.narrativeHPI} 
 
Registry: 
Date of initial visit with CTCL specialist  
Date of onset of skin lesions  
(month/year) 
 
Initial symptoms at presentation  
(itching 1-10, flaking/scaling, color change) 
 
Initial lesion type  
(patch, plaque, tumor, erythroderma) 
 
Initial quantity of lesions  
(single, multiple, unknown) 
 
Initial location of lesions 
(where anatomically located) 
 
Prior diagnosis for CTCL lesions  
(psoriasis, eczema, etc.) 
 
Prior treatments for CTCL lesions 
(name, date started/stopped, reason for 
stopping, dose, response) 
 
Prior skin biopsies  
(dates / result) 
 
Disease course since lesion onset 
(clearance, progression, relapse) 
 
Medication changes prior to lesion onset  
(If yes, specify) 
 
Exposures from travel, recreation, occupation, 
or environment prior to lesions 
(industrial, pesticides, pollution, etc.) 
 
Current symptoms 
(itching 1-10, flaking/scaling, color change) 
 
Current treatments 
(date started, dose, response) 
 
Current location of lesions 
(where anatomically located) 
 
 
Patient History 
${customFields.allergies}  
${customFields.pastMedical} 
${customFields.pastSurgical}  
${customFields.familyHistory}  
${customFields.socialHistory} 
 
${customFields.ros} 

As noted in the HPI. 
 
Physical Exam  
${customFields.vitals}  
General: the patient is overall well appearing 
Neuro: the patient is alert and oriented 
Mood: appropriate 
 
TBSE including mucosal surfaces was performed. Notable findings:  
 
Scalp/Hair: No lesions suspicious for malignancy. 
Head/Face: No lesions suspicious for malignancy. 
Conjunctiva/Lids: No lesions suspicious for malignancy. 
Lips: No lesions suspicious for malignancy. 
Oral mucosa: No lesions suspicious for malignancy. 
Teeth: No lesions suspicious for malignancy. 
Neck: No lesions suspicious for malignancy. 
Chest: No lesions suspicious for malignancy. 
Breasts/Axillae: No lesions suspicious for malignancy. 
Abdomen: No lesions suspicious for malignancy. 
Genitalia: No lesions suspicious for malignancy. 
Back: No lesions suspicious for malignancy. 
Buttocks: No lesions suspicious for malignancy. 
RUE: No lesions suspicious for malignancy. 
LUE: No lesions suspicious for malignancy. 
RLE: No lesions suspicious for malignancy. 
LLE: No lesions suspicious for malignancy. 
Digits/Nails: No lesions suspicious for malignancy. 
 
General Exam 
Lymph: no palpable lymph nodes${customFields.lymphNodes} 
Peripheral vascular: warm and well perfused 
Edema/Varicosities: no peripheral edema  
Eccrine, apocrine glands: unremarkable 
 
TBSA  ${customFields.tbsa},  mSWAT ${customFields.mswat} 
Body Region  % BSA for 
this 
Region 
% BSA as Patch % BSA as 
Plaque 
% BSA as 
Tumor 
Head 7%    
Neck 2%    
Anterior trunk 13%    
Arms 8%    
Forearms 6%    
Hands 5%    
Posterior trunk 13%    
Buttocks 5%    
Thighs 19%    
Legs 14%    
Feet 7%    
Groin 1%    
% BSA by 
category 
100%    
Severity 
Weighting 
Factor 
 x1 x2 x4 
Skin Score 
Total 
    
mSWAT   
 
PATHOLOGY, IMAGING AND LABORATORY DATA: 
All internal, external data were directly reviewed and summarized below. 
 
LABORATORY: 
 
FLOW CYTOMETRY:  
 
PATHOLOGY:  
 
IMAGING:  
 
ASSESSMENT: 
 
PLAN: 
${customFields.patientName} is a ${customFields.patientAge} ${customFields.patientSex} with stage ${customFields.stage}. Today patient with ${customFields.tbsa} TBSA involvement, 
mSWAT ${customFields.mswat} with ${customFields.mswat} 
${customFields.ctclExplanation} 
${customFields.treatmentPlan} 
 
Prognostic index (Choose Early versus Late) 
 
Early CLIPI Prognostic Index  
  Points (1 each) 
Male  
Age > 60  
Plaques  
Folliculotropic  
N1/Nx  
Total Points ***/5 
Risk Group: *** 
Group 1 (1 risk factor); Group 2 (2 risk factors); Group 3 (3+ risk factors) 
Reference: Benton EC, Crichton S, Talpur R, et al. A cutaneous lymphoma international 
prognostic index (CLIPi) for mycosis fungoides and Sezary syndrome. Eur J Cancer. 
2013;49(13):2859-2868. doi:10.1016/j.ejca.2013.04.018 
 
 
Late CLIPI Prognostic Index  
  Points (1 each) 
Male  
Age > 60  
B1/B2  
N2/3  
Visceral involvement  
Total Points ***/5 
Risk Group: *** 
Group 1 (1 risk factor); Group 2 (2 risk factors); Group 3 (3+ risk factors) 
Reference: Benton EC, Crichton S, Talpur R, et al. A cutaneous lymphoma international 
prognostic index (CLIPi) for mycosis fungoides and Sezary syndrome. Eur J Cancer. 
2013;49(13):2859-2868. doi:10.1016/j.ejca.2013.04.018 
 
 
 
${customFields.followUp}`
  }

  // Function to handle download of customized text
  const downloadCustomizedText = () => {
    const content = generateCustomizedText()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "CTCL_Initial_Evaluation_Template_Customized.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between">
          <Link href="/documentation">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Documentation
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print Template
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/documents/initial-ctcl-evaluation-template.txt" download="CTCL_Initial_Evaluation_Template.txt">
                <FileText className="mr-2 h-4 w-4" /> Download Original
              </a>
            </Button>
            <Button variant="default" size="sm" onClick={downloadCustomizedText}>
              <FileDown className="mr-2 h-4 w-4" /> Download Customized
            </Button>
          </div>
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="mr-2 h-4 w-4" /> Preview Template
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex items-center">
              <Edit className="mr-2 h-4 w-4" /> Customize Template
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card className="p-6 mb-8 print:shadow-none print:border-none">
              <div className="space-y-6">
                <div className="text-center border-b pb-4">
                  <h1 className="text-2xl font-bold">{customFields.clinicName}</h1>
                  <h2 className="text-xl font-semibold mt-2">Initial Visit</h2>
                </div>

                <div className="space-y-4">
                  <p className="font-medium">
                    History of Present Illness: <span className="bg-gray-100 px-1">{customFields.patientName}</span> is
                    a <span className="bg-gray-100 px-1">{customFields.patientAge}</span>{" "}
                    <span className="bg-gray-100 px-1">{customFields.patientSex}</span> who presents for initial
                    consultation for suspected <span className="bg-gray-100 px-1">{customFields.ctclType}</span>,
                    referred by <span className="bg-gray-100 px-1">{customFields.referredBy}</span>.
                  </p>

                  <p className="font-medium">
                    Narrative HPI: <span className="bg-gray-100 px-1">{customFields.narrativeHPI}</span>
                  </p>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">Registry:</h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        {[
                          "Date of initial visit with CTCL specialist",
                          "Date of onset of skin lesions (month/year)",
                          "Initial symptoms at presentation (itching 1-10, flaking/scaling, color change)",
                          "Initial lesion type (patch, plaque, tumor, erythroderma)",
                          "Initial quantity of lesions (single, multiple, unknown)",
                          "Initial location of lesions (where anatomically located)",
                          "Prior diagnosis for CTCL lesions (psoriasis, eczema, etc.)",
                          "Prior treatments for CTCL lesions (name, date started/stopped, reason for stopping, dose, response)",
                          "Prior skin biopsies (dates / result)",
                          "Disease course since lesion onset (clearance, progression, relapse)",
                          "Medication changes prior to lesion onset (If yes, specify)",
                          "Exposures from travel, recreation, occupation, or environment prior to lesions (industrial, pesticides, pollution, etc.)",
                          "Current symptoms (itching 1-10, flaking/scaling, color change)",
                          "Current treatments (date started, dose, response)",
                          "Current location of lesions (where anatomically located)",
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="py-2 pr-4 align-top">{item}</td>
                            <td className="py-2 pl-4 w-1/2 bg-gray-50"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">Patient History</h3>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.allergies}</span>
                    </p>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.pastMedical}</span>
                    </p>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.pastSurgical}</span>
                    </p>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.familyHistory}</span>
                    </p>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.socialHistory}</span>
                    </p>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.ros}</span>
                    </p>
                    <p>As noted in the HPI.</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">Physical Exam</h3>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.vitals}</span>
                    </p>
                    <p className="mb-1">General: the patient is overall well appearing</p>
                    <p className="mb-1">Neuro: the patient is alert and oriented</p>
                    <p className="mb-3">Mood: appropriate</p>

                    <p className="font-medium mb-3">TBSE including mucosal surfaces was performed. Notable findings:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Scalp/Hair: No lesions suspicious for malignancy.",
                        "Head/Face: No lesions suspicious for malignancy.",
                        "Conjunctiva/Lids: No lesions suspicious for malignancy.",
                        "Lips: No lesions suspicious for malignancy.",
                        "Oral mucosa: No lesions suspicious for malignancy.",
                        "Teeth: No lesions suspicious for malignancy.",
                        "Neck: No lesions suspicious for malignancy.",
                        "Chest: No lesions suspicious for malignancy.",
                        "Breasts/Axillae: No lesions suspicious for malignancy.",
                        "Abdomen: No lesions suspicious for malignancy.",
                        "Genitalia: No lesions suspicious for malignancy.",
                        "Back: No lesions suspicious for malignancy.",
                        "Buttocks: No lesions suspicious for malignancy.",
                        "RUE: No lesions suspicious for malignancy.",
                        "LUE: No lesions suspicious for malignancy.",
                        "RLE: No lesions suspicious for malignancy.",
                        "LLE: No lesions suspicious for malignancy.",
                        "Digits/Nails: No lesions suspicious for malignancy.",
                      ].map((item, index) => (
                        <p key={index} className="mb-1">
                          {item}
                        </p>
                      ))}
                    </div>

                    <h4 className="font-medium mt-4 mb-2">General Exam</h4>
                    <p className="mb-1">
                      Lymph: no palpable lymph nodes<span className="bg-gray-100 px-1">{customFields.lymphNodes}</span>
                    </p>
                    <p className="mb-1">Peripheral vascular: warm and well perfused</p>
                    <p className="mb-1">Edema/Varicosities: no peripheral edema</p>
                    <p className="mb-1">Eccrine, apocrine glands: unremarkable</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">
                      TBSA <span className="bg-gray-100 px-1">{customFields.tbsa}</span>, mSWAT{" "}
                      <span className="bg-gray-100 px-1">{customFields.mswat}</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Body Region</th>
                            <th className="border border-gray-300 p-2">% BSA for this Region</th>
                            <th className="border border-gray-300 p-2">% BSA as Patch</th>
                            <th className="border border-gray-300 p-2">% BSA as Plaque</th>
                            <th className="border border-gray-300 p-2">% BSA as Tumor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { region: "Head", bsa: "7%" },
                            { region: "Neck", bsa: "2%" },
                            { region: "Anterior trunk", bsa: "13%" },
                            { region: "Arms", bsa: "8%" },
                            { region: "Forearms", bsa: "6%" },
                            { region: "Hands", bsa: "5%" },
                            { region: "Posterior trunk", bsa: "13%" },
                            { region: "Buttocks", bsa: "5%" },
                            { region: "Thighs", bsa: "19%" },
                            { region: "Legs", bsa: "14%" },
                            { region: "Feet", bsa: "7%" },
                            { region: "Groin", bsa: "1%" },
                          ].map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="border border-gray-300 p-2">{item.region}</td>
                              <td className="border border-gray-300 p-2 text-center">{item.bsa}</td>
                              <td className="border border-gray-300 p-2"></td>
                              <td className="border border-gray-300 p-2"></td>
                              <td className="border border-gray-300 p-2"></td>
                            </tr>
                          ))}
                          <tr className="bg-gray-100 font-medium">
                            <td className="border border-gray-300 p-2">% BSA by category</td>
                            <td className="border border-gray-300 p-2 text-center">100%</td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                          </tr>
                          <tr className="bg-gray-100 font-medium">
                            <td className="border border-gray-300 p-2">Severity Weighting Factor</td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2 text-center">x1</td>
                            <td className="border border-gray-300 p-2 text-center">x2</td>
                            <td className="border border-gray-300 p-2 text-center">x4</td>
                          </tr>
                          <tr className="bg-gray-100 font-medium">
                            <td className="border border-gray-300 p-2">Skin Score Total</td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2"></td>
                          </tr>
                          <tr className="bg-gray-100 font-medium">
                            <td className="border border-gray-300 p-2" colSpan={2}>
                              mSWAT
                            </td>
                            <td className="border border-gray-300 p-2" colSpan={3}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">PATHOLOGY, IMAGING AND LABORATORY DATA:</h3>
                    <p className="mb-3">All internal, external data were directly reviewed and summarized below.</p>

                    <h4 className="font-medium mt-4 mb-2">LABORATORY:</h4>
                    <div className="bg-gray-50 p-2 mb-3 min-h-[40px]"></div>

                    <h4 className="font-medium mt-4 mb-2">FLOW CYTOMETRY:</h4>
                    <div className="bg-gray-50 p-2 mb-3 min-h-[40px]"></div>

                    <h4 className="font-medium mt-4 mb-2">PATHOLOGY:</h4>
                    <div className="bg-gray-50 p-2 mb-3 min-h-[40px]"></div>

                    <h4 className="font-medium mt-4 mb-2">IMAGING:</h4>
                    <div className="bg-gray-50 p-2 mb-3 min-h-[40px]"></div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">ASSESSMENT:</h3>
                    <div className="bg-gray-50 p-2 mb-3 min-h-[60px]"></div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">PLAN:</h3>
                    <p className="mb-3">
                      <span className="bg-gray-100 px-1">{customFields.patientName}</span> is a{" "}
                      <span className="bg-gray-100 px-1">{customFields.patientAge}</span>{" "}
                      <span className="bg-gray-100 px-1">{customFields.patientSex}</span> with stage{" "}
                      <span className="bg-gray-100 px-1">{customFields.stage}</span>. Today patient with{" "}
                      <span className="bg-gray-100 px-1">{customFields.tbsa}</span> TBSA involvement, mSWAT{" "}
                      <span className="bg-gray-100 px-1">{customFields.mswat}</span> with{" "}
                      <span className="bg-gray-100 px-1">{customFields.mswat}</span>
                    </p>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.ctclExplanation}</span>
                    </p>
                    <p className="mb-2">
                      <span className="bg-gray-100 px-1">{customFields.treatmentPlan}</span>
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">Prognostic index (Choose Early versus Late)</h3>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Early CLIPI Prognostic Index</h4>
                      <table className="w-full border-collapse border border-gray-300">
                        <tbody>
                          {[
                            { factor: "Male", points: "Points (1 each)" },
                            { factor: "Age > 60", points: "" },
                            { factor: "Plaques", points: "" },
                            { factor: "Folliculotropic", points: "" },
                            { factor: "N1/Nx", points: "" },
                          ].map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="border border-gray-300 p-2">{item.factor}</td>
                              <td className="border border-gray-300 p-2">{item.points}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-100 font-medium">
                            <td className="border border-gray-300 p-2">Total Points</td>
                            <td className="border border-gray-300 p-2">
                              <span className="bg-gray-200 px-1">***/5</span>
                            </td>
                          </tr>
                          <tr className="bg-gray-100 font-medium">
                            <td className="border border-gray-300 p-2">Risk Group:</td>
                            <td className="border border-gray-300 p-2">
                              <span className="bg-gray-200 px-1">***</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-sm mt-2">
                        Group 1 (1 risk factor); Group 2 (2 risk factors); Group 3 (3+ risk factors)
                      </p>
                      <p className="text-sm mt-1">
                        Reference: Benton EC, Crichton S, Talpur R, et al. A cutaneous lymphoma international prognostic
                        index (CLIPi) for mycosis fungoides and Sezary syndrome. Eur J Cancer. 2013;49(13):2859-2868.
                        doi:10.1016/j.ejca.2013.04.018
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Late CLIPI Prognostic Index</h4>
                      <table className="w-full border-collapse border border-gray-300">
                        <tbody>
                          {[
                            { factor: "Male", points: "Points (1 each)" },
                            { factor: "Age > 60", points: "" },
                            { factor: "B1/B2", points: "" },
                            { factor: "N2/3", points: "" },
                            { factor: "Visceral involvement", points: "" },
                          ].map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="border border-gray-300 p-2">{item.factor}</td>
                              <td className="border border-gray-300 p-2">{item.points}</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-100 font-medium">
                            <td className="border border-gray-300 p-2">Total Points</td>
                            <td className="border border-gray-300 p-2">
                              <span className="bg-gray-200 px-1">***/5</span>
                            </td>
                          </tr>
                          <tr className="bg-gray-100 font-medium">
                            <td className="border border-gray-300 p-2">Risk Group:</td>
                            <td className="border border-gray-300 p-2">
                              <span className="bg-gray-200 px-1">***</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-sm mt-2">
                        Group 1 (1 risk factor); Group 2 (2 risk factors); Group 3 (3+ risk factors)
                      </p>
                      <p className="text-sm mt-1">
                        Reference: Benton EC, Crichton S, Talpur R, et al. A cutaneous lymphoma international prognostic
                        index (CLIPi) for mycosis fungoides and Sezary syndrome. Eur J Cancer. 2013;49(13):2859-2868.
                        doi:10.1016/j.ejca.2013.04.018
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="mb-2">
                        <span className="bg-gray-100 px-1">{customFields.followUp}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="customize">
            <Card className="p-6 mb-8">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold">Customize Template</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modify the fields below to customize your template before downloading
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Header Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="clinicName">Clinic Name</Label>
                        <Input
                          id="clinicName"
                          value={customFields.clinicName}
                          onChange={(e) => handleInputChange("clinicName", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Patient Information</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name Placeholder</Label>
                        <Input
                          id="patientName"
                          value={customFields.patientName}
                          onChange={(e) => handleInputChange("patientName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientAge">Patient Age Placeholder</Label>
                        <Input
                          id="patientAge"
                          value={customFields.patientAge}
                          onChange={(e) => handleInputChange("patientAge", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientSex">Patient Sex Placeholder</Label>
                        <Input
                          id="patientSex"
                          value={customFields.patientSex}
                          onChange={(e) => handleInputChange("patientSex", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Diagnosis Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="ctclType">CTCL Type</Label>
                        <Input
                          id="ctclType"
                          value={customFields.ctclType}
                          onChange={(e) => handleInputChange("ctclType", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="referredBy">Referred By</Label>
                        <Input
                          id="referredBy"
                          value={customFields.referredBy}
                          onChange={(e) => handleInputChange("referredBy", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">History of Present Illness</h3>
                    <div className="space-y-2">
                      <Label htmlFor="narrativeHPI">Narrative HPI</Label>
                      <Textarea
                        id="narrativeHPI"
                        value={customFields.narrativeHPI}
                        onChange={(e) => handleInputChange("narrativeHPI", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Patient History</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies</Label>
                        <Input
                          id="allergies"
                          value={customFields.allergies}
                          onChange={(e) => handleInputChange("allergies", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pastMedical">Past Medical History</Label>
                        <Input
                          id="pastMedical"
                          value={customFields.pastMedical}
                          onChange={(e) => handleInputChange("pastMedical", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pastSurgical">Past Surgical History</Label>
                        <Input
                          id="pastSurgical"
                          value={customFields.pastSurgical}
                          onChange={(e) => handleInputChange("pastSurgical", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="familyHistory">Family History</Label>
                        <Input
                          id="familyHistory"
                          value={customFields.familyHistory}
                          onChange={(e) => handleInputChange("familyHistory", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="socialHistory">Social History</Label>
                        <Input
                          id="socialHistory"
                          value={customFields.socialHistory}
                          onChange={(e) => handleInputChange("socialHistory", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ros">Review of Systems</Label>
                        <Input
                          id="ros"
                          value={customFields.ros}
                          onChange={(e) => handleInputChange("ros", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Physical Exam</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="vitals">Vitals</Label>
                        <Input
                          id="vitals"
                          value={customFields.vitals}
                          onChange={(e) => handleInputChange("vitals", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lymphNodes">Lymph Nodes</Label>
                        <Input
                          id="lymphNodes"
                          value={customFields.lymphNodes}
                          onChange={(e) => handleInputChange("lymphNodes", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Disease Assessment</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="tbsa">TBSA</Label>
                        <Input
                          id="tbsa"
                          value={customFields.tbsa}
                          onChange={(e) => handleInputChange("tbsa", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mswat">mSWAT</Label>
                        <Input
                          id="mswat"
                          value={customFields.mswat}
                          onChange={(e) => handleInputChange("mswat", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stage">Stage</Label>
                        <Input
                          id="stage"
                          value={customFields.stage}
                          onChange={(e) => handleInputChange("stage", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Plan</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ctclExplanation">CTCL Explanation</Label>
                        <Textarea
                          id="ctclExplanation"
                          value={customFields.ctclExplanation}
                          onChange={(e) => handleInputChange("ctclExplanation", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="treatmentPlan">Treatment Plan</Label>
                        <Textarea
                          id="treatmentPlan"
                          value={customFields.treatmentPlan}
                          onChange={(e) => handleInputChange("treatmentPlan", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="followUp">Follow Up</Label>
                        <Textarea
                          id="followUp"
                          value={customFields.followUp}
                          onChange={(e) => handleInputChange("followUp", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="default" onClick={downloadCustomizedText}>
                    <FileDown className="mr-2 h-4 w-4" /> Download Customized Template
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
