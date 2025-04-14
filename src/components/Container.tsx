interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="container">
      <div className="mx-auto w-full">{children}</div>
    </div>
  );
}
