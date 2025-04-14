/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";

const AdvisoryHero = () => {
  return (
    <header className="flex flex-col items-center justify-between py-8 md:flex-row md:py-12 lg:py-16 2xl:py-24">
      <div className="md:order-0 order-1 flex w-full flex-col items-end md:w-4/12 md:items-start md:pb-1 2xl:pb-2">
        <div className="relative">
          <img
            src="https://cdn.timmyomahony.com/timmy-omahony.jpg"
            alt="Timmy O'Mahony profile picture"
          />
          <p className="mt-2 font-mono text-sm">
            Hi, I&apos;m{" "}
            <a
              href="https://timmyomahony.com"
              target="_blank"
              title="Visit my personal homepage"
              className="border-b border-dotted"
            >
              Timmy
            </a>{" "}
            👋
          </p>
        </div>
      </div>
      <div className="order-0 w-full pb-8 pt-8 md:order-1 md:w-7/12 md:pb-0 md:pt-12 lg:pt-0">
        <h1 className="heading-1">
          Are you a business owner, unsure of how to get your app built?
        </h1>
        <p className="body-1 mt-5 xl:mt-4 2xl:mt-10">
          Put a crystal clear plan in place and avoid wasting €1000s on
          ineffecient development. Book a workshop today to get clarity on
          technology, cost and timeline before a line of code gets written.
        </p>
        <div className="mt-5 xl:mt-6 2xl:mt-10">
          <Button href="/#services" className="w-full text-center sm:w-auto">
            Book a workshop
          </Button>
        </div>
        <p className="mt-5 text-xs xl:mt-5 2xl:mt-10">
          Don&apos;t worry, it&apos;s free to book. Have questions?{" "}
          <a
            className="underline"
            href="https://savvycal.com/timmyomahony/intro"
          >
            Book an intro call first
          </a>
        </p>
      </div>
    </header>
  );
};

export default AdvisoryHero;
