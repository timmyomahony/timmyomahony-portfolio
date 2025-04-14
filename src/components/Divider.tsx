interface Props {
  text?: string;
}

const Divider = ({ text }: Props) => {
  return (
    <div className="relative flex flex-col items-start">
      <hr className="h-[1px] w-full border-none bg-black" />
      {text && (
        <div className="relative w-auto bg-black px-3 pb-3 pt-2 font-mono text-xs tracking-wide text-white md:px-5 md:text-sm">
          {text}
        </div>
      )}
    </div>
  );
};

export default Divider;
