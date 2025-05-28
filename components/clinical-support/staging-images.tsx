import Image from "next/image"

export const StagingImages = {
  TStages: () => (
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      <Image
        src="/images/clinical-support/t-stages.png"
        alt="Visual representation of T stages in CTCL showing patch, plaque, tumor, and erythroderma"
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <div className="p-2 bg-slate-50 text-xs text-center">Fig 1. T stages in CTCL: T1-T4</div>
    </div>
  ),

  NStages: () => (
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      <Image
        src="/images/clinical-support/n-stages.png"
        alt="Lymph node involvement in CTCL"
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <div className="p-2 bg-slate-50 text-xs text-center">Fig 2. Lymph node (N) involvement in CTCL</div>
    </div>
  ),
}
