import Container from "@/components/Container";
import Page from "@/components/layouts/Page";
import AlbumPhoto from "@/components/photos/AlbumPhoto";
import { getAlbums } from "@/utils/photos";

const PhotoAlbumsPage = async () => {
  const albums = await getAlbums();
  return (
    <Page>
      <Container>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {albums.map((album, i) => {
            return <AlbumPhoto key={i} album={album} />;
          })}
        </div>
      </Container>
    </Page>
  );
};

export default PhotoAlbumsPage;
