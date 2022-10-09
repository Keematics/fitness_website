import React, {useState} from 'react'
import { Box } from '@mui/material'



import HeroBanner from '../components/HeroBanner'
import SearchExercises from '../components/SearchExercises'
import Exercises from '../components/Exercises'

const Home = () => {
  const [bodyPart, setBodyPart] = useState('all')
  const [exercises, setExercises] = useState([])


  // console.log(bodyPart);

  return (
    <Box>
      <HeroBanner />
    <SearchExercises 
      bodyPart={bodyPart}
      setBodyPart={setBodyPart}
      setExercises={setExercises}
    />
    <Exercises
      exercises={exercises}
      setExercises={setExercises}
      bodyPart={bodyPart}
    />
    </Box>
  )
}

export default Home