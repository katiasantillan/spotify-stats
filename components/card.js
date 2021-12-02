import cls from 'classnames';

import styles from './card.module.css';

const Card = (props) => {
    console.log("hola")
    const data = props.dataRecords;

    return (
        <div className={styles.glassCard}>
            <ul>

            </ul>

        </div>
    );
};

export default Card;