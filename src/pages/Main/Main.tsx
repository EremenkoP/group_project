import { useState, useEffect } from 'react';
import { Carousel } from "../../components"
import { IPeople, IFilms, IStarships, IVehicles, ISpecies, IPlanet } from '../../services/types/API'
import Preloader from '../../components/Preloader/Preloader';
import ImageComponent from '../../components/ImageComponent/ImageComponent';

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const Main = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [carouselData, setCarouselData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const urls = [
          'https://swapi.dev/api/films/',
          'https://swapi.dev/api/people/',
          'https://swapi.dev/api/planets/',
          'https://swapi.dev/api/species/',
          'https://swapi.dev/api/starships/',
          'https://swapi.dev/api/vehicles/'
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));

        const data = await Promise.all(responses.map(response => response.json()));

        const [
          filmsData,
          peopleData,
          planetsData,
          speciesData,
          starshipsData,
          vehiclesData
        ] = data as [
          ApiResponse<IFilms>,
          ApiResponse<IPeople>,
          ApiResponse<IPlanet>,
          ApiResponse<ISpecies>,
          ApiResponse<IStarships>,
          ApiResponse<IVehicles>
        ];

        const films = filmsData.results.slice(0, 3).map(film => ({ ...film, category: 'Film' }));
        const people = peopleData.results.slice(0, 3).map(person => ({ ...person, category: 'Person' }));
        const planets = planetsData.results.slice(0, 3).map(planet => ({ ...planet, category: 'Planet' }));
        const species = speciesData.results.slice(0, 3).map(specie => ({ ...specie, category: 'Species' }));
        const starships = starshipsData.results.slice(0, 3).map(starship => ({ ...starship, category: 'Starship' }));
        const vehicles = vehiclesData.results.slice(0, 3).map(vehicle => ({ ...vehicle, category: 'Vehicle' }));

        const allData = [...films, ...people, ...planets, ...species, ...starships, ...vehicles];

        setCarouselData(allData);

      } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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