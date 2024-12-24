import { useContext } from "react"
import styles from '../styles/Home.module.css'

import { topContext } from "../store/store-context"
import { useEffect, useState } from "react"

import { trimDataArray } from '../lib/process-data'
import MiniCard from './mini-card'

const SongsSection = ({ dataTracks, dataTracksByTime }) => {

  const { state } = useContext(topContext);
  const { topSongs, sortTimeSongs } = state;
  const [topSongsData, setTopSongsData] = useState([]);

  useEffect(() => {

    if(sortTimeSongs) {
      setTopSongsData(trimDataArray(dataTracksByTime, topSongs));

    } else {
      setTopSongsData(trimDataArray(dataTracks, topSongs));
    }

  }, [topSongs, sortTimeSongs]);


  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
          { topSongsData && topSongsData.map( (record, idx) => {
              let cardTitle = record[0].length > 25 ? `${record[0].slice(0,25)}...` : record[0];
              let sticker = idx === 0 ? 'hearts2.png' : '';
              return (
                <MiniCard
                    key={idx}
                    cardTitle={`${idx+1}. ${cardTitle}`}
                    timesPlayed={record[1][0]}
                    timeReproduced={record[1][1]}
                    artistName={record[1][2]}
                    sticker={sticker}
                />
              )
            })
          }
      </div>
    </div>
  )
}

export default SongsSection;