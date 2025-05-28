import Image from "next/image"

export const ReferralImages = {
  ReferralPathway: () => (
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      <Image
        src="/images/clinical-support/referral-pathway.png"
        alt="Referral pathway flowchart for CTCL patients"
        width={600}
        height={500}
        className="w-full h-auto"
      />
      <div className="p-2 bg-slate-50 text-xs text-center">Fig 1. CTCL referral pathway decision tree</div>
    </div>
  ),

  SpecialistMap: () => (
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      <Image
        src="/images/clinical-support/specialist-map.png"
        alt="Map showing CTCL specialist centers across the United States"
        width={600}
        height={400}
        className="w-full h-auto"
      />
      <div className="p-2 bg-slate-50 text-xs text-center">Fig 2. CTCL specialist centers in the United States</div>
    </div>
  ),
}
