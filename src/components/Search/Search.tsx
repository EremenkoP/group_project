import { FC, SyntheticEvent, useEffect, useState } from "react";
import style from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../../services/API/API";
import { v4 as uuid } from "uuid";
import { Link } from "react-router";
import { Typography } from "@mui/material";
import { router } from "../../utils/routes";
import { GROUPS, SEARCH_HISTORY } from "../../utils/const";

interface ISearchList {
  name: string;
  url: string;
  id: string;
}

export const Search: FC = () => {
  const [searchList, setSearchList] = useState<ISearchList[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isView, setIsView] = useState<boolean>(false);

  const searchHistory = () => {
    const history = localStorage.getItem(SEARCH_HISTORY);
    if (history) {
      const temp: ISearchList[] = JSON.parse(history);
      setSearchList(temp);
    }
  };

  const updateHistory = (data: ISearchList) => {
    const history = localStorage.getItem(SEARCH_HISTORY);
    if (history) {
      const temp: ISearchList[] = JSON.parse(history);
      if (temp.length >= 10) {
      } else {
        temp.splice(9, 1);
        temp.splice(0, 0, data);
        localStorage.setItem(SEARCH_HISTORY, JSON.stringify(temp));
      }
    } else {
      localStorage.setItem(SEARCH_HISTORY, JSON.stringify([data]));
    }
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      searchHistory();
    }
  }, [searchValue]);

  const searchFunction = async (searchWord: string) => {
    setSearchList([]);
    const promisses = [];
    promisses.push(Api.getAllFilms(`search=${searchWord}`));
    promisses.push(Api.getAllPeoples(`search=${searchWord}`));
    promisses.push(Api.getAllPlanets(`search=${searchWord}`));
    promisses.push(Api.getAllSpecies(`search=${searchWord}`));
    promisses.push(Api.getAllStarships(`search=${searchWord}`));
    promisses.push(Api.getAllVehicles(`search=${searchWord}`));
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
    <article className={style.article} onBlur={() => setIsView(false)}>
      <form className={style.form} onSubmit={sumbit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onFocus={() => setIsView(true)}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          className={style.input}
        />
        <button type="submit" className={style.button} onClick={sumbit}>
          <SearchIcon className={style.icon} />
        </button>
      </form>
      <ul
        className={
          style.ul + (isView && searchList.length ? ` ${style.ul_view}` : "")
        }
      >
        {searchList.map((el) => {
          const url = el.url.split('/')
          const group = url[4]
          const id = url[5];
          const route = group in GROUPS ? router.navOneElement(group, id) : '/*'
          return (
            <li key={el.id} onClick={() => updateHistory(el)}>
              <Link to={{ pathname: route }} className={style.link}>
                <Typography>{el.name}</Typography>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
