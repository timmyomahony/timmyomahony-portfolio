"use client";

import cx from "classnames";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

type Props = {
  theme?: string;
  className?: string;
  icon?: any;
  external?: boolean;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: string;
  disabled?: boolean;
};

const Button = ({
  theme = "default",
  className,
  icon,
  external,
  children,
  ...props
}: any) => {
  const defaultClassNames =
    "cursor-pointer border-2 rounded-full py-1 lg:py-2 px-3 lg:px-6 font-mono font-medium text-sm tracking-wide inline-flex justify-center items-center gap-2 transition duration-400 ease-in";

  const themeClassNames = {
    default: "border-black bg-black text-white hover:bg-ruby hover:border-ruby",
  }[theme];

  const classNames = cx(
    className,
    defaultClassNames,
    themeClassNames,
    props.disabled ? "cursor-not-allowed" : "",
  );

  if (external === true) {
    icon = <ArrowTopRightOnSquareIcon />;
  }

  if (props.href) {
    return (
      <Link className={classNames} href={props.href} {...props}>
        {icon && <span className="h-4 w-4">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={classNames} {...props}>
      {icon && <span className="h-4 w-4">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
