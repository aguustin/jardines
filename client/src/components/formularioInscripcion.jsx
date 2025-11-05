import { guardarAdultoRequest } from "@/api/inscripcionRequest"
import { useEffect, useState } from "react"

const FormularioInscripcion = () => {

    const [tipoAdulto, setTipoAdulto] = useState('1')
    const [estadoCivil, setEstadoCivil] = useState(1)
    const [showNinoForm, setShowNinoForm] = useState()

    const guardarAdulto = async (e) => {
        e.preventDefault()
        const res = await guardarAdultoRequest(adultoData)
    }

 
    return(
        <>
            <div className="w-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-left">

                   {tipoAdulto === '1' && <h2 className="text-3xl font-bold text-gray-800 mb-2">Datos de la Madre</h2>}
                   {tipoAdulto === '2' && <h2 className="text-3xl font-bold text-gray-800 mb-2">Datos del Padre</h2>}
                   {tipoAdulto === '3' && <h2 className="text-3xl font-bold text-gray-800 mb-2">Datos del Responsable</h2>}
                    <p className="text-gray-600 mb-8">Complete la siguiente información</p>

                    <form className="space-y-6" onSubmit={(e) => guardarAdulto(e)}>
                        <div className="border-l-4 border-indigo-500 pl-4 mb-6">
                            <h2 className="text-xl">Datos Personales</h2>

                            <div className="space-y-4 text-left">
                                <select onChange={(e) => setTipoAdulto(e.target.value)}>
                                    <option value={1}>Madre</option>
                                    <option value={2}>Padre</option>
                                    <option value={3}>Responsable legal</option>
                                </select>
                                <div>
                                    <label>Cuit</label><span className="text-red-500  ml-1">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="number" name="cuit"></input>
                                </div>
                                <div>
                                    <label>Nombre y apellido</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300  mt-2" placeholder="..." type="text" name="nombreAdulto"></input>
                                </div>
                                <div>
                                    <label>DNI</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="number" name="dni"></input>
                                </div>
                                <div>
                                    <label>Fecha de nacimiento</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="date" name="fechaNacimientoAdulto"></input>
                                </div>
                                <div>
                                    <label>Nacionalidad</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="nacionalidad"></input>
                                </div>
                            </div>
                        </div>
                         <div className="border-l-4 border-green-500 pl-4 mb-6">
                            <h2 className="text-xl">Convivencia</h2>
                            <div className="space-y-4">
                                {tipoAdulto !== '3'&& 
                                <div className="mt-1">
                                    <label>¿Convive con el niño/a?</label><span className="text-red-500">*</span><br></br>
                                    <input id="si" placeholder="..." type="radio" name="convivencia" value={true}></input>
                                    <label for="si">Si</label>
                                    <input className="ml-8" id="no" placeholder="..." type="radio" name="convivencia" value={false}></input>
                                    <label for="no">No</label>
                                </div>}
                                <div className="mt-1">
                                    <label>Motivo</label><span className="text-red-500">*</span><br></br>
                                    <textarea className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="motivo"></textarea>
                                </div>
                                <div className="mt-1">
                                    <label>Domicilio</label><span className="text-red-500">*</span><br></br>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="domicilio"></input>
                                </div>
                            </div>
                        </div>
                         <div className="border-l-4 border-indigo-500 pl-4 mb-6">
                            <h2 className="text-xl">Convivencia</h2>
                            <div className="space-y-4">
                                  <div>
                                    <label>Telefono</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="number" name="telefonoAdulto"></input>
                                </div>
                                <div>
                                    <label>Email</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="date" name="emailAdulto"></input>
                                </div>
                                <div>
                                    <label className="">Estado civil</label><span className="text-red-500">*</span><br></br>
                                    <select className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" onChange={(e) => setEstadoCivil(e.target.value)}>
                                        <option value={1}>Casado</option>
                                        <option value={2}>Soltero</option>
                                        <option value={3}>Viudo</option>
                                        <option value={4}>Separado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                         <div className="border-l-4 border-red-500 pl-4 mb-6">
                            <div className="space-y-4">
                                <div>
                                    <label>Si esta en pareja (no progenitora), nombre de su pareja</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="nombrePareja"></input>
                                </div>
                                <div>
                                    <label>DNI de la pareja</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="dniPareja"></input>
                                </div>
                                <div>
                                    <label>Telefono de la pareja</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="telefonoPareja"></input>
                                </div>
                                 {tipoAdulto !== '3' && <div className="mt-1">
                                    <label>¿Su pareja convive con el niño/a?</label><span className="text-red-500">*</span><br></br>
                                    <input id="si" placeholder="..." type="radio" name="convivenciaPareja" value={true}></input>
                                    <label for="si">Si</label>
                                    <input className="ml-8" id="no" placeholder="..." type="radio" name="convivenciaPareja" value={false}></input>
                                    <label for="no">No</label>
                                </div> }
                            </div>
                        </div>
                        <button className="bg-indigo-500! text-white" type="submit">Siguiente</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormularioInscripcion
