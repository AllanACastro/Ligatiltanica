import { useEffect, useState } from "react"
import { getBestDuos, getWorstDuos } from "../../api/TiltanicaApi"
import { useParams } from "react-router-dom"

export default function DuosComponent() {

    let { type } = useParams()
    const [rows, setRows] = useState([])
    const [title, setTitle] = useState()

    useEffect(() => {

        if (type === "worst") {
            setTitle("Piores duos")
            getWorstDuos()
            .then((response) =>{
                setRows(response.data)
            })
            .catch(error => console.log(error))
        } else {
            setTitle("Melhores duos")
            getBestDuos()
            .then((response) =>{
                
                setRows(response.data)
            })
            .catch(error => console.log(error))
        }
    }, [])

    return (
        <div className="container col m-5">
        <h3>{title}</h3>
            <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                <thead>
                <tr>
                    <th scope="col">Jogador 1</th>
                    <th scope="col">Jogador 2</th>
                    <th scope="col">Partidas Jogadas</th>
                    <th scope="col">WinRatio</th>
                </tr>
                </thead>
                <tbody>
                    {
                        rows.map( (row, index) => (
                            <tr key = {index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{
                                    type === "worst" ? 100 -(+row[3]).toFixed(2) : (+row[3]).toFixed(2)
                                    }
                                %</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );

}