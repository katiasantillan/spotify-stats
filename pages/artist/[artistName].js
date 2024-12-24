import Head from "next/head";
import Link from "next/link";
import { processData } from "../../lib/process-data";
import { useContext } from "react"
import styles from '../../styles/artist-page.module.css';
import TabsBox from "../../components/tabs-box";
import SongList from '../../components/song-list';
import Banner from '../../components/banner'

export async function getStaticProps(staticProps) {

    const params = staticProps.params;
    const { artistsData } = processData(2024);

    const findArtistById = artistsData.get(params.artistName);

    return {
        props: {
            artistData: findArtistById ? findArtistById : {},
            artistName: params.artistName,
        }
    }
}

export async function getStaticPaths() {
    const { artistsData } = processData();

    const keysArr = Array.from( artistsData.keys() );

    const paths = keysArr.map(artist => {
        return {
            params: {
                artistName: artist
            }
        }
    })

    return {
        paths,
        fallback: true,
    }
}

const ArtistPage = (initialProps) => {
    const { artistName, artistData } = initialProps;
    console.log(artistData)
    return (
        <>
            <Head>
                <title>{artistName}</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.backToHomeLink}>
                    <Link href="/">
                        <a>← Regresar</a>
                    </Link>
                </div>
                <Banner
                    title={artistName}
                />
                <TabsBox>
                    <SongList
                        data={artistData[0]}
                    />
                </TabsBox>
            </div>
        </>
    )
};

export default ArtistPage;