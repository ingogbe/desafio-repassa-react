import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'

// Functions
import { isEmpty } from '../../../utils/Functions';

import Loader from '../../Loaders/Line';
import ErrorMessage from '../../ErrorMessage';
import Rating from '../../Rating';
import styles from './styles';
import theme from '../../../themes/default';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class Ratings extends Component {

   render() {
      const { classes } = this.props;

      return (
         <Card className={classNames(classes.w100, classes.p1)}>
            <CardContent className={classes.p1}>
               <Grid className={classes.mb1} container direction="row" justify="space-between" alignItems="center">
                  <Typography className={classes.cardFontColor} variant="subtitle1" gutterBottom>
                     Avaliações
                  </Typography>
               </Grid>

               {!isEmpty(this.props.ratings) ? (
						!isEmpty(this.props.ratings[this.props.user.id]) ? (
							<Fragment>
								{Object.keys(this.props.ratings[this.props.user.id]).map((item, key) => (
									<Fragment key={key}>
										<Grid className={classes.mb1} container direction="row" justify="space-between" alignItems="center">
											<Rating 
												from={this.props.ratings[this.props.user.id][item].from}
												message={this.props.ratings[this.props.user.id][item].message}
												stars={this.props.ratings[this.props.user.id][item].stars}/>
										</Grid>
										<hr/>
									</Fragment>
								))}
								
							</Fragment>
						) : (
							<Fragment>
								<Grid className={classes.mb1} container direction="row" justify="center" alignItems="center">
									<ErrorMessage error={{
										message: "Você não possui avaliações no momento",
										type: "warning"
									}}/>
								</Grid>
							</Fragment>
						)
               ) : (
                  this.props.ratingError.error !== null ? (
                     <ErrorMessage error={this.props.ratingError}/>
                  ) : (
                     <Grid container direction="row" justify="center" alignItems="center"><Loader/></Grid>
                  )
               )}
            </CardContent>
            <CardActions className={classes.p0}>
               <Grid className={classes.m0} container direction="row" justify="flex-end" alignItems="flex-end">
                  {/* <Link underline="none" component={RouterLink} to="/balance">
                     <Button size="small">Ver Detalhes</Button>
                  </Link> */}
               </Grid>
            </CardActions>
         </Card>
      );
   }
}

Ratings.propTypes = {
   classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	ratings: PropTypes.object.isRequired,
	ratingError: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	ratings: state.rating.listByAccount,
	ratingError: state.ratingError,
	user: state.user.data
});

export default connect(mapStateToProps, {})(withStyles(styles(theme), { withTheme: true })(Ratings))
