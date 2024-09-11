import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokes } from '../redux/Pokemon/actionsOfPokes';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import { capitalizeFirstLetter } from '../utils/generalFunction';

function PokemonList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pokes, loading, error } = useSelector((state) => state.pokes);

  const [likedPokemons, setLikedPokemons] = useState({});
  const [hoveredPokemon, setHoveredPokemon] = useState(null);
  const [page, setPage] = useState(1);
  const pokesPerPage = 10;
  
  useEffect(() => {
    dispatch(fetchPokes((page - 1) * pokesPerPage, pokesPerPage));
  }, [dispatch, page]);

  useEffect(() => {
    const cachedLikes = localStorage.getItem('likedPokemons');
    if (cachedLikes) {
      setLikedPokemons(JSON.parse(cachedLikes));
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleFavoriteClick = (name) => {
    const updatedLikes = {
      ...likedPokemons,
      [name]: !likedPokemons[name],
    };
    setLikedPokemons(updatedLikes);
    localStorage.setItem('likedPokemons', JSON.stringify(updatedLikes));
  };

  const goToDetail = (numberId) => {
    navigate(`/poke/detail/${numberId}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item>
          <h1>Pokemon List</h1>
        </Grid>
      </Grid>

      {hoveredPokemon && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, marginTop: 50 }}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${hoveredPokemon}.png`}
            alt="Hovered Pokemon"
            style={{ width: '300px', height: '300px' }}
          />
        </div>
      )}

      <Grid container spacing={2}>
        {pokes.map((pokemon) => {
          const url = pokemon.url;
          const numberId = url ? url.split('/').filter(Boolean).pop() : 'Unknown ID';

          return (
            <Grid item xs={12} sm={6} md={4} key={pokemon.name}>
              <Card
                sx={{ maxWidth: 400, p: 2, mt: '20px' }}
                onMouseEnter={() => setHoveredPokemon(numberId)}
                onMouseLeave={() => setHoveredPokemon(null)}
              >
                <CardMedia
                  sx={{ height: 200 }}
                  component="img"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberId}.png`}
                  title={pokemon?.name || 'Unknown Pokemon'}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    <b>{capitalizeFirstLetter(pokemon?.name || 'Unknown Name')}</b>
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Pokemon NumberID: {numberId}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container>
                    <Grid item md={4}>
                      <Button size="small" onClick={() => handleFavoriteClick(pokemon.name)}>
                        <FavoriteIcon sx={{ color: likedPokemons[pokemon.name] ? 'red' : 'gray' }} />
                      </Button>
                    </Grid>
                    <Grid item md={8}>
                      <Button size="small" onClick={() => goToDetail(numberId)}>Go for Detail</Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container direction="column" alignItems="center" style={{ marginTop: '20px' }}>
        <Pagination count={10}
         variant="outlined" 
         page={page} 
         shape="rounded"
         onChange={handlePageChange}
          />
      </Grid>
    </div>
  );
}

export default PokemonList;
