import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileDown, Calculator } from 'lucide-react';

const BODY_REGIONS = [
  { name: 'Head', bsa: 7 },
  { name: 'Neck', bsa: 2 },
  { name: 'Anterior trunk', bsa: 13 },
  { name: 'Arms', bsa: 8 },
  { name: 'Forearms', bsa: 6 },
  { name: 'Hands', bsa: 5 },
  { name: 'Posterior trunk', bsa: 13 },
  { name: 'Buttocks', bsa: 5 },
  { name: 'Thighs', bsa: 19 },
  { name: 'Legs', bsa: 14 },
  { name: 'Feet', bsa: 7 },
  { name: 'Groin', bsa: 1 }
];

export default function CTCLMedicalForm() {
  const [formData, setFormData] = useState({
    // Patient Information
    patientName: '',
    patientAge: '',
    patientSex: '',
    mrn: '',
    assessmentDate: '',
    
    // HPI
    ctclType: '',
    referredBy: '',
    narrativeHPI: '',
    
    // Registry Data
    dateInitialVisit: '',
    dateOnset: '',
    initialLesionType: '',
    initialQuantity: '',
    initialLocation: '',
    priorDiagnosis: '',
    priorTreatments: '',
    priorBiopsies: '',
    diseaseCourse: '',
    medicationChanges: '',
    exposures: '',
    currentItching: '',
    currentFlaking: false,
    currentColorChange: false,
    currentTreatments: '',
    currentLocation: '',
    
    // Patient History
    allergies: '',
    pastMedical: '',
    pastSurgical: '',
    familyHistory: '',
    socialHistory: '',
    ros: '',
    
    // Physical Exam
    vitals: '',
    generalAppearance: '',
    neuroStatus: '',
    mood: '',
    lymphNodeFindings: '',
    lymphNodes: '',
    
    // Body Surface Area Assessment
    bodyRegions: BODY_REGIONS.reduce((acc, region) => ({
      ...acc,
      [region.name]: { patch: 0, plaque: 0, tumor: 0 }
    }), {}),
    
    // CLIPI Factors
    clipiStage: 'early',
    clipiFactors: {
      male: false,
      ageOver60: false,
      plaques: false,
      folliculotropic: false,
      N1_Nx: false,
      B1_B2: false,
      N2_N3: false,
      visceral: false
    },
    
    // Clinical Assessment
    laboratory: '',
    flowCytometry: '',
    pathology: '',
    imaging: '',
    assessment: '',
    stage: '',
    treatmentPlan: '',
    ctclExplanation: '',
    followUp: ''
  });

  const [calculatedValues, setCalculatedValues] = useState({
    mswat: 0,
    tbsa: 0,
    clipi: { score: 0, risk: 'Low' }
  });

  // Real-time mSWAT calculation
  const mswatScore = useMemo(() => {
    let patchTotal = 0;
    let plaqueTotal = 0;
    let tumorTotal = 0;
    
    Object.entries(formData.bodyRegions).forEach(([region, lesions]) => {
      patchTotal += lesions.patch || 0;
      plaqueTotal += lesions.plaque || 0;
      tumorTotal += lesions.tumor || 0;
    });
    
    return (patchTotal * 1) + (plaqueTotal * 2) + (tumorTotal * 4);
  }, [formData.bodyRegions]);

  // Real-time TBSA calculation
  const tbsaScore = useMemo(() => {
    let total = 0;
    Object.entries(formData.bodyRegions).forEach(([region, lesions]) => {
      const totalLesion = (lesions.patch || 0) + (lesions.plaque || 0) + (lesions.tumor || 0);
      total += totalLesion;
    });
    return Math.min(100, total);
  }, [formData.bodyRegions]);

  // Real-time CLIPI calculation
  const clipiScore = useMemo(() => {
    const { clipiStage, clipiFactors } = formData;
    let score = 0;
    
    if (clipiFactors.male) score++;
    if (clipiFactors.ageOver60) score++;
    
    if (clipiStage === 'early') {
      if (clipiFactors.plaques) score++;
      if (clipiFactors.folliculotropic) score++;
      if (clipiFactors.N1_Nx) score++;
    } else {
      if (clipiFactors.B1_B2) score++;
      if (clipiFactors.N2_N3) score++;
      if (clipiFactors.visceral) score++;
    }
    
    let risk = 'Low';
    if (score === 2) risk = 'Intermediate';
    else if (score >= 3) risk = 'High';
    
    return { score, risk };
  }, [formData.clipiStage, formData.clipiFactors]);

  // Update calculated values
  useEffect(() => {
    setCalculatedValues({
      mswat: mswatScore,
      tbsa: tbsaScore,
      clipi: clipiScore
    });
  }, [mswatScore, tbsaScore, clipiScore]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleBodyRegionChange = (region, lesionType, value) => {
    const numValue = Math.max(0, Math.min(100, parseFloat(value) || 0));
    setFormData(prev => ({
      ...prev,
      bodyRegions: {
        ...prev.bodyRegions,
        [region]: {
          ...prev.bodyRegions[region],
          [lesionType]: numValue
        }
      }
    }));
  };

  // Export function with exact template formatting
  const generateTextReport = () => {
    return `Division of Cutaneous Oncology
Initial Visit

History of Present Illness: ${formData.patientName} is a ${formData.patientAge} ${formData.patientSex} who presents for initial consultation for suspected ${formData.ctclType}, referred by ${formData.referredBy}.

Narrative HPI: ${formData.narrativeHPI}

Registry:
Date of initial visit with CTCL specialist: ${formData.dateInitialVisit}
Date of onset of skin lesions (month/year): ${formData.dateOnset}
Initial symptoms at presentation (itching 1-10, flaking/scaling, color change): Itching ${formData.currentItching}/10, Flaking: ${formData.currentFlaking ? 'Yes' : 'No'}, Color change: ${formData.currentColorChange ? 'Yes' : 'No'}
Initial lesion type (patch, plaque, tumor, erythroderma): ${formData.initialLesionType}
Initial quantity of lesions (single, multiple, unknown): ${formData.initialQuantity}
Initial location of lesions (where anatomically located): ${formData.initialLocation}
Prior diagnosis for CTCL lesions (psoriasis, eczema, etc.): ${formData.priorDiagnosis}
Prior treatments for CTCL lesions: ${formData.priorTreatments}
Prior skin biopsies (dates / result): ${formData.priorBiopsies}
Disease course since lesion onset (clearance, progression, relapse): ${formData.diseaseCourse}
Medication changes prior to lesion onset: ${formData.medicationChanges}
Exposures from travel, recreation, occupation, or environment prior to lesions: ${formData.exposures}
Current symptoms (itching 1-10, flaking/scaling, color change): Itching ${formData.currentItching}/10, Flaking: ${formData.currentFlaking ? 'Yes' : 'No'}, Color change: ${formData.currentColorChange ? 'Yes' : 'No'}
Current treatments (date started, dose, response): ${formData.currentTreatments}
Current location of lesions (where anatomically located): ${formData.currentLocation}

Patient History
${formData.allergies}
${formData.pastMedical}
${formData.pastSurgical}
${formData.familyHistory}
${formData.socialHistory}
${formData.ros}

As noted in the HPI.

Physical Exam
${formData.vitals}
General: the patient is ${formData.generalAppearance || 'overall well appearing'}
Neuro: the patient is ${formData.neuroStatus || 'alert and oriented'}
Mood: ${formData.mood || 'appropriate'}

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
Lymph: ${formData.lymphNodeFindings || 'no palpable lymph nodes'}${formData.lymphNodes}
Peripheral vascular: warm and well perfused
Edema/Varicosities: no peripheral edema
Eccrine, apocrine glands: unremarkable

TBSA ${calculatedValues.tbsa.toFixed(1)}%, mSWAT ${calculatedValues.mswat}

Body Region	% BSA for this Region	% BSA as Patch	% BSA as Plaque	% BSA as Tumor
${BODY_REGIONS.map(region => 
`${region.name}	${region.bsa}%	${formData.bodyRegions[region.name]?.patch || 0}%	${formData.bodyRegions[region.name]?.plaque || 0}%	${formData.bodyRegions[region.name]?.tumor || 0}%`
).join('\n')}
% BSA by category	100%
Severity Weighting Factor		x1	x2	x4
Skin Score Total
mSWAT	${calculatedValues.mswat}

PATHOLOGY, IMAGING AND LABORATORY DATA:
All internal, external data were directly reviewed and summarized below.

LABORATORY:
${formData.laboratory}

FLOW CYTOMETRY:
${formData.flowCytometry}

PATHOLOGY:
${formData.pathology}

IMAGING:
${formData.imaging}

ASSESSMENT:
${formData.assessment}

PLAN:
${formData.patientName} is a ${formData.patientAge} ${formData.patientSex} with stage ${formData.stage}. Today patient with ${calculatedValues.tbsa.toFixed(1)}% TBSA involvement, mSWAT ${calculatedValues.mswat} with ${calculatedValues.mswat}
${formData.ctclExplanation}
${formData.treatmentPlan}

Prognostic index (Choose Early versus Late)

Early CLIPI Prognostic Index
	Points (1 each)
Male	${formData.clipiFactors.male ? '1' : '0'}
Age > 60	${formData.clipiFactors.ageOver60 ? '1' : '0'}
Plaques	${formData.clipiFactors.plaques ? '1' : '0'}
Folliculotropic	${formData.clipiFactors.folliculotropic ? '1' : '0'}
N1/Nx	${formData.clipiFactors.N1_Nx ? '1' : '0'}
Total Points	${formData.clipiStage === 'early' ? calculatedValues.clipi.score : '***'}/5
Risk Group: ${formData.clipiStage === 'early' ? calculatedValues.clipi.risk : '***'}
Group 1 (1 risk factor); Group 2 (2 risk factors); Group 3 (3+ risk factors)
Reference: Benton EC, Crichton S, Talpur R, et al. A cutaneous lymphoma international prognostic index (CLIPi) for mycosis fungoides and Sezary syndrome. Eur J Cancer. 2013;49(13):2859-2868. doi:10.1016/j.ejca.2013.04.018

Late CLIPI Prognostic Index
	Points (1 each)
Male	${formData.clipiFactors.male ? '1' : '0'}
Age > 60	${formData.clipiFactors.ageOver60 ? '1' : '0'}
B1/B2	${formData.clipiFactors.B1_B2 ? '1' : '0'}
N2/3	${formData.clipiFactors.N2_N3 ? '1' : '0'}
Visceral involvement	${formData.clipiFactors.visceral ? '1' : '0'}
Total Points	${formData.clipiStage === 'late' ? calculatedValues.clipi.score : '***'}/5
Risk Group: ${formData.clipiStage === 'late' ? calculatedValues.clipi.risk : '***'}
Group 1 (1 risk factor); Group 2 (2 risk factors); Group 3 (3+ risk factors)
Reference: Benton EC, Crichton S, Talpur R, et al. A cutaneous lymphoma international prognostic index (CLIPi) for mycosis fungoides and Sezary syndrome. Eur J Cancer. 2013;49(13):2859-2868. doi:10.1016/j.ejca.2013.04.018

${formData.followUp}`;
  };

  const handleExport = (format) => {
    const content = generateTextReport();
    const filename = `CTCL-Assessment-${formData.patientName || 'Patient'}-${new Date().toISOString().split('T')[0]}.txt`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">CTCL Medical Assessment Form</h2>
            <p className="text-muted-foreground">Complete CTCL evaluation with automatic calculations</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calculator className="h-4 w-4" />
            <span>mSWAT: {calculatedValues.mswat}</span>
            <span>TBSA: {calculatedValues.tbsa.toFixed(1)}%</span>
            <span>CLIPI: {calculatedValues.clipi.score} ({calculatedValues.clipi.risk})</span>
          </div>
        </div>

        <Tabs defaultValue="patient-info" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="patient-info">Patient Info</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="exam">Exam & BSA</TabsTrigger>
            <TabsTrigger value="calculations">Assessment</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="patient-info" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientAge">Age</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    value={formData.patientAge}
                    onChange={(e) => handleInputChange('patientAge', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientSex">Sex</Label>
                  <Select value={formData.patientSex} onValueChange={(value) => handleInputChange('patientSex', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Diagnosis Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ctclType">CTCL Type Suspected</Label>
                  <Select value={formData.ctclType} onValueChange={(value) => handleInputChange('ctclType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select CTCL type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mycosis Fungoides">Mycosis Fungoides</SelectItem>
                      <SelectItem value="Sezary Syndrome">Sézary Syndrome</SelectItem>
                      <SelectItem value="Primary Cutaneous CD30+">Primary Cutaneous CD30+</SelectItem>
                      <SelectItem value="Other CTCL">Other CTCL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referredBy">Referred By</Label>
                  <Input
                    id="referredBy"
                    value={formData.referredBy}
                    onChange={(e) => handleInputChange('referredBy', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">History of Present Illness</h3>
              <div className="space-y-2">
                <Label htmlFor="narrativeHPI">Narrative HPI</Label>
                <Textarea
                  id="narrativeHPI"
                  value={formData.narrativeHPI}
                  onChange={(e) => handleInputChange('narrativeHPI', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Registry Data</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dateInitialVisit">Date of Initial Visit</Label>
                  <Input
                    id="dateInitialVisit"
                    type="date"
                    value={formData.dateInitialVisit}
                    onChange={(e) => handleInputChange('dateInitialVisit', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOnset">Date of Onset (Month/Year)</Label>
                  <Input
                    id="dateOnset"
                    type="month"
                    value={formData.dateOnset}
                    onChange={(e) => handleInputChange('dateOnset', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialLesionType">Initial Lesion Type</Label>
                  <Select value={formData.initialLesionType} onValueChange={(value) => handleInputChange('initialLesionType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patch">Patch</SelectItem>
                      <SelectItem value="plaque">Plaque</SelectItem>
                      <SelectItem value="tumor">Tumor</SelectItem>
                      <SelectItem value="erythroderma">Erythroderma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialQuantity">Initial Quantity</Label>
                  <Select value={formData.initialQuantity} onValueChange={(value) => handleInputChange('initialQuantity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="multiple">Multiple</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentItching">Current Itching (0-10)</Label>
                  <Select value={formData.currentItching} onValueChange={(value) => handleInputChange('currentItching', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(11)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Additional Symptoms</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="currentFlaking"
                        checked={formData.currentFlaking}
                        onCheckedChange={(checked) => handleInputChange('currentFlaking', checked)}
                      />
                      <Label htmlFor="currentFlaking">Flaking/Scaling</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="currentColorChange"
                        checked={formData.currentColorChange}
                        onCheckedChange={(checked) => handleInputChange('currentColorChange', checked)}
                      />
                      <Label htmlFor="currentColorChange">Color Change</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exam" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Body Surface Area Assessment</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left">Body Region</th>
                      <th className="border border-gray-300 p-2 text-center">BSA %</th>
                      <th className="border border-gray-300 p-2 text-center">Patch %</th>
                      <th className="border border-gray-300 p-2 text-center">Plaque %</th>
                      <th className="border border-gray-300 p-2 text-center">Tumor %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BODY_REGIONS.map((region, index) => {
                      const lesions = formData.bodyRegions[region.name] || { patch: 0, plaque: 0, tumor: 0 };
                      
                      return (
                        <tr key={region.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 p-2 font-medium">{region.name}</td>
                          <td className="border border-gray-300 p-2 text-center">{region.bsa}%</td>
                          <td className="border border-gray-300 p-2">
                            <Input
                              type="number"
                              min="0"
                              max={region.bsa}
                              step="0.1"
                              value={lesions.patch || ''}
                              onChange={(e) => handleBodyRegionChange(region.name, 'patch', e.target.value)}
                              className="w-20 text-center"
                              placeholder="0"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Input
                              type="number"
                              min="0"
                              max={region.bsa}
                              step="0.1"
                              value={lesions.plaque || ''}
                              onChange={(e) => handleBodyRegionChange(region.name, 'plaque', e.target.value)}
                              className="w-20 text-center"
                              placeholder="0"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Input
                              type="number"
                              min="0"
                              max={region.bsa}
                              step="0.1"
                              value={lesions.tumor || ''}
                              onChange={(e) => handleBodyRegionChange(region.name, 'tumor', e.target.value)}
                              className="w-20 text-center"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{calculatedValues.mswat}</div>
                    <div className="text-sm text-blue-600 font-medium">mSWAT Score</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{calculatedValues.tbsa.toFixed(1)}%</div>
                    <div className="text-sm text-green-600 font-medium">Total BSA</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{calculatedValues.clipi.score}/5</div>
                    <div className="text-sm text-purple-600 font-medium">{calculatedValues.clipi.risk} Risk</div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculations" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">CLIPI Assessment</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>CLIPI Stage</Label>
                  <Select value={formData.clipiStage} onValueChange={(value) => handleInputChange('clipiStage', value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early">Early Stage (IA-IIA)</SelectItem>
                      <SelectItem value="late">Late Stage (IIB-IVB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clipi-male"
                      checked={formData.clipiFactors.male}
                      onCheckedChange={(checked) => handleNestedChange('clipiFactors', 'male', checked)}
                    />
                    <Label htmlFor="clipi-male">Male gender</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clipi-age"
                      checked={formData.clipiFactors.ageOver60}
                      onCheckedChange={(checked) => handleNestedChange('clipiFactors', 'ageOver60', checked)}
                    />
                    <Label htmlFor="clipi-age">Age > 60 years</Label>
                  </div>

                  {formData.clipiStage === 'early' ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="clipi-plaques"
                          checked={formData.clipiFactors.plaques}
                          onCheckedChange={(checked) => handleNestedChange('clipiFactors', 'plaques', checked)}
                        />
                        <Label htmlFor="clipi-plaques">Plaques present</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="clipi-folliculotropic"
                          checked={formData.clipiFactors.folliculotropic}
                          onCheckedChange={(checked) => handleNestedChange('clipiFactors', 'folliculotropic', checked)}
                        />
                        <Label htmlFor="clipi-folliculotropic">Folliculotropic disease</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="clipi-n1nx"
                          checked={formData.clipiFactors.N1_Nx}
                          onCheckedChange={(checked) => handleNestedChange('clipiFactors', 'N1_Nx', checked)}
                        />
                        <Label htmlFor="clipi-n1nx">N1/Nx lymph node involvement</Label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="clipi-b1b2"
                          checked={formData.clipiFactors.B1_B2}
                          onCheckedChange={(checked) => handleNestedChange('clipiFactors', 'B1_B2', checked)}
                        />
                        <Label htmlFor="clipi-b1b2">B1/B2 blood involvement</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="clipi-n2n3"
                          checked={formData.clipiFactors.N2_N3}
                          onCheckedChange={(checked) => handleNestedChange('clipiFactors', 'N2_N3', checked)}
                        />
                        <Label htmlFor="clipi-n2n3">N2/N3 lymph node involvement</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="clipi-visceral"
                          checked={formData.clipiFactors.visceral}
                          onCheckedChange={(checked) => handleNestedChange('clipiFactors', 'visceral', checked)}
                        />
                        <Label htmlFor="clipi-visceral">Visceral involvement</Label>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <Card className="mt-6 p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {calculatedValues.clipi.score}/5
                  </div>
                  <div className={`text-lg font-semibold ${
                    calculatedValues.clipi.risk === 'Low' ? 'text-green-600' : 
                    calculatedValues.clipi.risk === 'Intermediate' ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {calculatedValues.clipi.risk} Risk
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Clinical Assessment</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stage">Disease Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => handleInputChange('stage', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IA">Stage IA (T1N0M0)</SelectItem>
                      <SelectItem value="IB">Stage IB (T2N0M0)</SelectItem>
                      <SelectItem value="IIA">Stage IIA (T1-2N1M0)</SelectItem>
                      <SelectItem value="IIB">Stage IIB (T3N0-1M0)</SelectItem>
                      <SelectItem value="IIIA">Stage IIIA (T4N0M0)</SelectItem>
                      <SelectItem value="IIIB">Stage IIIB (T4N1M0)</SelectItem>
                      <SelectItem value="IVA1">Stage IVA1 (T1-4N2M0)</SelectItem>
                      <SelectItem value="IVA2">Stage IVA2 (T1-4N3M0)</SelectItem>
                      <SelectItem value="IVB">Stage IVB (T1-4N0-3M1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assessment">Assessment</Label>
                  <Textarea
                    id="assessment"
                    value={formData.assessment}
                    onChange={(e) => handleInputChange('assessment', e.target.value)}
                    rows={3}
                    placeholder="Clinical impression, differential diagnosis"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatmentPlan">Treatment Plan</Label>
                  <Textarea
                    id="treatmentPlan"
                    value={formData.treatmentPlan}
                    onChange={(e) => handleInputChange('treatmentPlan', e.target.value)}
                    rows={3}
                    placeholder="Therapeutic recommendations"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Export Assessment</h3>
              
              <Card className="p-4">
                <div className="flex items-start space-x-3">
                  <FileDown className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold">Complete CTCL Report</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download complete medical report matching original template format
                    </p>
                    <Button 
                      onClick={() => handleExport('text')}
                      className="w-full"
                    >
                      Download Complete Report
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 mt-4">
                <h4 className="font-semibold mb-3">Form Completion Status</h4>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="flex justify-between text-sm">
                    <span>Patient Info:</span>
                    <span className={formData.patientName && formData.patientAge && formData.patientSex ? 'text-green-600' : 'text-red-600'}>
                      {formData.patientName && formData.patientAge && formData.patientSex ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>BSA Assessment:</span>
                    <span className={calculatedValues.mswat > 0 || calculatedValues.tbsa > 0 ? 'text-green-600' : 'text-yellow-600'}>
                      {calculatedValues.mswat > 0 || calculatedValues.tbsa > 0 ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>CLIPI Score:</span>
                    <span className="text-green-600">✓</span>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>✓ = Complete, ○ = Optional, ✗ = Required</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
