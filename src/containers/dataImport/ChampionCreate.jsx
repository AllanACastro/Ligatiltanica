import { useState } from "react"
import { insertChampion } from "../../api/TiltanicaApi"

export default function ChampionCreate() {

    const [inputs,setInputs] = useState({})
    const [championId,setChampionId] = useState()

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs({...inputs, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(inputs.championName !== undefined && inputs.championName !== "") {
            var body = {
                name: inputs.championName
            }
            insertChampion(body)
            .then(response => setChampionId(response.data.id))
            .catch(error => console.log(error.message))
        }
    }


    return (
        <div className="container col m-5">
            <div>{championId}</div>
            <form onSubmit={handleSubmit}>
                <label>Nome do Campeão:
                    <input 
                        type="text" 
                        name="championName" 
                        value={inputs.championName || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <input type="submit" />
            </form>
        </div>
    )
}