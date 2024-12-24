import Image from 'next/image'
import styles from './song-list.module.css';

const SongList = ({ data, top }) => {
    const dataTop = data.slice(0, top);
    return (
        <div className={styles.container}>
            <ol className={styles.songsList}>
                { dataTop.map((song, idx) => {
                    const sticker = idx === 0 ? 'trophy2.png' : '';
                    return (
                        <li key={idx} className={styles.liElement}>
                            { sticker &&
                                <span className={styles.sticker}>
                                    <Image
                                        src={`/static/icons/${sticker}`}
                                        width={23}
                                        height={23}
                                        alt="Sticker favorite"
                                    />
                                </span>
                            }
                            <span className={styles.songTitle}>
                            {idx+1}. {song[0]}
                            </span>
                            <span className={styles.numberTimes}>
                                {song[1]}
                            </span>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default SongList;