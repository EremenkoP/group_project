import styles from "./Preloader.module.css";

interface PreloaderProps {
    children?: any;
    loading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ children, loading }) => {
    return (
        <div>
            {loading ? (
                <div className={styles.preloader}>
                    <div className={styles.spinner}></div>
                </div>
            ) : (
                children
            )}
        </div>
    );
}

export default Preloader;