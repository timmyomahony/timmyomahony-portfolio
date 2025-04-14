import Link from "next/link";

export default function MoreInfo() {
  return (
    <section className="lg:gap-18 flex flex-col gap-6 lg:flex-row">
      <div className="w-full lg:w-1/2">
        <p className="body-1 mb-6 2xl:mb-8">
          For over 10 years I&apos;ve been helping founders & business owners
          build the technology powering their organisations. I&apos;ve developed
          everything from simple marketing websites to entire SAAS platforms and{" "}
          <Link className="underline" href="/work">
            everything in between
          </Link>
          .
        </p>
        <p className="body-1">
          With a background in computer science, I&apos;m a problem solver at
          heart and love taking on complex and challenging projects. I&apos;m
          great at quickly getting up to speed and breaking down tricky business
          requirements for industry-specific systems.
        </p>
      </div>
      <div className="w-full lg:w-1/2">
        <p className="body-1 mb-6 2xl:mb-8">
          As a <em>full-stack</em> developer, I&apos;m a one-stop-shop, able to
          take ideas from conception to completion, handling the entire process
          from start to finish.
        </p>
        <p className="body-1">
          So whether you&apos;re a non-technical founder building your first app
          or an established enterprise with an existing tech team, I&apos;m
          ready to jump in and help you get your next big idea off the ground.
          <br />
          <br />
          Want to chat more →{" "}
          <Link className="underline" href="mailto:hey@timmyomahony.com">
            Send me an email
          </Link>
        </p>
      </div>
    </section>
  );
}
