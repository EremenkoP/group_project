import { useState, useEffect } from 'react';
import { Carousel } from "../../components"
import Preloader from '../../components/Preloader/Preloader';
import ImageComponent from '../../components/ImageComponent/ImageComponent';


export const Main = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [carouselData, setCarouselData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);

    const urls = [
      'https://swapi.dev/api/films/',
      'https://swapi.dev/api/people/',
      'https://swapi.dev/api/planets/',
      'https://swapi.dev/api/species/',
      'https://swapi.dev/api/starships/',
      'https://swapi.dev/api/vehicles/',
    ];

    Promise.all(urls.map(url => fetch(url).then(response => response.json()))).then(data => {

      const filmsData = data[0];
      const peopleData = data[1];
      const planetsData = data[2];
      const speciesData = data[3];
      const starshipsData = data[4];
      const vehiclesData = data[5];

      const films = filmsData.results.slice(0, 3).map((file: any) => ({ ...file, category: 'Film' })) || [];
      const people = peopleData.results.slice(0, 3).map((person: any) => ({ ...person, category: 'Person' })) || [];
      const species = speciesData.results.slice(0, 3).map((specie: any) => ({ ...specie, category: 'Species' })) || [];
      const planets = planetsData.results.slice(0, 3).map((planet: any) => ({ ...planet, category: 'Planet' })) || [];
      const starships = starshipsData.results.slice(0, 3).map((starship: any) => ({ ...starship, category: 'Starship' })) || [];
      const vehicles = vehiclesData.results.slice(0, 3).map((vehicle: any) => ({ ...vehicle, category: 'Vehicle' })) || [];

      const allData = [...films, ...people, ...planets, ...species, ...starships, ...vehicles];
      setCarouselData(allData);
    })
      .catch((err: any) => {
        setError(err.message || 'An error occurred');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <ImageComponent />
      <Preloader loading={loading}>
        <Carousel carouselData={carouselData} />
      </Preloader>
    </section>
  )
}