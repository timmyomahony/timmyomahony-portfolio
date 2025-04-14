"use client";

import type { Album } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";

const AlbumHeader = ({ album }: { album: Album }) => {
  return (
    <header
      className={`flex flex-col gap-6 border-y border-y-black py-8 md:py-12 lg:gap-4 lg:py-16 2xl:py-20`}
    >
      <motion.h3
        className="callout-1"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
      >
        <Link className="hover:underline" href="/photos/albums/">
          Photo
        </Link>{" "}
        /{" "}
        <Link className="hover:underline" href="/photos/albums/">
          Albums
        </Link>
      </motion.h3>
      <motion.h2
        className="heading-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
      >
        {album.name}
      </motion.h2>
      {album.description && (
        <motion.p
          className="w-full lg:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 },
          }}
        >
          {album.description}
        </motion.p>
      )}
    </header>
  );
};

export default AlbumHeader;
