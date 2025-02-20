import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundBox = styled(Box)({
  backgroundImage: 'url(https://source.unsplash.com/random)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Home = () => {
  return (
    <BackgroundBox>
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" color="primary" gutterBottom>
          Bienvenidos a mi página
        </Typography>
        <Typography variant="h5" component="p" color="textSecondary" gutterBottom>
          Esta es una página de ejemplo utilizando Material-UI.
        </Typography>
      </Container>
    </BackgroundBox>
  );
}

export default Home;