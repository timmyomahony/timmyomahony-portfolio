/* eslint-disable @next/next/no-img-element */

type Props = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export default function Hero({ title, description, image, alt }: Props) {
  return (
    <header className="flex flex-col items-end justify-between border-b border-b-black pb-8 md:flex-row md:pb-12 lg:pb-16 2xl:pb-20">
      <div className="w-full border-t border-t-black pb-8 pt-8 md:w-6/12 md:pb-0 md:pt-12 lg:pt-16">
        <h1 className="heading-1">{title}</h1>
        <p className="body-1 mt-5 xl:mt-8 2xl:mt-10">{description}</p>
      </div>
      <div className="flex w-full flex-col items-end md:w-5/12 md:items-start md:pb-1 2xl:pb-2">
        <div className="relative">
          <img src={image} alt={alt} />
        </div>
      </div>
    </header>
  );
}
