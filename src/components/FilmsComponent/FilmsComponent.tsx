import { useState, useEffect } from 'react';
import { IFilms } from '../../services/types/API'
import styles from '../../utils/style/resources_header.module.css'



const FilmDetails = () => {
    const [films, setFilms] = useState<IFilms | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://swapi.dev/api/films/1/`).then(response => response.json()).then(data => setFilms(data)).catch(e => {
            setError((e).message);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!films) {
        return <div>Film not found.</div>;
    }

    return (
        <div className={styles.container}>
            <h2>{films.title}</h2>
            <p>Episode ID: {films.episode_id}</p>
            <p>Director: {films.director}</p>
            <p>Producer: {films.producer}</p>
            <p>Release Date: {films.release_date}</p>
            <p>Opening Crawl: {films.opening_crawl}</p>
        </div>
    );
};

export default FilmDetails;