import TestimonialCaption from "@/components/testimonials/TestimonialCaption";
import type { MDXEntry } from "@/types";

type Props = {
  testimonial: MDXEntry;
};

// When rendering the MDX content, we only need to pass a <p> component
const SimplifiedMDXComponents = {
  p: ({ children, props }) => {
    return (
      <blockquote className="heading-2" cite="">
        {children}
      </blockquote>
    );
  },
};

const LargeTestmonial = ({ testimonial }: Props) => {
  const { default: MDXContent } = testimonial;
  return (
    <figure className="mx-auto flex w-full flex-col justify-center text-center lg:w-10/12 xl:w-3/4">
      <MDXContent components={SimplifiedMDXComponents} />
      <TestimonialCaption
        testimonial={testimonial}
        className="mt-4 justify-center lg:mt-8 xl:mt-12 2xl:mt-20"
      />
    </figure>
  );
};

export default LargeTestmonial;
