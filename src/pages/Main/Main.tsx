import { Carousel } from "../../components"

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
}

const movies: Movie[] = [
  { id: 1, title: 'Avatar', imageUrl: 'https://i.ytimg.com/vi/MmWRIfRZNz8/maxresdefault.jpg', rating: 7.8 },
  { id: 2, title: 'Лед', imageUrl: 'https://i.ytimg.com/vi/MmWRIfRZNz8/maxresdefault.jpg', rating: 6.9 },
  { id: 3, title: 'Спутник', imageUrl: 'https://i.ytimg.com/vi/MmWRIfRZNz8/maxresdefault.jpg', rating: 6.3 },
  { id: 4, title: 'Little Women', imageUrl: 'https://i.ytimg.com/vi/MmWRIfRZNz8/maxresdefault.jpg', rating: 7.8 },
  { id: 5, title: 'Another Movie', imageUrl: 'https://i.ytimg.com/vi/MmWRIfRZNz8/maxresdefault.jpg', rating: 8.2 },
  { id: 6, title: 'Yet Another Movie', imageUrl: 'https://i.ytimg.com/vi/MmWRIfRZNz8/maxresdefault.jpg', rating: 5.5 },
  { id: 7, title: 'Final Test Movie', imageUrl: 'https://i.ytimg.com/vi/MmWRIfRZNz8/maxresdefault.jpg', rating: 9.1 },
];

export const Main = () => {
  return (
    <section>
      Главная
      <Carousel movies={movies}/>
    </section>
  )
}