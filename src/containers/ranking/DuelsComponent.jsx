import { useEffect, useState } from "react"
import { getMostCommonDuels } from "../../api/TiltanicaApi"

export default function DuelsComponent() {

    const [rows, setRows] = useState([])

    useEffect(() => retrieveMostCommonDuels(), [])
    
    function retrieveMostCommonDuels() {
        
        getMostCommonDuels()
        
        .then((response) =>{
            
            setRows(treatData(response.data))
        })
        .catch(error => console.log(error))
    }

    function treatData(newData) {
        for(let i = 0; i<newData.length; i++) {
            let winRatio = (+newData[i][4]).toFixed(2)
            if(winRatio>50) {
                newData[i][4] = newData[i][0] + " ganhou "+(+winRatio)+"% das partidas"
            }
            else {
                newData[i][4] = newData[i][1] + " ganhou "+(100-winRatio)+"% das partidas"
            }
        }
        return newData

    }

    return (
        <div className="container col m-5">
            <h3>Melhores Duelos</h3>
            <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                <thead>
                <tr>
                    <th scope="col">Jogador 1</th>
                    <th scope="col">Jogador 2</th>
                    <th scope="col">Partidas Jogadas</th>
                    <th scope="col">Win ratio</th>
                </tr>
                </thead>
                <tbody>
                    {
                        rows.map( (row, index) => (
                            <tr key = {index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[4]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );

}