"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileDown, Calculator, AlertCircle, CheckCircle } from 'lucide-react';

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
    patientName: '',
    patientAge: '',
    patientSex: '',
    mrn: '',
    assessmentDate: '',
    ctclType: '',
    referredBy: '',
    narrativeHPI: '',
    dateInitialVisit: '',
    dateOnset: '',
    initialLesionType: '',
    initialQuantity: '',
    priorDiagnosis: '',
    diseaseCourse: '',
    currentItching: '',
    currentFlaking: false,
    currentColorChange: false,
    allergies: '',
    pastMedical: '',
    pastSurgical: '',
    familyHistory: '',
    socialHistory: '',
    ros: '',
    vitals: '',
    generalAppearance: '',
    neuroStatus: '',
    mood: '',
    lymphNodeFindings: '',
    lymphNodes: '',
    bodyRegions: BODY_REGIONS.reduce((acc, region) => ({
      ...acc,
      [region.name]: { patch: 0, plaque: 0, tumor: 0 }
    }), {}),
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
    laboratory: '',
    flowCytometry: '',
    pathology: '',
    imaging: '',
    assessment: '',
    stage: '',
    treatmentPlan: '',
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

  // Export functions
  const generateTextReport = () => {
    return `Division of Cutaneous Oncology
Initial Visit

History of Present Illness: ${formData.patientName} is a ${formData.patientAge} ${formData.patientSex} who presents for initial consultation for suspected ${formData.ctclType}, referred by ${formData.referredBy}.

Narrative HPI: ${formData.narrativeHPI}

Patient Information:
Name: ${formData.patientName}
Age: ${formData.patientAge}
Sex: ${formData.patientSex}
MRN: ${formData.mrn}
Assessment Date: ${formData.assessmentDate}

Body Surface Area Assessment:
${BODY_REGIONS.map(region => 
  `${region.name} (${region.bsa}%): Patch ${formData.bodyRegions[region.name]?.patch || 0}%, Plaque ${formData.bodyRegions[region.name]?.plaque || 0}%, Tumor ${formData.bodyRegions[region.name]?.tumor || 0}%`
).join('\n')}

Calculated Scores:
mSWAT Score: ${calculatedValues.mswat}
TBSA: ${calculatedValues.tbsa}%
CLIPI Score: ${calculatedValues.clipi.score}/5 (${calculatedValues.clipi.risk} Risk)

Assessment: ${formData.assessment}
Treatment Plan: ${formData.treatmentPlan}
Follow Up: ${formData.followUp}`;
  };

  const generateCSVData = () => {
    const headers = ['Field', 'Value'];
    const rows = [
      ['Patient Name', formData.patientName],
      ['Age', formData.patientAge],
      ['Sex', formData.patientSex],
      ['mSWAT Score', calculatedValues.mswat],
      ['TBSA', calculatedValues.tbsa],
      ['CLIPI Score', calculatedValues.clipi.score],
      ['CLIPI Risk', calculatedValues.clipi.risk]
    ];
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const handleExport = (format) => {
    let content, filename, type;
    
    switch (format) {
      case 'text':
        content = generateTextReport();
        filename = `CTCL-Assessment-${formData.patientName || 'Patient'}-${new Date().toISOString().split('T')[0]}.txt`;
        type = 'text/plain';
        break;
      case 'csv':
        content = generateCSVData();
        filename = `CTCL-Data-${formData.patientName || 'Patient'}-${new Date().toISOString().split('T')[0]}.csv`;
        type = 'text/csv';
        break;
      default:
        return;
    }
    
    const blob = new Blob([content], { type });
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
            <span>TBSA: {calculatedValues.tbsa}%</span>
            <span>CLIPI: {calculatedValues.clipi.score} ({calculatedValues.clipi.risk})</span>
          </div>
        </div>

        <Tabs defaultValue="patient-info" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="patient-info">Patient Info</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="exam">Exam & BSA</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
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
                <div className="space-y-2">
                  <Label htmlFor="mrn">MRN</Label>
                  <Input
                    id="mrn"
                    value={formData.mrn}
                    onChange={(e) => handleInputChange('mrn', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assessmentDate">Assessment Date</Label>
                  <Input
                    id="assessmentDate"
                    type="date"
                    value={formData.assessmentDate}
                    onChange={(e) => handleInputChange('assessmentDate', e.target.value)}
                  />
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
                      <SelectItem value="mycosis_fungoides">Mycosis Fungoides</SelectItem>
                      <SelectItem value="sezary_syndrome">Sézary Syndrome</SelectItem>
                      <SelectItem value="primary_cutaneous_cd30">Primary Cutaneous CD30+</SelectItem>
                      <SelectItem value="subcutaneous_panniculitis">Subcutaneous Panniculitis-like</SelectItem>
                      <SelectItem value="other">Other CTCL</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Clinical History</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="initialLesionType">Initial Lesion Type</Label>
                  <Select value={formData.initialLesionType} onValueChange={(value) => handleInputChange('initialLesionType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lesion type" />
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
                  <Label htmlFor="priorDiagnosis">Prior Diagnosis</Label>
                  <Select value={formData.priorDiagnosis} onValueChange={(value) => handleInputChange('priorDiagnosis', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select prior diagnosis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="psoriasis">Psoriasis</SelectItem>
                      <SelectItem value="eczema">Eczema</SelectItem>
                      <SelectItem value="dermatitis">Dermatitis</SelectItem>
                      <SelectItem value="drug_eruption">Drug Eruption</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diseaseCourse">Disease Course</Label>
                  <Select value={formData.diseaseCourse} onValueChange={(value) => handleInputChange('diseaseCourse', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select disease course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clearance">Clearance</SelectItem>
                      <SelectItem value="progression">Progression</SelectItem>
                      <SelectItem value="relapse">Relapse</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Current Symptoms</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentItching">Current Itching (0-10 scale)</Label>
                  <Select value={formData.currentItching} onValueChange={(value) => handleInputChange('currentItching', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select itching level" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(11)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>{i} - {i === 0 ? 'No itching' : i === 10 ? 'Severe itching' : 'Moderate'}</SelectItem>
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
                      <th className="border border-gray-300 p-2 text-center">Standard BSA %</th>
                      <th className="border border-gray-300 p-2 text-center">Patch % (×1)</th>
                      <th className="border border-gray-300 p-2 text-center">Plaque % (×2)</th>
                      <th className="border border-gray-300 p-2 text-center">Tumor % (×4)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BODY_REGIONS.map((region, index) => {
                      const lesions = formData.bodyRegions[region.name] || { patch: 0, plaque: 0, tumor: 0 };
                      
                      return (
                        <tr key={region.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 p-2 font-medium">{region.name}</td>
                          <td className="border border-gray-300 p-2 text-center font-medium">{region.bsa}%</td>
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
                <Card className="p-4 border-blue-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{calculatedValues.mswat}</div>
                    <div className="text-sm text-blue-600 font-medium">mSWAT Score</div>
                  </div>
                </Card>
                
                <Card className="p-4 border-green-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{calculatedValues.tbsa.toFixed(1)}%</div>
                    <div className="text-sm text-green-600 font-medium">Total BSA</div>
                  </div>
                </Card>
                
                <Card className="p-4 border-purple-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">
                      {calculatedValues.clipi.score}/5
                    </div>
                    <div className="text-sm text-purple-600 font-medium">
                      {calculatedValues.clipi.risk} Risk
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculations" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">CLIPI Prognostic Assessment</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">CLIPI Stage</Label>
                  <Select 
                    value={formData.clipiStage} 
                    onValueChange={(value) => handleInputChange('clipiStage', value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early">Early Stage (IA-IIA)</SelectItem>
                      <SelectItem value="late">Late Stage (IIB-IVB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Risk Factors</Label>
                  <div className="mt-3 space-y-3">
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
              </div>
              
              <Card className="mt-6 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">CLIPI Results</h4>
                    <p className="text-sm text-muted-foreground">
                      {formData.clipiStage === 'early' ? 'Early Stage' : 'Late Stage'} Assessment
                    </p>
                  </div>
                  <div className="text-right">
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
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Clinical Assessment</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assessment">Assessment</Label>
                  <Textarea
                    id="assessment"
                    value={formData.assessment}
                    onChange={(e) => handleInputChange('assessment', e.target.value)}
                    rows={3}
                    placeholder="Clinical impression, staging, differential diagnosis"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stage">Disease Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => handleInputChange('stage', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select CTCL stage" />
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
                  <Label htmlFor="treatmentPlan">Treatment Plan</Label>
                  <Textarea
                    id="treatmentPlan"
                    value={formData.treatmentPlan}
                    onChange={(e) => handleInputChange('treatmentPlan', e.target.value)}
                    rows={3}
                    placeholder="Therapeutic recommendations, medications, procedures"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Export Assessment</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <div className="flex items-start space-x-3">
                    <FileDown className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Text Report</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Complete medical report in text format
                      </p>
                      <Button 
                        onClick={() => handleExport('text')}
                        variant="outline"
                        className="w-full"
                      >
                        Download Text Report
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-start space-x-3">
                    <FileDown className="h-5 w-5 text-green-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold">CSV Data Export</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Structured data for analysis
                      </p>
                      <Button 
                        onClick={() => handleExport('csv')}
                        variant="outline"
                        className="w-full"
                      >
                        Download CSV Data
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              
              <Card className="p-4 mt-6">
                <h4 className="font-semibold mb-3">Form Status</h4>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="flex justify-between text-sm">
                    <span>Patient Info:</span>
                    <span className={formData.patientName && formData.patientAge ? 'text-green-600' : 'text-red-600'}>
                      {formData.patientName && formData.patientAge ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>BSA Assessment:</span>
                    <span className={calculatedValues.mswat > 0 ? 'text-green-600' : 'text-yellow-600'}>
                      {calculatedValues.mswat > 0 ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>CLIPI Score:</span>
                    <span className="text-green-600">✓</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
