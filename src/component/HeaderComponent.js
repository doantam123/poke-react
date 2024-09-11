import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokes } from '../redux/Pokemon/actionsOfPokes';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function HeaderComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokes = useSelector((state) => state.pokes.pokes || []);

  useEffect(() => {
    if (searchTerm.trim()) {
      // Gọi API tìm kiếm
      dispatch(fetchPokes(0, 100, searchTerm)); // Lấy 100 Pokémon để tìm kiếm
    }
  }, [dispatch, searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() && pokes.length > 0) {
      const filteredSuggestions = pokes
        .filter((pokemon) => pokemon.name.includes(searchTerm.toLowerCase()))
        .map((pokemon) => pokemon.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, pokes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      const foundPokemon = pokes.find(
        (pokemon) => pokemon.name.toLowerCase() === searchTerm.toLowerCase()
      );
      const url = foundPokemon?.url;
      const numberId = url ? url.split('/').filter(Boolean).pop() : 'Unknown ID';
      if (foundPokemon) {
        navigate(`/poke/detail/${numberId}`);
      } else {
        alert('Pokemon not found');
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const foundPokemon = pokes.find((pokemon) => pokemon.name === suggestion);

    if (foundPokemon) {
      const url = foundPokemon.url;
      const numberId = url ? url.split('/').filter(Boolean).pop() : 'Unknown ID';
      navigate(`/poke/detail/${numberId}`);  
    } else {
      alert('Pokemon not found');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
              Pokemon Of @doantam123
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearchSubmit} style={{ width: '100%' }}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {suggestions.length > 0 && (
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    mt: 1,
                    maxHeight: 200,
                    overflowY: 'auto',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: 3
                  }}
                >
                  <MenuList>
                    {suggestions.map((suggestion) => (
                      <MenuItem key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              )}
            </form>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
