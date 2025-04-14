import Button from "@/components/Button";
import Callout from "@/components/Callout";
import ClickableHeader from "@/components/ClickableHeader";
import Img from "@/components/Img";
import Video from "@/components/Video";
import slugify from "slugify";

/**
 * Styling Note
 *
 * Instead of using Tailwind as it was intended here, we relegate styles to
 * an external CSS file. The reasoning for this is how MDX renders nested
 * elements. For example when you use a `blockquote`, MDX will render the
 * <Paragraph> component with the <Blockquote> component. This makes nested
 * styling hard.
 */

const Paragraph = ({ children, props }) => {
  return (
    <p className="mdx-paragraph" {...props}>
      {children}
    </p>
  );
};

const Ahref = ({ href, children, ...props }) => {
  return (
    <a className="mdx-a" href={href} {...props}>
      {children}
    </a>
  );
};

const Ul = ({ children }) => {
  return <ul className="mdx-list list-disc">{children}</ul>;
};

const Ol = ({ children }) => {
  return <ol className="mdx-list list-decimal">{children}</ol>;
};

const Li = ({ children }) => {
  return <li className="mdx-list-item">{children}</li>;
};

const H1 = ({ children }) => {
  let slug = slugify(children, { lower: true });
  return (
    <h1 className="mb-4 mt-8 text-3xl font-bold lg:mb-8 lg:mt-14 2xl:mb-10 2xl:mt-20 2xl:text-4xl">
      <ClickableHeader id={slug}>{children}</ClickableHeader>
    </h1>
  );
};

const H2 = ({ children, ...props }) => {
  let slug = slugify(children, { lower: true });
  return (
    <h2 className="mb-4 mt-8 text-2xl font-bold lg:mb-8 lg:mt-14 2xl:mb-10 2xl:mt-20 2xl:text-4xl">
      <ClickableHeader id={slug} className="">
        {children}
      </ClickableHeader>
    </h2>
  );
};

const H3 = ({ children }) => {
  let slug = slugify(children, { lower: true });
  return (
    <h3 className="mb-4 mt-8 text-2xl font-bold lg:mb-8 lg:mt-14 2xl:mb-10 2xl:mt-20 2xl:text-3xl">
      <ClickableHeader id={slug} className="">
        {children}
      </ClickableHeader>
    </h3>
  );
};

const H4 = ({ children }) => {
  let slug = slugify(children, { lower: true });
  return (
    <h4 className="mb-4 mt-8 text-xl font-bold lg:mb-8 lg:mt-14 2xl:mb-10 2xl:mt-20 2xl:text-2xl">
      <ClickableHeader id={slug} className="">
        {children}
      </ClickableHeader>
    </h4>
  );
};

const H5 = ({ children }) => {
  let slug = slugify(children, { lower: true });
  return (
    <h5 className="mb-4 mt-8 text-lg font-bold lg:mb-8 lg:mt-14 2xl:mb-10 2xl:mt-20 2xl:text-xl">
      <ClickableHeader id={slug} className="">
        {children}
      </ClickableHeader>
    </h5>
  );
};

const H6 = ({ children }) => {
  let slug = slugify(children, { lower: true });
  return (
    <h6 className="mb-4 mt-8 text-xl font-bold lg:mb-8 lg:mt-14 2xl:mb-10 2xl:mt-20">
      <ClickableHeader id={slug} className="">
        {children}
      </ClickableHeader>
    </h6>
  );
};

const Em = ({ children }) => {
  return <em>{children}</em>;
};

const Strong = ({ children }) => {
  return <strong>{children}</strong>;
};

const Hr = () => {
  return <hr />;
};

const WrappedButton = ({ children, ...props }) => {
  return (
    <div className="flex">
      <Button {...props}>{children}</Button>
    </div>
  );
};

const Pre = ({ children, ...props }) => {
  return (
    <pre className="mdx-code" {...props}>
      {children}
    </pre>
  );
};

const Blockquote = ({ children, ...props }) => {
  return <blockquote className="mdx-blockquote">{children}</blockquote>;
};

const MDXComponents = {
  hr: Hr,
  p: Paragraph,
  a: Ahref,
  em: Em,
  strong: Strong,
  ol: Ol,
  ul: Ul,
  li: Li,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: Img,
  // We include the image component twice so that we can either use it directly in the
  // markdown or use it as a component (which gives us more control)
  Img,
  pre: Pre,
  blockquote: Blockquote,
  Callout: Callout,
  Video: Video,
  Button: WrappedButton,
};

export default MDXComponents;
