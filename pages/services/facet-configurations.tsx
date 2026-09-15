// pages/services/facet-configurations.tsx
import Head from 'next/head';
import React from 'react';

// NEW page, mirrored directly from the old site's own
// /facet-configuration page. Content read directly from the
// reference — highly specific healthcare/FACETS technical detail, not
// paraphrased or invented. 6 categories, each a divided checklist,
// separated by full-width solid orange divider bands.
const categories = [
  {
    title: 'Enrollment',
    items: [
      'Perform member assessments, enrollments, health homes billing for Medicaid Health and recovery plan.',
      'Automate member eligibility rules for Medicare Special Needs Plan (SNP) and Medicaid Health and Recovery plan.',
      'Identify all Medicare SNP members who had 90-days assessments and 365-days reassessments.',
      'Extract Member eligibility information from FACETS and generated enrollment files in HIPAA 5010 EDI 834 for Medical, Dental and Vision vendors.',
    ],
  },
  {
    title: 'Billing and Payments Reconciliation',
    items: [
      "Integrate our client's systems with third party payment system which allows members to set-up recurring payments and make premium payments online seamlessly from member portal.",
      'Process all premium bills to third party payment gateway to accept and process payments to member accounts.',
      'Reconciled member actual deposits from the exchange which includes subsidies for Advanced Premium Tax Credits (APTC) and Cost Sharing Reduction (CSR) against HIPAA EDI 820 policy-based payment notifications.',
    ],
  },
  {
    title: 'Claims & Encounters',
    items: [
      'We Validate and auto adjudicated Professional (837P), Institutional (837I), Dental (837D) and Pharma (NCPDP) claims from various provider networks / vendors and processed response in HIPAA EDI 277/835 form.',
      'We integrate Clients systems with third party vendor to process EDI 278 pre-authorization requests from providers in real time.',
      'Extract and submitted all post adjudicated Medicaid claims (Medical 298P/299I, Dental 300D, Vision and Pharmacy NCPDP) State\u2019s All Payer Database and improved state acceptance rate by fixing state exceptions, these will be used to calculate capitation rate and to identify the clinical areas for improvement.',
      'Reconciled encounters submissions against state responses and generated discrepancy report.',
      'Processed Medicare Advantage members post adjudicated claims data to CMS Risk Adjustment Processing System (RAPS) and CMS Encounter Data Processing System (EDPS) for risk score calculation.',
      'We Collect member information from Charge sheets (part of Medicare charge sheet review) and validated against Clients FACETS system to process linked and unlinked claims accurately.',
    ],
  },
  {
    title: 'Risk Adjustment',
    items: [
      'We analyze Risk Adjustment initiatives by analyzing the encounters and extracting data for chart review.',
      'Performed data aggregation, validation to obtain the suspect list and created reports to analyze the priority of suspect.',
      'Create workflow for analyzing the supplemental codes and submitted to State, CMS, and EDGE as per the respective encounter information.',
      'Analyze the response from government bodies and clear out the errors in the submitted claims to achieve more than 99% accuracy in submission.',
    ],
  },
  {
    title: 'Analytics',
    items: [
      'We Process member enrollment and claims data to third party system to calculate HEDIS measures for QARR reporting and STAR Rating.',
      'Create system to send demographic and claims data for 3M CRG to measure the risk associated to each member to predict future health care utilization and cost (prospective) and explain post health care utilization and cost (retrospective).',
      'Analyze and created HCC gap analysis to determine the members with chronic conditions and need provider\u2019s attention.',
      'Create a member 360 dashboard that can help the business users to understand the complete health profile of members and focus on people with chronic illness.',
      'Create an analytical platform for customer care representatives for tracking the real time member information and provide services to members efficiently.',
      'Create vendor data marts to perform quick analytics on top of huge claims data related to various vendors.',
    ],
  },
  {
    title: 'Automation Testing',
    items: [
      'Regression Testing — automation of FACETS batch jobs.',
      'Performance Testing — batch jobs testing and load testing.',
      'Reusability of test data, case, and scripts.',
      'Collected member information from Charge sheets (part of Medicare charge sheet review) and auto validation against FACETS system to process linked and unlinked claims accurately.',
    ],
  },
];

export default function FacetConfigurationsPage() {
  return (
    <>
      <Head>
        <title>FACET Configurations — Echolink Solutions</title>
        <meta
          name="description"
          content="EPIC EMR FACETS configuration, managed services, and deep expertise across every module of the FACETS healthcare platform."
        />
        <meta property="og:title" content="FACET Configurations — Echolink Solutions" />
        <meta property="og:description" content="EPIC EMR FACETS configuration, managed services, and deep expertise across every module of the FACETS healthcare platform." />
      </Head>

      <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
        <div className="wrap max-w-2xl">
          <span className="text-xs font-bold tracking-tag uppercase block mb-3" style={{ color: '#FF6100' }}>
            MANAGED SERVICES
          </span>
          <h1 className="text-white !font-bold text-4xl md:text-5xl mb-6">
            FACET Configurations
          </h1>
          <p className="text-white text-base leading-relaxed mb-8">
            Our EPIC EMR FACETS configuration helps in implementing and managing the
            FACETS platform to reduce planned administrative costs, improve business
            processes and deliver better value for care management solutions. We have
            deep expertise across all the modules of FACETS healthcare application. We
            have integrated the platform with other systems in the client application
            landscape. We have developed automation and analytics capabilities around
            FACETS systems to help you in your digital transformation journey and be
            future ready. Simultaneously, we offer cost-effective managed services on
            the EPIC EMR FACETS platform to take care of day-to-day administrative
            tasks.
          </p>
          <span className="text-white text-2xl" aria-hidden="true">↓</span>
        </div>
      </section>

      {/* PADDING CONSISTENCY FIX: was pt-20 pb-10 (80px/40px) — thin,
          asymmetric, and the only section on the page not using the
          site's dominant content-section padding (py-[50px]
          lg:py-[100px], used by 17 other sections sitewide). Matched
          that standard instead of carrying its own one-off value. */}
      <section className="bg-white py-[50px] lg:py-[100px] relative overflow-hidden">
        <span className="absolute top-16 right-16 w-6 h-6 hidden lg:block" style={{ background: '#FF6100' }} aria-hidden="true" />
        <span className="absolute top-24 right-24 w-8 h-8 hidden lg:block" style={{ background: '#16003B' }} aria-hidden="true" />
        <div className="wrap">
          <h2 className="font-bold text-2xl md:text-3xl mb-4" style={{ color: '#FF6100' }}>
            FACET Configurations we focus on
          </h2>
        </div>
      </section>

      {categories.map((cat, catIndex) => (
        <React.Fragment key={cat.title}>
          <section className="bg-white py-[50px] lg:py-[100px]">
            <div className="wrap grid md:grid-cols-[1fr_2fr] gap-10">
              <h3 className="font-bold text-2xl leading-tight" style={{ color: '#16003B' }}>
                {cat.title}
              </h3>
              <div className="flex flex-col">
                {cat.items.map((item, i) => (
                  <p
                    key={item}
                    className={`text-base leading-relaxed py-4 ${
                      i < cat.items.length - 1 ? 'border-b border-[#E5E5E5]' : ''
                    }`}
                    style={{ color: '#434343' }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </section>
          {catIndex < categories.length - 1 && (
            <div className="h-3" style={{ background: '#FF6100' }} aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
