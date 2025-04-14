const EntryContent = ({ children, ...props }) => {
  return (
    <main className="break-words" {...props}>
      {children}
    </main>
  );
};

export default EntryContent;
