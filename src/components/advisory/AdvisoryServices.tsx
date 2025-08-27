"use client";

import Service from "@/components/advisory/Service";

const Services = () => {
  return (
    <section
      className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12"
      id="services"
    >
      <Service
        title={"Workshop"}
        price={
          <span>
            <span>€1,500</span>
          </span>
        }
        headline={
          <>
            Get instant clarify on the big-picture questions keeping you up at
            night.
          </>
        }
        description={
          <>
            <p>
              Arm yourself with the information you need to confidently kick-off
              the development phase.
            </p>
            <p>
              In this workshop we&apos;ll meet on Zoom for a 1.5 to 2 hour
              recorded video call to dig deeper into your industry & business
              and answer your questions. Afterwards I&apos;ll deliver a short
              appraisal Loom video that you can share with other stakeholders to
              make a fully informed decision about the best next steps.
            </p>
          </>
        }
        benefits={[
          "Answer the most pressing questions.",
          "Identify the primary challenges.",
          "Talk through potential tech solutions.",
          "Set the next steps in stone.",
        ]}
        linkText={"Book Now"}
        linkOnClick={() => {
          window.location.href = "https://savvycal.com/timmyomahony/workshop";
        }}
      />
      <Service
        title={"Roadmap"}
        price={"€5,000"}
        headline={
          <>
            Take the uncertainty out of app development with a detailed
            plan-of-action roadmap document.
          </>
        }
        description={
          <>
            <p>
              Walk away with a 25+ page PDF document that includes everything
              you need for a painless development phase.
            </p>
            <p>
              Creating a roadmap usually takes between 2 to 4 weeks. We&apos;ll
              have a kick-off workshop to cover the basics followed by a second
              workshop after 7 - 10 days to answer my follow-up questions.
              I&apos;ll then write everything up and deliver it on a final 1
              hour handover call.
            </p>
          </>
        }
        benefits={[
          "Get approx. cost & timelines",
          "Uncover hidden risks, challenges and unknowns",
          "Nail down wireframes & architecture",
          "Get introduced to quality developers",
        ]}
        linkText={"Book Now"}
        linkOnClick={() => {
          window.location.href = "https://savvycal.com/timmyomahony/roadmap";
        }}
      />
      <Service
        disabled={true}
        title={"Coding & Development"}
        price={"€??,???"}
        headline={<></>}
        description={
          <p>
            Trying to start development without fully understanding your
            technical requirements is a recipe for disaster. Start with a
            workshop or roadmap to remove the risk up-front.
          </p>
        }
        benefits={[
          "Unknown requirements",
          "Unknown costs",
          "Unknown timelines & milestones",
          "Untested developers",
        ]}
        linkText={"Don't Book Now"}
        linkOnClick={() => {
          console.log("Test");
        }}
      />
    </section>
  );
};

export default Services;
