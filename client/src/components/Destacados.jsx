import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlainsDestacados } from "../actions";
import CardsD from "./CardsD";

function Destacados() {
  const dispatch = useDispatch();
  let PlainsDescatados = useSelector((state) => state.plainsDestacados);

  useEffect(() => {
    dispatch(getPlainsDestacados());
  }, [dispatch]);

  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4">
      <h1 className="py-2 text-center text-indigo-300 ">
        Destinos Recomendados
      </h1>
      <hr className="py-4  border-gray-300" style={{ color: "#14b8a6" }} />
      <div className="grid grid-cols-4 gap-4">
        {PlainsDescatados?.map((p) => {
          return (
            <CardsD
              key={p && p.id}
              image={p && p.image && p.image}
              title={p && p.title && p.title}
              location={p && p.location && p.location}
              score={p && p.score && p.score}
              id={p && p.id && p.id}
            />
          );
        })}
      </div>
    </div>
  );
}

//console.log(plains.findIndex(e => e.location === "Mendoza"), plains.findIndex(e => e.location === "Buenos Aires"), plains.findIndex(e => e.location === "Río Negro"), plains.findIndex(e => e.location === "Misiones"))
// console.log(respuesta)

export default Destacados;
