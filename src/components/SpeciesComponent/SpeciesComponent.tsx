import { useState, useEffect } from 'react';
import { ISpecies } from '../../services/types/API'
import styles from '../../utils/style/resources_header.module.css'


const SpeciesDetails = () => {
    const [species, setSpecies] = useState<ISpecies | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://swapi.dev/api/species/3/`).then(response => response.json()).then(data => setSpecies(data)).catch(e => {
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

    if (!species) {
        return <div>Species not found.</div>;
    }

    return (
        <div className={styles.container}>
            <h2>{species.name}</h2>
            <p>Classification: {species.classification}</p>
            <p>Designation: {species.designation}</p>
            <p>Average Height: {species.average_height}</p>
            <p>Skin Colors: {species.skin_colors}</p>
            <p>Hair Colors: {species.hair_colors}</p>
            <p>Eye Colors: {species.eye_colors}</p>
            <p>Average Lifespan: {species.average_lifespan}</p>
            <p>Language: {species.language}</p>
        </div>
    );
};

export default SpeciesDetails;