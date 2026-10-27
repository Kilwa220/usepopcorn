import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Container from './components/Container';
import { MdStarRate } from "react-icons/md";
import useSearch from './hooks/useSearch';
import Loading from './assets/loading.svg'
import { RiErrorWarningFill } from "react-icons/ri";
import useSearchByMovieId from "./hooks/useSearchByMovieId"

const KEY = import.meta.env.VITE_OMDB_API_KEY;
const actors = "Sergey A., Sergey Lesovoy, Pyotr Lutsenko"

const mock = [
  {
    Poster: 'https://m.media-amazon.com/images/M/MV5BNGQyMWQ0ZjItMGMyOC00Y2RlLWIzZDQtZjhmZTdiNDdhOTdmXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg',
    Title: "The lord of ring",
    Actor: actors.split(',')[0],
    Genre: "Action, Crime, Fantasy",
    Runtime: "48 min",
    Rated: 9.2,
    Year: 2014
  },
]

const SpecialHeading = ({ children, title }) => {
  return (
    <h2 className='flex justify-between items-center text-[var(--primary-color)] relative font-bold text-[17px] mb-8'>
        {title}
        {children}
    </h2>
  )
}

const Box = ({children, ...attr}) => {
  const {exStyle} = {...attr}

  return (
    <div className={"box rounded-md bg-[var(--elevated-surface)] pt-5 pb-5 pl-3 pr-3 " + exStyle}>
        {children}
    </div>
  )
}

const Movie = ({ poster, title, year, onTogglePopup}) => {

  return (
    <li className='flex gap-5 p-4 border-b border-b-[var(--secondary-color)] cursor-pointer hover:bg-[var(--accent-lime)]' onClick={()=> onTogglePopup()}>
      <img className='rounded-r-2xl shadow-sm min-h-[100px] shadow-white' src={poster} alt={title} width='60' height='50'/>
      <div className="movie-info mt-1">
        <h3 className='font-bold text-[var(--primary-color)] text-[20px]'>{title}</h3>
        <p className='block text-[var(--secondary-color)] text-[13px] mt-[-2px]'>
            {year}
        </p>
      </div>
    </li>
  )
}

const SearchResult = ({ movies, loading, error }) => {
  const [openMovie, setOpenMovie] = useState({isOpen: false, imdbID: 0})
  const [movieData, setMovieData]= useState('')
  const api = `http://www.omdbapi.com/?apikey=${KEY}&i=${openMovie.imdbID}`

  useSearchByMovieId(api, openMovie.imdbID, setMovieData)

  console.log(movieData)


  const handleShowMovie = (imdbID) => {
    setOpenMovie({isOpen: true, imdbID: imdbID})
  }

  const handleHiddePopup = () => {
    setOpenMovie({isOpen: false, imdbID: 0})
  }

  return (
    <Box exStyle="w-full md:w-[50%]">
        <SpecialHeading title='Search results'>
            <span className='text-[10px] font-medium pl-2 pr-2  pt-0 pb-0 bg-gray-500 rounded-l-2xl rounded-r-2xl'>{movies ? movies.length : 0} movies</span>
        </SpecialHeading>
    {
      loading
      ?(<img src={Loading} className='mr-auto ml-auto' alt="Loading" height='30'/>)  
      : error
      ? (<div className='text-white text-center text-[18px]'><RiErrorWarningFill className='inline mr-1 text-[22px] text-red-500 relative -top-[2px]'/> {error}</div>)
      :(
        <>
        <ul className="movies">
          {movies 
          ? movies.map(movie => (
            <Movie key={movie.imdbID} poster={movie.Poster} title={movie.Title} year={movie.Year} rated={movie.imdbRating} actor={movie.Actors} genre={movie.Genre} runtime={movie.Runtime} onTogglePopup={() => handleShowMovie(movie.imdbID)}/>
          ))
          : ''
          }
        </ul>
        <PopupMovie isOpen={openMovie.isOpen} movieData={movieData} onHiddePopup={handleHiddePopup}/>
        </>
      )
    }
    </Box>
  )
}

const PopupMovie = ({ isOpen, movieData, onHiddePopup }) => {

  return (
      <div className="relative" style={{...isOpen ? {display: 'block'} : {display: 'none'}}}>
        <div className="overlay fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.75)] cursor-pointer" onClick={() => onHiddePopup()} ></div>
        <div className="movie-popup flex gap-2 p-3 bg-[#22242B] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[555px] h-[400px] shadow shadow-md shadow-amber-600">
            <div className="image rounded-md w-[42%] bg-cover bg-center h-full" style={{backgroundImage: `url('${movieData.Poster}')`}}>
            </div>
            <div className="movie-info">
              <h2>
                {movieData.Title}
                <span>{movieData.Year}</span>
              </h2>
            </div>
          </div>
      </div>
  )
}

function App() {
  const [data, setData] = useState('')
  const [targetMovie, setTargetMovie] = useState('')
  const api = `http://www.omdbapi.com/?apikey=${KEY}&s=${targetMovie}`
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  useSearch(api, targetMovie, setData, setLoading, setError)

  const handleSearch = (movie) => {
    setTargetMovie(movie)
  }

  return (
    <div className='app relative'>
      <Header 
        targetMovie={targetMovie}
        onSearch={handleSearch}
      />

      <Container exStyle="flex flex-col gap-3 md:flex-row text-start">
        <SearchResult
          loading={loading}
          error={error}
          movies={data.Search}
        />

        <Box exStyle="w-full md:w-[50%]">

        </Box>
      </Container>

      <footer></footer>

    </div>
  )
}

export default App
