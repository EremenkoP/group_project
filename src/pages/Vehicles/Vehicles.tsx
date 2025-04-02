import { useEffect, useState } from "react";
import Api from "../../services/API/API";
import { IVehicles } from "../../services/types";
import { CardList } from "../../components";

export const Vehicles = () => {
  const [data, setData] = useState<Array<IVehicles>>([]);

  const getData = async (query?: string) => {
    await Api.getAllVehicles(query).then((res) => {
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
