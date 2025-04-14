type Props = {
  title: string;
  items: string[];
};

export default function Brands({ title, items }: Props) {
  return (
    <div className="border-t border-t-black pt-12 md:pt-24 lg:pt-28 2xl:pt-44">
      <h2 className="heading-1 w-full lg:w-7/12">{title}</h2>
      <ul className="grid grid-flow-row grid-cols-2 gap-y-4 pt-12 text-lg leading-none md:grid-cols-3 md:gap-y-4 md:text-xl lg:grid-cols-5 lg:gap-y-8 lg:pt-24 xl:gap-y-10 xl:text-2xl 2xl:pt-32 2xl:text-3xl">
        {items.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
