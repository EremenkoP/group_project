import { useState, useEffect } from 'react';
import { IPlanet } from '../../services/types/API'
import styles from '../../utils/style/resources_header.module.css'


const PlanetDetails = () => {
    const [planet, setPlanet] = useState<IPlanet | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://swapi.dev/api/planets/1/`).then(response => response.json()).then(data => setPlanet(data)).catch(e => {
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

    if (!planet) {
        return <div>Planet not found.</div>;
    }

    return (
        <div className={styles.container}>
            <h2>{planet.name}</h2>
            <p>Rotation Period: {planet.rotation_period}</p>
            <p>Orbital Period: {planet.orbital_period}</p>
            <p>Diameter: {planet.diameter}</p>
            <p>Climate: {planet.climate}</p>
            <p>Gravity: {planet.gravity}</p>
            <p>Terrain: {planet.terrain}</p>
            <p>Surface Water: {planet.surface_water}</p>
            <p>Population: {planet.population}</p>
        </div>
    );
};

export default PlanetDetails;