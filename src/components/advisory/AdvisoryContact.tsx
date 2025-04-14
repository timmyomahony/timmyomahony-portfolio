import Button from "@/components/Button";

const AdvisoryContact = () => {
  return (
    <section className="mb-16 flex flex-col">
      <h1 className="heading-1 w-full pt-8 md:pt-12">Need to think it over?</h1>
      <div className="mt-5 flex flex-col gap-6 md:mt-12 md:flex-row md:gap-32">
        <div className="w-full md:w-1/2">
          <p className="text-base md:text-lg xl:text-xl">
            If you&apos;re not quite ready to pull the trigger and book a
            workshop or roadmap not to worry! I&apos;m more than happy to have
            an intro call to answer any lingering questions.
          </p>
          <div className="mt-5 xl:mt-10">
            <Button href="https://savvycal.com/timmyomahony/intro">
              Schedule a free intro call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisoryContact;
