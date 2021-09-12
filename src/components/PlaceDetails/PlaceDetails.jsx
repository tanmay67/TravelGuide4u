import React from 'react';
import {Box, Typography, Card, CardMedia,CardContent,CardActions, Checkbox, Chip, Button} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const PlaceDetails = ({place, selected, refProp}) => {
  const classes = useStyles();
 
  if(selected) {
    refProp?.current?.scrollIntoView({behavior:'smooth',block:'start'});
  }


  return (
    <Card elevation={6}>
      {/* place name */}
      <CardMedia style={{height:350}} image={place.photo?place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} title={place.name}/>
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        {/* rating */}
        <Box display="flex" justifyContent="space-between">
        <Rating value={Number(place.rating)} readOnly/>
          <Typography gutterBottom variant="subtitle1" >out   {place.num_reviews} reviews</Typography>
        </Box>
        {/* price */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1" >{place.price_level}</Typography>
        </Box>
        {/* ranking */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1" >{place.ranking}</Typography>
        </Box>
        {/* awards */}
        {place?.awards?.map((award,index)=>(
          <Box key={index} my={1} display="flex" justifyContent="space-between" >
            <img src={award.images.small} alt={award.display_name}/>
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {/* place's cuisine */}
        {place?.cuisine?.map(({name})=>(
          <Chip key={name} size="small" label={name} className={classes.chip}/>
        ))}
        {/* place's address */}
        {place?.address && (<Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}><LocationOnIcon/>{place.address}</Typography>)}
        {/* place's phone number */}
        {place?.phone && (<Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}><PhoneIcon/>{place.phone}</Typography>)}

        <CardActions>
          {/* trip advisor button */}
          <Button size="small" color="primary" onClick={()=> window.open(place.web_url,'_blank')}>Trip Advisor</Button>
          {/* place's website */}
          <Button size="small" color="primary" onClick={()=> window.open(place.website,'_blank')}>Website</Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PlaceDetails;