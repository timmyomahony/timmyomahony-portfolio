import LinkedIcon from "@/icons/linkedin.svg";
import BlueskyIcon from "@/icons/bluesky.svg";
import GithubIcon from "@/icons/github.svg";
import config from "@/../portfolio.config";

const SocialButtons = () => {
  return (
    <ul className="mt-8 flex gap-3 2xl:mt-12 2xl:gap-4">
      <li className="h-4 w-4 lg:h-5 lg:w-5 2xl:h-6 2xl:w-6">
        <a
          href={config.linkedInUrl}
          title="Connect on LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIcon aria-label="LinkedIn icon" />
        </a>
      </li>
      <li className="h-4 w-4 lg:h-5 lg:w-5 2xl:h-6 2xl:w-6">
        <a
          href={config.blueskyUrl}
          title="Follow me on Bluesky"
          target="_blank"
          rel="noreferrer"
        >
          <BlueskyIcon aria-label="Bluesky icon" />
        </a>
      </li>
      <li className="h-4 w-4 lg:h-5 lg:w-5 2xl:h-6 2xl:w-6">
        <a
          href={config.githubUrl}
          title="Check out my Github profile"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon aria-label="Github icon" />
        </a>
      </li>
    </ul>
  );
};

export default SocialButtons;
