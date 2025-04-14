/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { getPhotos } from "@/utils/photos";
import { Exif, ExifKeys } from "@/types";
import Container from "@/components/Container";
import Page from "@/components/layouts/Page";

const Attrs = ({ exif }: { exif: Exif }) => {
  let attrs: [string, ExifKeys][] = [
    ["Date", "date"],
    ["Time", "time"],
    ["Camera Make", "cameraMake"],
    ["Camera Model", "cameraModel"],
    ["Lens", "lens"],
    ["Aperture", "aperture"],
    ["Focal Length", "focalLength"],
    ["Shutter Speed", "shutterSpeed"],
    ["ISO", "iso"],
  ];

  return (
    <div>
      <dl>
        {attrs.map(([label, attr], i) => {
          if (!(attr in exif)) {
            return <></>;
          }
          return (
            <div
              key={i}
              id={`#{attr}`}
              className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt className="text-sm font-medium leading-6">{label}</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                {exif[attr]}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

type Params = Promise<{
  slug: string;
}>;

type Props = {
  params: Params;
};

const PhotoPage = async ({ params }: Props) => {
  const { slug } = await params;
  const photo = (await getPhotos()).find((photo) => photo.uuid === slug);

  if (!photo) {
    return <></>;
  }

  return (
    <Page>
      <Container>
        <section>
          <div className="flex h-[85vh] w-full items-center justify-center bg-gray-100">
            <img
              src={photo.url}
              className="h-auto max-h-full w-auto max-w-full"
              alt={photo?.exif?.title || photo?.exif?.description || ""}
            />
          </div>
          <div className="mt-12 flex w-full gap-8">
            <div className="w-1/2">
              <h1 className="mb-2 text-xl font-medium">{photo?.exif?.title}</h1>
              <p className="text-md">{photo?.exif?.description}</p>
            </div>
            <div className="w-1/2">
              {photo.exif && <Attrs exif={photo.exif} />}
            </div>
          </div>
        </section>
      </Container>
    </Page>
  );
};

const generateStaticParams = async () => {
  return (await getPhotos()).map((photo) => ({ slug: photo.uuid }));
};

const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const photo = (await getPhotos()).find((photo) => photo.uuid === slug);
  return {
    title:
      photo?.exif?.title ||
      photo?.exif?.description ||
      photo?.exif?.fileName ||
      "Photo",
    description: photo?.exif?.description || "A photo by Timmy O'Mahony",
    openGraph: {
      images: [
        {
          url: photo?.thumbnail,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

export { generateMetadata, generateStaticParams };

export default PhotoPage;
