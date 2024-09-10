import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokes } from '../redux/Pokemon/actionsOfPokes';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function PokemonList() {
  const dispatch = useDispatch();
  const { pokes, loading, error } = useSelector((state) => state.pokes);

  useEffect(() => {
    dispatch(fetchPokes(0,20));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(pokes);

  return (
    <div>
      <h1>Pokemon List</h1>
      <Grid container spacing={2}>
        {/* Duyệt qua danh sách pokes và hiển thị thông tin Pokémon trong thẻ Card */}
        {pokes.map((pokemon) => {
          // Lấy số ID từ URL (nếu cần)
          const url = pokemon.url; // Giả sử pokemon.url chứa URL
          const number = url ? url.split('/').filter(Boolean).pop() : 'Unknown ID';

          return (
            <Grid item xs={12} sm={6} md={4} key={pokemon.name}>
              <Card sx={{ maxWidth: 345, p: 2, mt: '20px' }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}
                  title={pokemon?.name || 'Unknown Pokemon'}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pokemon?.name || 'Unknown Name'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Pokemon ID: {number}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default PokemonList;
