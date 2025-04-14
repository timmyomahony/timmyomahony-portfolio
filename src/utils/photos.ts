import type { Album, Photo } from "@/types";
import { readFromCache, writeToCache } from "@/utils/cache";
import { getS3Keys } from "@/utils/s3";
import ExifReader from "exifreader";
import sizeOf from "image-size";
import { basename } from "path";
import { getPlaiceholder } from "plaiceholder";
import slugify from "slugify";
import getUuid from "uuid-by-string";

const getSimplifiedExif = (exif: any) => {
  return {
    date: (exif["Digital Creation Date"] || {})["description"],
    time: (exif["Digital Creation Time"] || {})["description"],
    title: (exif["title"] || {})["description"],
    description: (exif["description"] || {})["description"],
    fileName: (exif["RawFileName"] || {})["description"],
    cameraMake: (exif["Make"] || {})["description"],
    cameraModel: (exif["Model"] || {})["description"],
    lens: (exif["LensModel"] || {})["value"],
    iso: (exif["ISOSpeedRatings"] || {})["description"],
    aperture: (exif["FNumber"] || {})["description"],
    focalLength: (exif["FocalLength"] || {})["description"],
    shutterSpeed: (exif["ShutterSpeedValue"] || {})["description"],
  };
};

/**
 * Get photos from S3 bucket and cache locally
 *
 * @returns
 */
const getPhotos = async (): Promise<Photo[]> => {
  try {
    let cachedPhotos = await readFromCache("photos");
    if (cachedPhotos && cachedPhotos.length > 0) {
      return cachedPhotos;
    }
  } catch (err) {}

  let photos: Photo[] = [];
  const s3Keys = await getS3Keys();

  // Process all images
  for (let i = 0; i < s3Keys.length; i++) {
    const path = s3Keys[i];
    if (
      (path && !path.endsWith("jpg") && !path.endsWith("jpeg")) ||
      path.includes("Thumbnails")
    ) {
      continue;
    }
    console.log(`Processing photo ${path}`);
    const uuid = getUuid(path);
    const url = encodeURI(`${process.env.AWS_PUBLIC_URL}${path}`);
    const photoFile = await fetch(url, { cache: "no-cache" });
    const buffer = Buffer.from(await photoFile.arrayBuffer());
    const { base64: placeholder } = await getPlaiceholder(buffer);
    const { height = 1, width = 1, type } = await sizeOf(buffer);
    const exif = ExifReader.load(buffer);
    const simplifiedExif = getSimplifiedExif(exif);
    const thumbnail = encodeURI(
      `${process.env.AWS_PUBLIC_URL}${path.replace(
        basename(path),
        `Thumbnails/${basename(path)}`,
      )}`,
    );

    photos.push({
      id: i,
      uuid,
      path,
      height,
      width,
      type,
      url,
      placeholder,
      thumbnail,
      exif: simplifiedExif,
    });
  }

  await writeToCache(photos, "photos");

  return photos;
};

/**
 * Create list of albums from photos and cache locally
 *
 * @returns
 */
const getAlbums = async (): Promise<Album[] | []> => {
  try {
    let cachedAlbums = await readFromCache("albums");
    if (cachedAlbums && cachedAlbums.length > 0) {
      return cachedAlbums;
    }
  } catch (err) {}

  const photos = await getPhotos();
  let albums: Album[] = [];
  const albumsMap: { [key: string]: Album } = {};

  // Sort photos into albums
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const albumMatch = photo.path.match(
      /^photos\/(\d{4}-\d{2}-\d{2}) ([^\/]+)\/([^\/]+)$/,
    );
    if (albumMatch) {
      const date = albumMatch[1];
      const name = albumMatch[2];
      const slug = slugify(name, { lower: true });
      const key = `${date}-${slug}`;
      if (typeof albumsMap[key] === "undefined") {
        let data = {
          id: i,
          date,
          name,
          slug,
          photos: [],
        };
        // Check if any additional data is saved in album folder
        const url = encodeURI(
          `${process.env.AWS_PUBLIC_URL}${date} ${name}/data.json`,
        );
        try {
          const res = await fetch(url, { cache: "no-cache" });
          if (res.status === 200) {
            data = { ...data, ...(await res.json()) };
          }
        } catch (error) {
          console.error(error);
        }
        albumsMap[key] = data;
      }
      albumsMap[key]["photos"].push(photo);
    }
  }

  albums = Object.values(albumsMap).sort((a: Album, b: Album) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1,
  );

  await writeToCache(albums, "albums");

  return albums;
};

export { getAlbums, getPhotos };
