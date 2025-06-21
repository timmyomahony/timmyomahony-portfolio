// Warning: These are automatically injected into a <p>
const Img = ({ src, type = "video/mp4", title, ...attrs }) => {
  return (
    <span className="mb-8 mt-8 block lg:mb-14 lg:mt-14 2xl:mb-16 2xl:mt-16">
      <video {...attrs}>
        <source src={src} type={type} />
      </video>
      {title && (
        <span className="mt-3 block w-full font-overpass text-xs font-light text-gray-400">
          {title}
        </span>
      )}
    </span>
  );
};

export default Img;
