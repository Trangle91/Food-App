import React,{useState} from 'react'
import './App.css'
import {v4 as uuidv4} from 'uuid'
import Axios from 'axios'
import Recipe from './components/Recipe'
import Alert from './components/Alert'

const App = () => {

        //search word on key stroke
        const [query, setQuery] = useState("")
        //recipes of search result
        const [recipes, setRecipes] = useState([])
        //error messages
        const [alert,setAlert] = useState("")
    
        const APP_ID = "2a839985"
        const APP_KEY = "ef9f285dfa33b206cf741442dd308765"
        const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`

        //make api request
        const getData = async () =>{
            //check query to display error message
            if(query !== ""){
                const result = await Axios.get(url)
                if(!result.data.more){
                    return setAlert("No food with such name")
                }
                //get recipes array
                setRecipes(result.data.hits)
                setAlert("")
                setQuery("")
                console.log(result)
            }
           else{
                setAlert('please fill the form')
           }
        }

        //handle when submitting the form
        const handleSubmit = event => {
            event.preventDefault()
            getData()
        }   

        //handle query dynamically
        const handleChange = event =>{
            setQuery(event.target.value)
        }


        return( 
        <div className="app">
            <h1 onClick={getData}>Food Searching App</h1>
            <form className='search-form'
            onSubmit={handleSubmit}>

               {alert !== "" && <Alert alert={alert}/>}

                <input type='text'
                autoComplete='off'
                placeholder='Search Food'
                value={query}
                onChange={handleChange} 
                />

                <input type='submit'
                value="search" />

            </form>
            {/* display recipes's label */}
            <div className='recipes'>
                {recipes !==[] && recipes.map(recipe=> 
                    <Recipe key={uuidv4()} recipe={recipe}/>)}
            </div>
        </div>
    )
}

export default App
