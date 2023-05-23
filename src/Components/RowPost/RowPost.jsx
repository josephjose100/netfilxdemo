import React,{useEffect,useState} from 'react'
import Youtube from 'react-youtube'
import "./RowPost.css";
import axios from '../../axios';
import {imageUrl,apiKey} from '../../Constants/Constants'


function RowPost(props) {

  const[movies,setMovie]=useState([])
  const [youtubeUrlId,setUrlId]=useState('');
useEffect(()=>{
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovie(response.data.results)
    }).catch(err=>{
      alert('Network error')
    })
},[])

const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};


const handleMovie =(id)=>{
  console.log(id)
  axios.get(`movie/${id}/videos?api_key=${apiKey}&language=en-US`).then(response=>{
    console.log(response.data)
    if(response.data.results.length!==0)
    {
      setUrlId(response.data.results[0])
    }
    else
    {
      console.log('Trailer unavailable');
    }
  })
}

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
            {movies.map((obj)=>{
              return(      
                <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
                )
            })}
        </div>
       {youtubeUrlId && <Youtube videoId={youtubeUrlId.key} opts={opts}/>  }
    </div>
  )
}

export default RowPost
