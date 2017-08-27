import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
    maxWidth: '100%'
  },
};

function MovieCard(props) {

  const {item, classes} = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media}
          image={item.poster_path ? 'http://image.tmdb.org/t/p/w185/' + item.poster_path : 'http://via.placeholder.com/200x120'}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {item.original_title}
          </Typography>
          <Typography component="p">
            {item.overview}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(MovieCard);
