"use client";

import React, { ReactElement, useEffect, useState } from "react";

const faqs = [
  {
    question: "How does booking and payment work?",
    answer: (
      <div>
        <p>
          For <strong>workshops</strong> you can{" "}
          <a
            className="underline"
            href="https://savvycal.com/timmyomahony/workshop"
          >
            directly book a 2 hour timeslot
          </a>{" "}
          that suits your schedule. Once you&apos;re booked in, I&apos;ll send
          on a private Stripe link where you can make payment before the call.
        </p>
        <p>
          Because I have a limited availability for <strong>roadmaps</strong>,
          it&apos;s best to first{" "}
          <a
            className="underline"
            href="https://savvycal.com/timmyomahony/intro"
          >
            book a free intro call
          </a>{" "}
          to discuss timelines. If everything lines up, I&apos;ll send on a
          private Stripe link where you can make payment. We&apos;ll then
          arrange our first workshop to kick things off.
        </p>
      </div>
    ),
  },
  {
    question: "I'd rather not share the details of my business.",
    answer: (
      <div>
        <p>
          For any intro calls or other initial conversations, that&apos;s no
          problem, we can work around it. When it comes to a workshop or roadmap
          though we&apos;re going to need to get into the details.
        </p>
        <p>
          Rest assured that I&apos;ve worked with many other companies and
          individuals before in the strictest of confidence, so your secrets are
          safe with me.
        </p>
      </div>
    ),
  },
  {
    question: "Who does the actual development & coding?",
    answer: (
      <div>
        <p>
          Normally, actual development & coding will be done by a separate
          developer or development agency.
        </p>
        <p>
          One of the benefits of working together is that I can help suggest
          trusted developers that are the right for you.
        </p>
      </div>
    ),
  },
  {
    question: "I've already got an existing app. Can you help?",
    answer: (
      <div>
        <p>
          Yes absolutely, if you&apos;ve already had something developed, but
          things have gone off the rails, I&apos;d love to help get things back
          on track.
        </p>
        <p>
          Whether it&apos;s a workshop, roadmap or other strategy call required,
          the best thing to do is{" "}
          <a
            className="underline"
            href="https://savvycal.com/timmyomahony/intro"
          >
            book a free intro call
          </a>{" "}
          to figure out the next steps.
        </p>
      </div>
    ),
  },
];

const AdvisoryFAQ = () => {
  const [activeItem, setActiveItem] = useState<number>();

  const faqClicked = (i) => {
    if (i === activeItem) {
      setActiveItem(undefined);
    } else {
      setActiveItem(i);
    }
  };

  useEffect(() => {
    let fragment = "";
    if (typeof window !== "undefined") {
      fragment = window.location.hash;

      if (fragment.length > 0) {
        let matchingFaq = faqs.find((faq, i) => {
          return fragment === `#faq-${i}`;
        });
        if (matchingFaq) {
          setActiveItem(faqs.indexOf(matchingFaq));
        }
      }
    }
  }, []);

  return (
    <section className="pb-8 pt-12 md:pb-12 lg:pb-16 lg:pt-16 2xl:pb-24 2xl:pt-32">
      <h2 className="heading-1">Have some questions?</h2>
      <ul className="mt-6 border-t-[1px] border-black text-lg md:mt-12">
        {faqs.map((faq, i) => {
          return (
            <li
              id={`faq-${i}`}
              key={i}
              className="border-b-[1px] border-black py-4 sm:px-4 sm:py-6 md:py-8"
            >
              <h3
                className={`flex cursor-pointer text-sm sm:items-center md:text-lg ${
                  i === activeItem ? "font-medium" : ""
                }`}
              >
                <svg
                  className={`mr-4 hidden h-auto w-6 text-black transition-all duration-500 ease-in-out sm:block ${
                    i === activeItem ? "rotate-0" : "-rotate-90"
                  }`}
                  enableBackground="new 0 0 512 512"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m396.6 160 19.4 20.7-160 171.3-160-171.3 19.3-20.7 140.7 150.5z"
                    fill="currentColor"
                  />
                </svg>
                <span onClick={() => faqClicked(i)}>{faq.question}</span>
                {i === activeItem && (
                  <a
                    className="ml-2 hidden cursor-pointer font-medium text-zinc-600 sm:inline"
                    href={`#faq-${i}`}
                    title="Click for a permalink to this FAQ"
                  >
                    #
                  </a>
                )}
              </h3>
              <div
                className={`type-2 prose-sm relative mt-8 w-full lg:prose-lg sm:ml-10 sm:w-2/3 md:mt-10 lg:mt-12 ${
                  i === activeItem ? "block" : "hidden"
                }`}
              >
                {faq.answer}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-start text-xs md:text-end">
        Have a question that&apos;s not covered here?{" "}
        <a href="mailto:hey@timmyomahony.com" className="text-ruby underline">
          Send me an email
        </a>
      </p>
    </section>
  );
};

export default AdvisoryFAQ;
