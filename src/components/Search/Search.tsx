import { FC, SyntheticEvent, useEffect, useState } from "react";
import style from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../../services/API/API";
import { v4 as uuid } from "uuid";

interface ISearchList {
  name: string;
  url: string;
  id: string;
}

export const Search: FC = () => {
  const [searchList, setSearchList] = useState<ISearchList[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const searchHistory = () => {

  }

  useEffect(() => {
    if (searchValue.length === 0) {
      searchHistory();
    }
  }, [searchValue]);

  const searchFunction = async (searchWord: string) => {
    setSearchList([]);  
    const promisses = [];
    promisses.push(Api.getAllFilms(searchWord));
    promisses.push(Api.getAllPeoples(searchWord));
    promisses.push(Api.getAllPlanets(searchWord));
    promisses.push(Api.getAllSpecies(searchWord));
    promisses.push(Api.getAllStarships(searchWord));
    promisses.push(Api.getAllVehicles(searchWord));
    await Promise.allSettled(promisses).then((res) => {
      for (let index = 0; index < res.length; index++) {
        const answer = res[index];
        if (answer.status === "fulfilled") {
          answer.value.results.forEach((el) => {
            setSearchList((prev) => {
              return prev.concat({
                url: el.url,
                name: "name" in el ? el.name : el.title,
                id: uuid(),
              });
            });
          });
        }
      }
    });
  };

  const sumbit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await searchFunction(searchValue);
  };

  return (
    <article>
      <form className={style.form} onSubmit={sumbit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          className={style.input}
        />
        {searchList.map((el) => {
          return <p>el</p>;
        })}
        <button type="submit" className={style.button} onClick={sumbit}>
          <SearchIcon className={style.icon} />
        </button>
      </form>
      <ul>
        {searchList.map((el, index) => {
          return (
            <li key={el.id}>
              <p>{el.name}</p>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
