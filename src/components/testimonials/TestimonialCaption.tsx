/* eslint-disable @next/next/no-img-element */
import type { MDXEntry } from "@/types";
import Link from "next/link";

type Props = {
  testimonial: MDXEntry;
  className?: string;
};

const TestimonialCaption = ({ testimonial, className = "" }: Props) => {
  return (
    <figcaption className={`${className} callout-0 flex items-center gap-1`}>
      {testimonial.frontmatter.profileImage && (
        <img
          className="mr-3 rounded-full"
          height="40"
          width="40"
          src={testimonial.frontmatter.profileImage}
          alt={`${testimonial.frontmatter.name} profile image`}
        />
      )}
      {testimonial.frontmatter.linkedIn ? (
        <Link
          className="not-italic underline"
          href={testimonial.frontmatter.linkedIn}
          rel="noreferrer"
        >
          {testimonial.frontmatter.name}
        </Link>
      ) : (
        <>{testimonial.frontmatter.name}</>
      )}{" "}
      {testimonial.frontmatter.url && (
        <>
          &mdash;{" "}
          <cite>
            <Link
              className="not-italic hover:underline"
              href={testimonial.frontmatter.url}
              rel="noreferrer"
            >
              {testimonial.frontmatter.company}
            </Link>
          </cite>
        </>
      )}
    </figcaption>
  );
};

export default TestimonialCaption;
