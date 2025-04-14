import type { MDXEntry } from "@/types";
import TestimonialCaption from "@/components/testimonials/TestimonialCaption";

type Props = {
  testimonial: MDXEntry;
};

// When rendering the MDX content, we only need to pass a <p> component
const SimplifiedMDXComponents = {
  p: ({ children, props }) => {
    return (
      <blockquote className="body-1" cite="">
        {children}
      </blockquote>
    );
  },
};

const SmallTestimonial = ({ testimonial }: Props) => {
  const { default: MDXContent } = testimonial;
  return (
    <figure>
      <MDXContent components={SimplifiedMDXComponents} />
      <TestimonialCaption
        testimonial={testimonial}
        className="mt-4 justify-center lg:mt-10 lg:justify-start"
      />
    </figure>
  );
};

export default SmallTestimonial;
