import LargeTestmonial from "@/components/testimonials/LargeTestimonial";
import SmallTestimonial from "@/components/testimonials/SmallTestimonial";
import { MDXEntry } from "@/types";
import { getEntries } from "@/utils/entries";

export default async function Testimonials() {
  const testimonials = (await getEntries("testimonials")).sort(
    (testimonialA: MDXEntry, testimonialB: MDXEntry) =>
      (testimonialA.frontmatter.ordering || 0) <=
      (testimonialB.frontmatter.ordering || 0)
        ? -1
        : 1,
  );

  const first: MDXEntry = testimonials[0];
  const last: MDXEntry = testimonials[testimonials.length - 1];
  const middle: MDXEntry[] = testimonials.slice(1, testimonials.length - 1);

  return (
    <section className="flex flex-col gap-12 border-t border-t-black pt-12 md:pt-24 lg:gap-16 lg:pt-28 xl:gap-24 2xl:gap-32 2xl:pt-44">
      {first && <LargeTestmonial testimonial={first} />}
      <div className="flex flex-col gap-12 text-center lg:flex-row lg:gap-24 lg:text-left">
        {middle.map((testimonial, i) => {
          return (
            <div key={i} className="mx-auto w-full md:w-3/4 lg:w-1/2">
              <SmallTestimonial testimonial={testimonial} />
            </div>
          );
        })}
      </div>
      {last && <LargeTestmonial testimonial={last} />}
    </section>
  );
}
