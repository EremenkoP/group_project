import { useEffect, useState } from "react";
import Api from "../../services/API/API";
import { IStarships } from "../../services/types";
import { CardList } from "../../components";

export const Starships = () => {
  const [data, setData] = useState<Array<IStarships>>([]);

  const getData = async (query?: string) => {
    await Api.getAllStarships(query).then((res) => {
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
