import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginn } from '../utils/axios';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  // checking for logged in or not
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to home
    }
  }, [isLoggedIn, navigate]);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const token = await loginn(email, password);
      console.log('JWT Token:', token);
      login()
      alert('Login successful! Token saved.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant='h4' align='center' gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display='flex' flexDirection='column' gap={3}>
            <TextField
              label='Email'
              variant='outlined'
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
            />
            <TextField
              label='Password'
              variant='outlined'
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
            >
              Login
            </Button>
          </Box>
          {error && (
            <Typography color='error' align='center' sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;