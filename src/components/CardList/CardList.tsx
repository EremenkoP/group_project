import { FC } from "react";
import {
  IFilms,
  IPeople,
  IPlanet,
  ISpecies,
  IStarships,
  IVehicles,
} from "../../services/types";
import style from "./CardList.module.scss";

interface ICardList {
  data:
    | Array<IPeople>
    | Array<IFilms>
    | Array<IStarships>
    | Array<IVehicles>
    | Array<ISpecies>
    | Array<IPlanet>;
}

export const CardList: FC<ICardList> = ({ data }) => {
  return (
    <section>
      <ul className={style.card__list}>
        {data.map((people, index) => {
          return (
            <li className={style.card__list__item} key={index}>
              {"name" in people ? people.name : people.title}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
