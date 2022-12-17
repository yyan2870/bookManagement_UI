import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, IconButton, InputAdornment, TextField, Container, Typography, Link, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify';
import useAuth from '../utils/useAuth';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignUpPage() {
  const [isFirstRun, setFirstRun] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [missingFirstName, setMissingFirstName] = useState(false);
  const [missingLastName, setMissingLastName] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [missingConfirmPassword, setMissingConfirmPassword] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  useEffect(() => {
    if (isFirstRun) {
      return;
    }
    if(!firstName) {
      setMissingFirstName(true);
    } else {
      setMissingFirstName(false);
    }
  }, [firstName])

  useEffect(() => {
    if (isFirstRun) {
      return;
    }
    if(!lastName) {
      setMissingLastName(true);
    } else {
      setMissingLastName(false);
    }
  }, [lastName])

  useEffect(() => {
    if (isFirstRun) {
      return;
    }
    if(!email) {
      setMissingEmail(true);
    } else {
      setMissingEmail(false);
    }
  }, [email])

  useEffect(() => {
    if (isFirstRun) {
      setFirstRun(false);
      return;
    }
    if(!password) {
      setMissingPassword(true);
    } else {
      setMissingPassword(false);
    }

    if(!confirmPassword) {
      setMissingConfirmPassword(true);
    } else {
      setMissingConfirmPassword(false);
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setIsPasswordMatch(false)
    } else if (password && confirmPassword && password === confirmPassword) {
      setIsPasswordMatch(true)

    }

  }, [password, confirmPassword])

  

  const handOnClickSignUp = () => {
    let isFormValid = true;
    setIsSignUpSuccess(false);
    setSignUpError('');
    if (!firstName) {
      setMissingFirstName(true);
      isFormValid = false;
    } else {
      setMissingFirstName(false);
    }
    if (!lastName) {
      setMissingLastName(true);
      isFormValid = false;
    } else {
      setMissingLastName(false);
    }
    if (!email) {
      setMissingEmail(true);
      isFormValid = false;
    } else {
      setMissingEmail(false);
    }
    if (!password) {
      setMissingPassword(true);
      isFormValid = false;
    } else {
      setMissingPassword(false);
    }
    if (!confirmPassword) {
      setMissingConfirmPassword(true);
      isFormValid = false;
    } else {
      setMissingConfirmPassword(false);
    }
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      isFormValid = false;
    }
    if (!isFormValid) {
      return false;
    }

    // navigate('/dashboard', { replace: true });
    fetch('http://localhost:8080/user/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, 
        password,
        firstName,
        lastName,
        role: 'USER',
      }),
    })
    .then((response) => { return response.json(); })
    .then((data) => {
      if (data.status === 200) {
        setIsSignUpSuccess(true);
      } else {
        setSignUpError(data.message);
      }
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
      setSignUpError(error)
    });

    return true;
  }


  return (
    <>
      <Helmet>
        <title> Sign up | Book Management </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
         

          <StyledContent>
          {isSignUpSuccess && (<Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {`You have successfully signed up with email: ${email} !`} <Link href='login'><strong>check it out!</strong></Link>
          </Alert>)}
          {signUpError && (<Alert severity="error">
            <AlertTitle>Failed</AlertTitle>
            {`Sign up failed due to error: ${signUpError} !`} 
            </Alert>)}
            <Typography variant="h4" gutterBottom>
              Sign up to Book Management
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <Link href="/login" variant="subtitle2">
                Sign in
              </Link>
            </Typography>

            <Stack spacing={3} marginBottom={4}>
              <TextField name="email" label="Email address" error={missingEmail} onChange={e => setEmail(e.target.value)}/>

              <TextField name="firstName" label="First Name" error={missingFirstName} onChange={e => setFirstName(e.target.value)}/>

              <TextField name="lastName" label="Last Name" error={missingLastName} onChange={e => setLastName(e.target.value)}/>


              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={missingPassword || !isPasswordMatch} onChange={e => setPassword(e.target.value)}
              />
               <TextField
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={missingConfirmPassword || !isPasswordMatch} onChange={e => setConfirmPassword(e.target.value)}
              />
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handOnClickSignUp}>
              Sign up
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
