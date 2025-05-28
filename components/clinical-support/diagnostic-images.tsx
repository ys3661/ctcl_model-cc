import Image from "next/image"

export const DiagnosticImages = {
  BiopsyTechnique: () => (
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      <Image
        src="/images/clinical-support/biopsy-technique.png"
        alt="Proper biopsy technique for CTCL showing punch biopsy and incisional biopsy methods"
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <div className="p-2 bg-slate-50 text-xs text-center">Fig 1. Recommended biopsy techniques for suspected CTCL</div>
    </div>
  ),

  StainSelection: () => (
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      <Image
        src="/images/clinical-support/stain-selection.png"
        alt="Immunohistochemical stain selection guide showing different stain patterns"
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <div className="p-2 bg-slate-50 text-xs text-center">Fig 2. Immunohistochemical stain patterns in CTCL</div>
    </div>
  ),

  DiagnosticFlowchart: () => (
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      <Image
        src="/images/clinical-support/diagnostic-flowchart.png"
        alt="Diagnostic flowchart for suspected CTCL"
        width={600}
        height={800}
        className="w-full h-auto"
      />
      <div className="p-2 bg-slate-50 text-xs text-center">Fig 3. Diagnostic algorithm for suspected CTCL</div>
    </div>
  ),
}
