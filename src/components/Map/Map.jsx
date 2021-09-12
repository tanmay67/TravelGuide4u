import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
// import MapmyIndia,{MapMarker} from 'react-mapmyindia';
// import MapData from "mapmyindia-react";
import { getPlacesData,getWeatherData } from '../../api/index';

import useStyles from './styles';

const Map = (
  props
  ) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const [coordinatesExact, setCoordinatesExact] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [places, setPlaces] = useState([]);
  const [weatherData,setWeatherData] = useState([]);

  useEffect(()=>{
    if(props.headerCords!==null){
      setCoordinatesExact(props.headerCords);
    }
  },[props.headerCords])
  

  var options = {
    enableHighAccuracy: true,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    setCoordinatesExact({lat:crd.latitude,lng:crd.longitude});
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success, error, options);
  },[]);

  useEffect(()=>{
    if(bounds!==null){
      props.setIsLoading(true);
      getWeatherData(coordinatesExact.lat,coordinatesExact.lng).then((data)=>{
     setWeatherData(data);
      });
      getPlacesData(props.type,bounds.sw, bounds.ne).then((data) => {
        let filteredInfo = data?.filter((place)=>place.name && place.num_reviews >0);
     props.setPlacesInfo(filteredInfo);
     setPlaces(filteredInfo);
     props.setFilteredPlaces([]);
     props.setIsLoading(false);
   });

    }
   
  },[props.type,bounds]);

  return (
    <div className={classes.mapContainer}>
      {coordinatesExact!==null &&  <GoogleMapReact 
      
      bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} defaultCenter={coordinatesExact} center={coordinatesExact} defaultZoom={14} margin={[50,50,50,50]} options={{disableDefaultUI:true, zoomControl:true}} onChange={(e)=>{
        // setCoordinates({lat:e.center.lat, lng:e.center.lng});
        setBounds({ne:e.marginBounds.ne, sw:e.marginBounds.sw})
      }} onChildClick={(child)=>{props.setChildClicked(child)}}
      >
        {props.filteredPlaces.length ? props.filteredPlaces?.map((place,i)=>(
          <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
            {!isDesktop?(<LocationOnOutlinedIcon color="primary" fontSize="large"/>):(<Paper elevation={3} className={classes.paper}>
              <Typography className={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
              <img className={classes.pointer} src={place.photo?place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} alt={place.name}/>
              <Rating size="small" value={Number(place.rating)} readOnly/>
              </Paper>)}
          </div>
        )) : places?.map((place,i)=>(
          <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
            {!isDesktop?(<LocationOnOutlinedIcon color="primary" fontSize="large"/>):(<Paper elevation={3} className={classes.paper}>
              <Typography className={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
              <img className={classes.pointer} src={place.photo?place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} alt={place.name}/>
              <Rating size="small" value={Number(place.rating)} readOnly/>
              </Paper>)}
          </div>
        ))}
        {weatherData?.list?.map((data,i)=>(
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={'place'}/>
          </div>
        ))}
      </GoogleMapReact>}
    </div>
  )
}

export default Map;