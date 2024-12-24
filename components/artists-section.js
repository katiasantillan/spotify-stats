import { useContext } from "react"
import styles from '../styles/Home.module.css'

import { topContext } from "../store/store-context"

import { useEffect, useState } from "react"
import { trimDataMap } from '../lib/process-data'

import MiniCard from './mini-card'


const ArtistsSection = ({ dataArtists, dataArtistsByTime }) => {
  const { state } = useContext(topContext);
  const { topArtists, sortTimeArtists } = state;

  const [songsByArtist, setSongsByArtist] = useState([]);

  useEffect(() => {
    if(sortTimeArtists) {
      setSongsByArtist(trimDataMap(dataArtistsByTime,topArtists));

    } else {
      setSongsByArtist(trimDataMap(dataArtists,topArtists));
    }
  }, [topArtists, sortTimeArtists]);


  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
          { songsByArtist && songsByArtist.map( (record, idx) => {
            console.log(record)
              let sticker = idx === 0 ? 'sparks.png' : '';
              return (
                <MiniCard
                  key={idx}
                  cardTitle={`${idx+1}. ${record[0]}`}
                  timesPlayed={record[1][1]}
                  timeReproduced={record[1][2]}
                  href={`/artist/${record[0]}`}
                  sticker={sticker}
                />
              )
            })
          }
      </div>
    </div>
  )
};

export default ArtistsSection;