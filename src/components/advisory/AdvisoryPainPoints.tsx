const AdvisoryPainPoints = () => {
  return (
    <section className="my-8 flex flex-col gap-12 md:my-12 md:flex-row md:gap-12 lg:my-16 lg:gap-24">
      <div className="w-full md:w-1/2">
        <h2 className="heading-1 2xl:w-2/3">
          Overwhelmed by tech-related questions?
        </h2>
      </div>
      <div className="body-2 w-full md:w-1/2">
        <p className="mb-6 2xl:mb-8">
          Without a technical co-founder it can be overwhelming figuring how
          you&apos;re going to bring your idea to life.
        </p>
        <ul className="mb-6 flex list-disc flex-col gap-1 pl-4 lg:mb-8">
          <li>
            <p>How much is development going to cost?</p>
          </li>
          <li>
            <p>How long will my app take to build? </p>
          </li>
          <li>
            <p>What technologies should I use?</p>
          </li>
          <li>
            <p>Where can I find a quality developer or agency? </p>
          </li>
        </ul>
        <p className="mb-6 lg:mb-8">
          It can be difficult getting straight answers to these questions and
          sometimes you don&apos;t even know what you don&apos;t know.
        </p>
        <p className="mb-6 lg:mb-8">
          The truth is, creating something new and novel is challenging. There
          are countless issues and unknowns ready to pop-up at the worst
          possible moment.
        </p>
        <p className="mb-6 lg:mb-8">
          You wouldn&apos;t build a house without a blueprint, so why take the
          same risk with software?
        </p>
      </div>
    </section>
  );
};

export default AdvisoryPainPoints;
