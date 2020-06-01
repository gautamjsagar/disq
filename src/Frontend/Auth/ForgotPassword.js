/*eslint-disable*/
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Copyrights from '../Global/Copyrights';


const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:''
    }
    this.onchange=this.onchange.bind(this);
  }

  onchange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
    console.log(this.state)
  }

  onsubmit(){
    alert(email.value)
  }

  render() {
    const { classes } = this.props;
    return (<div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper} style={{marginTop:"25%"}}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
          </Typography>
            <div className={classes.form} noValidate style={{marginTop:"10%"}}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.onchange}
                autoComplete="email"
                autoFocus
              />
              <Button
                style={{marginTop:"10%"}}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onsubmit}
                className={classes.submit}
              >
                Submit
            </Button>
              <Grid container>
                <Grid item xs>

                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyrights />
              </Box>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>);
  }
}
export default withStyles(styles)(ForgotPassword);