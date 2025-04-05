import { useState, useEffect } from 'react';
import { IVehicles } from '../../services/types/API'
import styles from '../../utils/style/resources_header.module.css'


const VehiclesDetails = () => {
    const [vehicle, setVehicle] = useState<IVehicles | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://swapi.dev/api/vehicles/4/`).then(response => response.json()).then(data => setVehicle(data)).catch(e => {
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

    if (!vehicle) {
        return <div>Vehicle not found.</div>;
    }

    return (
        <div className={styles.container}>
            <h2>{vehicle.name}</h2>
            <p>Model: {vehicle.model}</p>
            <p>Manufacturer: {vehicle.manufacturer}</p>
            <p>Cost in Credits: {vehicle.cost_in_credits}</p>
            <p>Length: {vehicle.length}</p>
            <p>Crew: {vehicle.crew}</p>
            <p>Passengers: {vehicle.passengers}</p>
            <p>Vehicle Class: {vehicle.vehicle_class}</p>
        </div>
    );
};

export default VehiclesDetails;