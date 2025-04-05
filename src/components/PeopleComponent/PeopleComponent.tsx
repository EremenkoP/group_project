import { useState, useEffect } from 'react';
import { IPeople } from '../../services/types/API'
import styles from '../../utils/style/resources_header.module.css'


const PersonDetails = () => {
    const [person, setPerson] = useState<IPeople | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://swapi.dev/api/people/1/`).then(response => response.json()).then(data => setPerson(data)).catch(e => {
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

    if (!person) {
        return <div>Person not found.</div>;
    }

    return (
        <div className={styles.container}>
            <h2>{person.name}</h2>
            <p>Birth Year: {person.birth_year}</p>
            <p>Eye Color: {person.eye_color}</p>
            <p>Gender: {person.gender}</p>
            <p>Hair Color: {person.hair_color}</p>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Skin Color: {person.skin_color}</p>
        </div>
    );
};

export default PersonDetails;