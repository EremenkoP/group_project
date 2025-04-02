import { useEffect, useState } from "react";
import Api from "../../services/API/API";
import { ISpecies } from "../../services/types";
import { CardList } from "../../components";

export const Species = () => {
  const [data, setData] = useState<Array<ISpecies>>([]);

  const getData = async (query?: string) => {
    await Api.getAllSpecies(query).then((res) => {
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
