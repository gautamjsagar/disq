/*eslint-disable*/
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Copyrights from '../GlobalComponent/Copyrights';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    //  backgroundImage: 'url(https://source.unsplash.com/random)',
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


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    }
    this.oninputchange = this.oninputchange.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
    this.storelocaldata = this.storelocaldata.bind(this);
  }
  componentDidMount() {

  }
  oninputchange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    //  console.log(this.state)
  }
  storelocaldata() {
    alert("HI")
  }
  onsubmit() {

    if (username.value === '' && password.value === '') {
      alert('Username and Password must not be blank  ')
    } else {
      var body = {
        'username': username.value,
        'password': password.value
      }
      var params = new URLSearchParams();
      params.append('username', username.value);
      params.append('password', password.value);
      axios({
        method: 'post',
        url: '../../Backend/Auth/Login.py',
        data: params
      })
        .then(function (response) {

          console.log(response.data)
          if (response.data == "" || response.data == null) {
            alert("Please check your credentials")
          }else {
            if (response.data.LoginPermission == 0) {
              //alert("No issues with login permission")
              // storelocaldata()
              localStorage.setItem("UAID", response.data.UAID);
              localStorage.setItem("EmailID", response.data.EmailID);
              localStorage.setItem("Username", response.data.Username);
              window.history.pushState(null, "", "/home");
                window.location.reload();
            } else if (response.data.LoginPermission == -1) {
              alert("Your Account is banned.")
            } else if (response.data.LoginPermission == 1) {
              alert("You are the premium user")
              localStorage.setItem("UAID", response.data.UAID);
              localStorage.setItem("EmailID", response.data.EmailID);
              localStorage.setItem("Username", response.data.Username);
              window.history.pushState(null, "", "/home");
              window.location.reload();
            } else {
              alert("Something else")
            }
          }
          // if(response.data.FirstName === undefined){
          //   alert("Please Check Your Username and Password")
          // }else{
          //   localStorage.setItem("UserID", response.data.UserID);
          //   localStorage.setItem("UserClass", response.data.UserClass);
          //   if(response.data.UserRole === "Admin" ){
          //      console.log("Admin is Signed In")
          //      window.history.pushState(null, "", "/QuizApp/home/teacher");
          //      window.location.reload();
          //   }else{
          //     console.log("Student is Signed In")
          //     window.history.pushState(null, "", "/QuizApp/home/student");
          //     window.location.reload();
          //   }
          // } 
        })
        .catch(function (error) {
          console.log(error);
          alert("Network Error Please check your network connection or try after some time.")
        });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ marginBottom: "5%" }}>
                Sign In
          </Typography>
              <div className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  onChange={this.oninputchange}
                  label="Email Address"
                  name="username"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={this.oninputchange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.onsubmit}
                  style={{ marginBottom: "10%" }}
                  className={classes.submit}
                >
                  Sign In
            </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgotpassword" variant="body2">
                      Forgot password?
                </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
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
export default withStyles(styles)(Login);