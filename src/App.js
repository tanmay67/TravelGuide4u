import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [headerCords, setHeaderCords] = useState(null);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    const filterPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filterPlaces);
  }, [rating]);

  return (
    <div>
      <CssBaseline />
      <Header setHeaderCords={setHeaderCords} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setPlacesInfo={(e) => {
              setPlaces(e);
            }}
            setChildClicked={setChildClicked}
            type={type}
            setIsLoading={setIsLoading}
            setFilteredPlaces={setFilteredPlaces}
            filteredPlaces={filteredPlaces}
            headerCords={headerCords}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
