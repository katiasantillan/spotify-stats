import Image from 'next/image';
import Link from 'next/link';
import styles from './mini-card.module.css';

const MiniCard = (props) => {

    const { cardTitle, artistName, timesPlayed, timeReproduced, href, sticker }
        = props;

    const minutesPlayed = ((timeReproduced/1000)/60);
    const totalTimePlayed = minutesPlayed > 59 ? `${(minutesPlayed/60).toFixed(2)} horas` : `${minutesPlayed.toFixed(2)} minutos`;
    const hrefDef = href ? href : "#";

    return (
        <Link href={hrefDef} passHref>
            <div className={styles.glassCard}>
                { sticker &&
                    <div className={styles.cardSticker}>
                        <Image
                            src={`/static/icons/${sticker}`}
                            width={50}
                            height={50}
                            alt="Sticker favorite"
                        />
                    </div>
                }
                <div className={styles.cardTitle}>{cardTitle}</div>
                <div className={styles.cardInformation}>
                    {artistName &&
                        <div className={styles.informationElement}>
                            <Image
                                src={`/static/icons/micro.png`}
                                width={20}
                                height={20}
                                alt="Sticker replay"
                            />
                            <span className={styles.infoText}>{artistName}</span>
                        </div>
                    }

                    <div className={styles.informationElement}>
                        <Image
                            src={`/static/icons/refresh.png`}
                            width={20}
                            height={20}
                            alt="Sticker replay"
                        />
                        <span className={styles.infoText}>{timesPlayed}</span>
                    </div>
                    <div className={styles.informationElement}>
                        <Image
                            src={`/static/icons/clock.png`}
                            width={20}
                            height={20}
                            alt="Sticker replay"
                        />
                        <span className={styles.infoText}>{totalTimePlayed}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MiniCard;