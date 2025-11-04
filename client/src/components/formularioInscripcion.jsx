import { useState } from "react"

const FormularioInscripcion = () => {

    const [tipoAdulto, setTipoAdulto] = useState(1)

    const guardarAdulto = (e) => {
        e.preventDefault()
    }

    return(
        <>
            <div>
                <div>
                    <p>Elegir tutor</p>
                    <select onChange={(e) => setTipoAdulto(e.target.value)}>
                        <option value={1}>Madre</option>
                        <option value={2}>Padre</option>
                        <option value={3}>Responsable legal</option>
                    </select>
                </div>
                <div>
                    {tipoAdulto === 1 && <h2>Datos de la Madre</h2>}
                    {tipoAdulto === 2 && <h2>Datos del Padre</h2>}
                    {tipoAdulto === 3 && <h2>Datos del responsable legal</h2>}
                    <label>Complete la siguiete información</label>
                </div>
            </div>
            <form className="" encType="multipart/form-data" onSubmit={(e) => guardarAdulto(e)}>
                
            </form>
        </>
    )
}

export default FormularioInscripcion
