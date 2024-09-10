import React from 'react';
import Grid from '@mui/material/Grid';
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';
import PokemonList from '../component/PokemonList';

function HomePage() {

  return (
    <>
      <HeaderComponent />
      <div className="home-body">
        <Grid container spacing={4} justifyContent="center"> {/* Căn chỉnh đều và thêm khoảng cách */}
            <Grid item xs={12} sm={6} md={4}>
            <PokemonList />
            </Grid>
        </Grid>
      </div>
      <FooterComponent />
    </>
  );
}

export default HomePage;
