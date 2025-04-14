import Container from "@/components/Container";
import Page from "@/components/layouts/Page";
import AlbumHeader from "@/components/photos/AlbumHeader";
import Gallery from "@/components/photos/Gallery";
import { Album } from "@/types";
import { getAlbums } from "@/utils/photos";

type Params = Promise<{
  slug: string;
}>;

type Props = {
  params: Params;
};

const AlbumPage = async ({ params }: Props) => {
  const albums = await getAlbums();
  const { slug } = await params;
  const album = albums.find((album: Album) => album.slug === slug);

  if (!album) {
    return <></>;
  }

  return (
    <Page>
      <Container>
        <section className="flex flex-col gap-20">
          <AlbumHeader album={album} />
          <Gallery photos={album.photos} />
        </section>
      </Container>
    </Page>
  );
};

const generateStaticParams = async () => {
  const albums = await getAlbums();
  return albums.map((album: Album) => ({ slug: album.slug }));
};

const generateMetadata = async ({ params }: Props) => {
  const albums = await getAlbums();
  const { slug } = await params;
  const album = albums.find((album: Album) => album.slug === slug);
  return {
    title: album?.name || "Photo album",
    description: album?.description || "A photo album by Timmy O'Mahony",
    openGraph: {
      images: [
        {
          url: album?.photos[0]?.thumbnail,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

export { generateMetadata, generateStaticParams };

export default AlbumPage;
