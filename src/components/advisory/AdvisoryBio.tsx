import LinkedIcon from "@/icons/linkedin.svg";
import config from "@/../portfolio.config";

const AdvisoryBio = () => {
  return (
    <section className="mt-18 grid grid-cols-6 md:mt-0">
      <div className="col-start-0 body-1 col-span-6 flex flex-col gap-4 md:col-span-3 md:col-start-3">
        <p>
          I&apos;ve been an independent software developer for over 10 years. In
          that time I&apos;ve built everything from simple marketing websites to
          entire SAAS platforms from scratch, so I&apos;ve got plenty of
          experience coding and building.
        </p>
        <p>
          That said, I started with a degree in computer science, so my
          superpower is problem solving. In short, I&apos;m great at
          understanding ideas, breaking them down into digestible pieces and
          organising those pieces into apps.
        </p>
        <p>
          This means that I love working with business owners at the start of
          their journey, helping them put together the solid foundations of a
          successful software project without wasting money on bloated
          development phases.
        </p>
        <p className="mt-5 xl:mt-10">
          <a
            className="group flex items-center gap-3 text-sm md:text-base"
            href={config.linkedInUrl}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIcon className="w-4 md:w-5" />
            <span className="group-hover:underline">
              Connect with me on LinkedIn
            </span>
          </a>
        </p>
      </div>
    </section>
  );
};

export default AdvisoryBio;
