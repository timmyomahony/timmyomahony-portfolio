"use client";

import { ReactNode } from "react";

import CrossIcon from "@/icons/cross.svg";
import TickIcon from "@/icons/tick.svg";
import Button from "@/components/Button";

type ServiceProps = {
  disabled?: boolean;
  title: string | ReactNode;
  price: string | ReactNode;
  headline: string | ReactNode;
  description: string | ReactNode;
  benefits: Array<string>;
  linkText: string;
  linkOnClick?: () => void;
  className?: string;
};

const Service = ({
  disabled = false,
  title,
  price,
  headline,
  description,
  benefits,
  linkText,
  linkOnClick,
  className = "",
}: ServiceProps) => {
  return (
    <div
      className={`flex flex-col justify-between gap-6 border-[1px] border-black px-6 py-8 md:gap-16 ${
        disabled ? "cursor-not-allowed" : ""
      } ${className}`}
    >
      <header>
        <h3 className="callout-1">{title}</h3>
        <h4 className="mt-3 text-3xl font-medium md:mt-6 md:text-4xl">
          {price}
        </h4>
      </header>
      <div>
        <div className="flex flex-col gap-4 text-base font-medium">
          {headline}
        </div>
        <div className="mt-6 flex flex-col gap-4 text-sm">{description}</div>
        <ul className="mt-6 flex flex-col gap-2 text-sm">
          {benefits.map((benefit, i) => {
            return (
              <li key={i} className="flex items-center gap-4">
                {disabled ? (
                  <CrossIcon className="w-3 text-black" />
                ) : (
                  <TickIcon className="w-3 text-black" />
                )}
                <span>{benefit}</span>
              </li>
            );
          })}
        </ul>
        <Button
          className="mt-6 w-full"
          onClick={linkOnClick}
          disabled={disabled}
        >
          {linkText}
        </Button>
      </div>
    </div>
  );
};

export default Service;
