import { FC, useEffect, useState } from "react";
import style from "./Search.module.scss";
import SearchIcon from '@mui/icons-material/Search';

export const Search: FC = () => {
  const [searchList, setSearchList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length >= 2) {
      console.log(123);
    }
  }, [searchValue])

  return (
    <form className={style.form}>
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
      <button type='submit' className={style.button}>
        <SearchIcon className={style.icon}/>
      </button>
    </form>
  );
};
