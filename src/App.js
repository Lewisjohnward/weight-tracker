import React, {useState, useEffect} from "react"
import axios from "axios"

export default function App(){
    const [state, setState] = useState({username: '', startingweight: 0})
    const [allUsers , setAllUsers] = useState(null)

    function handleNameChange(event){
        const username = event.target.value
        setState(prev => {
            return {
                ...prev,
                username
            }
        })
    }

    function handleStartingWeightChange(event){
        const startingweight = event.target.value
        setState(prev => {
            return {
                ...prev,
                startingweight
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault()

        const user = state

        console.log(user)

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        setState({username: '', startingweight: 0})


    }

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => {
                setAllUsers(res.data)
            })
    }, [])


    console.log(allUsers)


    return (
        <div>
            <h1>Weight Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="username" 
                    value={state.username}
                    onChange={handleNameChange}
                />
                <input 
                    type="text" 
                    placeholder="starting weight in kg"
                    value={state.startingweight}
                    onChange={handleStartingWeightChange}
                />
                <button type="submit">Submit</button>
            </form>
            {allUsers ? allUsers.map(item => <li key={item.__id}> username: {item.username} startingweight: {item.startingweight}</li>): null}
        </div>
    )
}