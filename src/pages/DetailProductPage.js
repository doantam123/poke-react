import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokeDetail } from '../redux/Pokemon/actionsOfPokes';
import Grid from '@mui/material/Grid';
import { capitalizeFirstLetter } from '../utils/generalFunction';

const DetailProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pokemon, loading, error } = useSelector((state) => state.pokeDetail);

  useEffect(() => {
    dispatch(fetchPokeDetail(id));
  }, [id, dispatch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pokemon) return <p>No Pokémon details found</p>;

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item fontSize={20} mt={5}>
          <b>{capitalizeFirstLetter(pokemon.name)}</b>
        </Grid>
      </Grid>    
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              crossOrigin="anonymous"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: '380px', height: '400px' }} // original image size
            />
        </Grid>
        <Grid item xs={4}>
          <p><b>Information</b></p>
          <p>Height: {pokemon.height} meter</p>
          <p>Weight: {pokemon.weight} Kg</p>
          <p>
            Types: {' '}
            {pokemon.types.map((typeInfo, index) => (
              <span key={index}>
                {capitalizeFirstLetter(typeInfo.type.name)}
                {index < pokemon.types.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p>
            Abilities: {' '}
            {pokemon.abilities.map((item, index) => (
              <span key={index}>
                {capitalizeFirstLetter(item.ability.name)}
                {index < pokemon.abilities.length - 1 && ', '}
              </span>
            ))}
          </p>
        </Grid>
      </Grid>       
    </>
  );
};

export default DetailProductPage;
