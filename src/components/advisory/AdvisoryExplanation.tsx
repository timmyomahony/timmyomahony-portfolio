const AdvisoryExplanation = () => {
  return (
    <section className="my-8 flex flex-col gap-24 md:my-12 md:flex-row md:gap-12 lg:my-16 lg:gap-24 2xl:my-24">
      <div className="w-full md:w-1/2 lg:w-1/2">
        <h2 className="heading-1">
          Get expert guidance from an experienced & impartial software
          developer.
        </h2>
        <p className="body-2 mt-6 lg:mt-8">
          With a workshop or roadmap, you&apos;ll be removing as much risk as
          possible from the lengthy and expensive process of building an app,
          all <em>before a line of code is written.</em>
        </p>
        <p className="body-2 mt-6 lg:mt-8">
          Ask questions, braindump, discover assumptions, walk-through technical
          features, uncover unforeseen consequences; by the end of this process
          you should know exactly what you need to do to avoid a development
          disaster.
        </p>
      </div>
    </section>
  );
};

export default AdvisoryExplanation;
