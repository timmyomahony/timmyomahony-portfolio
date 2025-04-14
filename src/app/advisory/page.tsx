/* eslint-disable @next/next/no-img-element */
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import AdvisoryBio from "@/components/advisory/AdvisoryBio";
import AdvisoryContact from "@/components/advisory/AdvisoryContact";
import AdvisoryExplanation from "@/components/advisory/AdvisoryExplanation";
import AdvisoryFAQ from "@/components/advisory/AdvisoryFAQ";
import AdvisoryHero from "@/components/advisory/AdvisoryHero";
import AdvisoryPainPoints from "@/components/advisory/AdvisoryPainPoints";
import AdvisoryServices from "@/components/advisory/AdvisoryServices";
import Page from "@/components/layouts/Page";

const AdvisoryPage = async () => {
  return (
    <Page>
      <Container>
        <AdvisoryHero />
        <Divider />
        <AdvisoryPainPoints />
        <section className="my-8">
          <Divider text={"Workshops & Roadmaps"} />
        </section>
        <AdvisoryExplanation />
        <AdvisoryServices />
        <section className="pt-12 lg:pt-16 xl:pt-24 2xl:pt-32">
          <img
            src="https://cdn.timmyomahony.com/timmy-omahony-office-b.jpg"
            alt="Timmy O'Mahony"
          />
        </section>
        <section className="my-16">
          <Divider text={"More about me"} />
        </section>
        <AdvisoryBio />
        <section className="pt-12 lg:pt-16 xl:pt-24 2xl:pt-32">
          <img
            src="https://cdn.timmyomahony.com/timmy-omahony-office-a.jpg"
            alt="Timmy O'Mahony"
          />
        </section>
        <AdvisoryFAQ />
        <AdvisoryContact />
      </Container>
    </Page>
  );
};

export default AdvisoryPage;
