import { useState, useEffect } from 'react';
import { IStarships } from '../../services/types/API'
import styles from '../../utils/style/resources_header.module.css'


const StarshipsDetails = () => {
    const [starship, setStarship] = useState<IStarships | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://swapi.dev/api/starships/2/`).then(response => response.json()).then(data => setStarship(data)).catch(e => {
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

    if (!starship) {
        return <div>Starship not found.</div>;
    }

    return (
        <div className={styles.container}>
            <h2>{starship.name}</h2>
            <p>Model: {starship.model}</p>
            <p>Manufacturer: {starship.manufacturer}</p>
            <p>Cost in Credits: {starship.cost_in_credits}</p>
            <p>Length: {starship.length}</p>
            <p>Crew: {starship.crew}</p>
            <p>Passengers: {starship.passengers}</p>
        </div>
    );
};

export default StarshipsDetails;