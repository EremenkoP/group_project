import { FC, SyntheticEvent, useEffect, useState } from "react";
import style from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../../services/API/API";
import { v4 as uuid } from "uuid";
import { Link } from "react-router";
import { Typography } from "@mui/material";
import { router } from "../../utils/routes";
import { GROUPS, SEARCH_HISTORY } from "../../utils/const";
import LoopIcon from '@mui/icons-material/Loop';

interface ISearchList {
  name: string;
  url: string;
  id: string;
}

export const Search: FC = () => {
  const [searchList, setSearchList] = useState<ISearchList[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isView, setIsView] = useState<boolean>(false);
  const [isWait, setIsWait] = useState<boolean>(false);

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
      const isInclude =
        temp.filter((item) => item.name === data.name).length === 0;
      if (isInclude) {
        if (temp.length >= 10) {
          temp.splice(9, 1);
          temp.splice(0, 0, data);
          localStorage.setItem(SEARCH_HISTORY, JSON.stringify(temp));
        } else {
          temp.splice(0, 0, data);
          localStorage.setItem(SEARCH_HISTORY, JSON.stringify(temp));
        }
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
    setIsWait(true)
    setSearchList([]);
    const promisses = [];
    promisses.push(Api.getAllFilms(`search=${searchWord}`));
    promisses.push(Api.getAllPeoples(`search=${searchWord}`));
    promisses.push(Api.getAllPlanets(`search=${searchWord}`));
    promisses.push(Api.getAllSpecies(`search=${searchWord}`));
    promisses.push(Api.getAllStarships(`search=${searchWord}`));
    promisses.push(Api.getAllVehicles(`search=${searchWord}`));
    await Promise.allSettled(promisses)
      .then((res) => {
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
      })
      .finally(() => setIsWait(false));
  };

  const sumbit = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    await searchFunction(searchValue);
  };

  const openList = () => {
    setIsView(true);
    document.addEventListener('click', closeList)
  };

  const closeList = () => {
    setIsView(false);
    document.removeEventListener("click", closeList);
  };

  return (
    <article className={style.article} onClick={(event) => {event.stopPropagation()}}>
      <form className={style.form} onSubmit={sumbit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onFocus={openList}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          className={style.input}
        />
        <button type="submit" className={style.button} onClick={sumbit} disabled={isWait}>
          {isWait ? <LoopIcon className={style.icon + ' ' + style.icon_rotate} />  :<SearchIcon className={style.icon} />}
        </button>
      </form>
      <ul
        className={
          style.ul + (isView && searchList.length ? ` ${style.ul_view}` : "")
        }
      >
        {searchList.map((el) => {
          const url = el.url.split("/");
          const group = url[4];
          const id = url[5];
          const route = GROUPS.includes(group)
            ? router.navOneElement(group, id)
            : router.error;
          return (
            <li key={el.id} onClick={() => updateHistory(el)}>
              <Link
                to={{ pathname: route }}
                className={style.link}
                onClick={closeList}
              >
                <Typography>{el.name}</Typography>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
