import React from 'react';
import Grid from '@mui/material/Grid';
import PokemonList from '../component/PokemonList';

function HomePage() {

  return (
    <>
      <div className="home-body">
        <Grid container spacing={4} justifyContent="center">
            <Grid item md={6}>
            <PokemonList />
            </Grid>
        </Grid>
      </div>
    </>
  );
}

export default HomePage;
