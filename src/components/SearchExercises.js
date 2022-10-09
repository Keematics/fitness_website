import React, {useEffect, useState} from 'react'
import {Box, Button, Stack, TextField, Typography} from '@mui/material';


import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';


const SearchExercises = ({bodyPart, setBodyPart, setExercises}) => {

  const [search, setSearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])


  const fetchExerciseData = async() => {
    const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)
    setBodyParts(['all', ...bodyPartsData]);
  }

  useEffect(() => {
    fetchExerciseData();
  }, [])
  

  const handleSearch = async () => {
    if(search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      
      const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search) ||
        exercise.target.toLowerCase().includes(search) ||
        exercise.equipment.toLowerCase().includes(search) ||
        exercise.bodyPart.toLowerCase().includes(search)
        //the searched exercise might not only be in the name alone but in target,equipment and bodyPart
      );
      setSearch('')
      setExercises(searchedExercises);
    }


  }

  return (
    <Stack alignItems='center'
    mt='37px'
    p='20px'>
      <Typography fontWeight={700}
      sx={{fontSize: {lg: '44px', xs: '30px'}}}
      mb='50px' textAlign='center'>
        Awesome Exercises You Should Know
      </Typography>
      <Box position='relative' mb='72px'>
        <TextField
        sx={{
          input: {
            fontWeight: '700',
            border: 'none',
            borderRadius: '4px'
            },
          width: {lg: '800px', sm: '350px', xs: '150px'},
          backgroundColor: '#fff',
          borderRadius: '40px'
        }}
        height='76px'
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        placeholder='Search Exercises'
        type='text' 
        />
        <Button className='search-btn'
        sx={{
          bgcolor: '#ff2625',
          color: '#fff',
          width: {lg: '175px', xs: '70px'},
          fontSize: {lg: '20px', xs: '14px'},
          height: '56px',
          position: 'absolute'
        }}
        onClick={handleSearch}
        >Search</Button>
      </Box>
      <Box 
      sx={{position: 'relative', width: '100%', p: '20px'}}>
        <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts />
      </Box>
    </Stack>
  )
}

export default SearchExercises