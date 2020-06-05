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
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
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
class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmpassword: "",
      role: "",
      mobilenumber: "",
    }
    this.inputchange = this.inputchange.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }

  inputchange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state)
  }

  onsubmit() {
    if (this.state.mobilenumber.length > 10) {
      alert("Enter Valid Number")
    } else {
      var params = new URLSearchParams();
      params.append('Username', this.state.username);
      params.append('Password', this.state.password);
      params.append('MobileNumber', this.state.mobilenumber);
      console.log(params)
      axios({
        method: 'post',
        url: 'http://localhost:5000/register',
        data: params
      })
        .then((response) => {
          console.log(response.data)
          // //    alert(response.data)
          // //console.log("Duplicate entry '" + this.state.username + "' for key 'Username'")
          // if (response.data === "Duplicate entry '" + this.state.username + "' for key 'Username'") {
          //   alert("This username is taken...")
          // } else {
          //   alert('Registration Successful...')
          //   window.history.pushState(null, "", "/login");
          //   window.location.reload();
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  
  render() {
    const { classes } = this.props;
    return (<div>
      <Grid container component="main" className={classes.root} style={{ marginTop: "-5%", height: "100%" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
          </Typography>
            <div className={classes.form} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(event, newValue) => this.setState({ password: newValue })}
                id="email"
                label="Username"
                name="username"
                onChange={this.inputchange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                //variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={this.inputchange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                onChange={this.inputchange}
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
              />
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                name="mobilenumber"
                onChange={this.inputchange}
                label="Mobile Number"
                type="tel"
                id="mobilenumber"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onsubmit}
                className={classes.submit}
              >
                Sign Up
            </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"I have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5} style={{ marginBottom: "5%" }}><br />
                <Copyrights />
              </Box>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>);
  }
}
export default withStyles(styles)(register);