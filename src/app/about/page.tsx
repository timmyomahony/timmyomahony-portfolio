/* eslint-disable @next/next/no-img-element */
import Container from "@/components/Container";
import Bio from "@/components/about/Bio";
import Brands from "@/components/about/Brands";
import Hero from "@/components/about/Hero";
import MoreInfo from "@/components/about/MoreInfo";
import Testimonials from "@/components/about/Testimonials";
import Page from "@/components/layouts/Page";

const WorkTogetherPage = async () => {
  return (
    <Page>
      <Container>
        <Hero
          title="The one-man tech team ready to bring your next big idea to life."
          description="I'm Timmy, an independent software developer from Ireland, building apps and online experiences for companies large and small."
          image="https://cdn.timmyomahony.com/timmy-omahony-alt.jpg"
          alt="Timmy O'Mahony profile picture"
        />
        <section className="pt-12 lg:pt-16 xl:pt-20">
          <MoreInfo />
        </section>
        <section className="pt-12 lg:pt-16 xl:pt-20 2xl:pt-24">
          <Testimonials />
        </section>
        <section className="pt-12 lg:pt-16 xl:pt-32 2xl:pt-48">
          <img
            src="https://cdn.timmyomahony.com/timmy-omahony-office-a.jpg"
            alt="Timmy O'Mahony"
          />
        </section>
        <section className="pt-12 lg:pt-20 xl:pt-24 2xl:pt-32">
          <Brands
            title="Check out some of the brands that I've worked with."
            items={[
              "Heineken",
              "Facebook",
              "Coca Cola",
              "AIB",
              "Laya Healthcare",
              "Kelloggs",
              "Lidl",
              "Paddy Power",
              "PTSB",
              "RTE",
              "VHI",
              "Carlsberg",
              "Heinz",
              "Guinness",
              "ESB",
            ]}
          />
        </section>
        <section className="pt-16 xl:pt-24 2xl:pt-32">
          <img
            src="https://cdn.timmyomahony.com/timmy-omahony-office-b.jpg"
            alt="Timmy O'Mahony"
          />
        </section>
        <section className="pt-16 xl:pt-24 2xl:pt-32">
          <Bio />
        </section>
      </Container>
    </Page>
  );
};

export default WorkTogetherPage;
