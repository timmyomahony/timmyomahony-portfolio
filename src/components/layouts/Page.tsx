import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import cx from "classnames";

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => {
  return (
    <div className="h-full bg-beige transition-all duration-1000 ease-in-out">
      {/* Always have the footer 'below the fold' */}
      <div className="min-h-full pb-4 md:pb-12">
        <Nav />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
