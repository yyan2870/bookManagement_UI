import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import useAuth from "../../../utils/useAuth";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isFirstRun, setFirstRun] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const auth = useAuth();

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

  }, [password])


  const handleClick = () => {



    fetch('http://localhost:8080/user/signin', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
    .then((response) => { return response.json(); })
    .then((data) => {
      console.log('Success:', data);
      auth.signin({token: data.data}, () => {
        navigate('/dashboard/app', { replace: true });
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <>
      <Stack spacing={3} marginBottom={4}>
        <TextField name="email" 
          label="Email address" 
          onChange={e => setEmail(e.target.value)}
          error={missingEmail}
        />

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
          onChange={e => setPassword(e.target.value)}
          error={missingPassword}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
