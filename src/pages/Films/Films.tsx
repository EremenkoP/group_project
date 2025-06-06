import { useEffect, useState } from "react";
import Api from "../../services/API/API";
import { IFilms } from "../../services/types";
import { CardList } from "../../components";

export const Films = () => {
  const [data, setData] = useState<Array<IFilms>>([]);

  const getData = async (query?: string) => {
    await Api.getAllFilms(query).then((res) => {
      setData((prev) => {
        return prev.concat(res.results);
      });
      if (res.next !== null) {
        const index = res.next.indexOf("?");
        if (index !== -1) {
          getData(res.next.slice(index + 1));
        }
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return <CardList data={data} />;
};
