"use client";

import CustomSliderImage from "@/components/photos/CustomSliderImage";
import MasonryGrid from "@/components/photos/MasonryGrid";
import CloseIcon from "@/icons/close.svg";
import ExternalLinkIcon from "@/icons/external-link.svg";
import LeftArrowIcon from "@/icons/left-arrow.svg";
import type { Photo } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IconButton,
  Lightbox,
  useLightboxState,
} from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

declare module "yet-another-react-lightbox" {
  interface Labels {
    "View photo"?: string;
  }
}

const ExternalLinkButton = () => {
  const router = useRouter();
  const { currentSlide } = useLightboxState();
  return (
    <IconButton
      onClick={() => {
        if (currentSlide) {
          //@ts-ignore
          router.push(`/photos/photo/${currentSlide.uuid}/`);
        }
      }}
      label="View photo"
      icon={ExternalLinkIcon}
      disabled={!currentSlide}
    />
  );
};

const Gallery = ({ photos }: { photos: Photo[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  return (
    <section>
      <MasonryGrid
        photos={photos}
        onClick={(photo: Photo) => {
          if (typeof photo.ordering !== "undefined") {
            setIndex(photo.ordering);
            setOpen(true);
          }
        }}
      />
      <Lightbox
        index={index}
        styles={{
          root: { "--yarl__color_backdrop": "rgba(255, 255, 255, .9)" },
        }}
        open={open}
        plugins={[Captions]}
        toolbar={{
          buttons: [<ExternalLinkButton key="external-link-button" />, "close"],
        }}
        close={() => setOpen(false)}
        slides={photos.map((photo) => {
          return {
            src: photo.url,
            uuid: photo.uuid,
            height: photo.height,
            width: photo.width,
            title: photo?.exif?.title,
            blurDataURL: photo.placeholder,
            description: photo?.exif?.description,
          };
        })}
        render={{
          slide: CustomSliderImage,
          iconPrev: () => (
            <LeftArrowIcon className="yarl__icon transition-all duration-200 ease-linear hover:-translate-y-1" />
          ),
          iconNext: () => (
            <LeftArrowIcon className="yarl__icon rotate-180 transition-all duration-200 ease-linear hover:-translate-y-1" />
          ),
          iconClose: () => (
            <CloseIcon className="yarl__icon w-5 transition-all duration-200 ease-linear hover:-translate-y-1" />
          ),
        }}
      />
    </section>
  );
};

export default Gallery;
