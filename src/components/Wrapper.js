import React, { useContext } from "react";
import { localisation } from "../normally_from_back";
import { Switch, Route } from "react-router-dom";

import Context from "../context";
import { useFetch } from "../customHooks/useFetch";
import Temperature from "./Temperature";
import Rain from "./Rain";
import Wind from "./Wind";
import CitiesButtons from "./CitiesButtons";
import WeatherNav from "./WeatherNav";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    " . nav "
    " cities data ";
`;

function Wrapper() {
  const { city, setCity } = useContext(Context);

  const URL = `https://api.netatmo.com/api/getpublicdata?lat_ne=${localisation[city].lat_ne}&lon_ne=${localisation[city].lon_ne}&lat_sw=${localisation[city].lat_sw}&lon_sw=${localisation[city].lon_sw}`;
  useFetch(URL);

  const updateCity = e => {
    setCity(e.target.name);
    console.log("city updated");
  };

  return (
    <GridContainer>
      <WeatherNav />
      <CitiesButtons updateCity={updateCity} />
      <Switch>
        <Route exact path="/" component={Temperature} />
        <Route path="/temperature" component={Temperature} />
        <Route path="/rain" component={Rain} />
        <Route path="/wind" component={Wind} />
      </Switch>
    </GridContainer>
  );
}

export default Wrapper;
