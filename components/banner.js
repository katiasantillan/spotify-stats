import styles from './banner.module.css';

const Banner = (props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{props.title}&nbsp; &#10024;&#127908;</h1>
        </div>
    );
};

export default Banner;