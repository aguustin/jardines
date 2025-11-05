import { guardarAdultoRequest } from "@/api/inscripcionRequest"
import CuitContext from "@/context/cuitContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const FormularioInscripcion = () => {
    const {cuit, setCuit, existingData, setExistingData} = useContext(CuitContext)
    const [tipoAdulto, setTipoAdulto] = useState('1')
    const [estadoCivil, setEstadoCivil] = useState('1')
    const [convivenciaPareja, setConvivenciaPareja] = useState(null);
    const [showNinoForm, setShowNinoForm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getCuit = () => {
            setCuit(JSON.parse(localStorage.getItem('cuit')))
            const storedData = localStorage.getItem("existingData");
            if (storedData) {
                setExistingData(JSON.parse(storedData));
            }
        }
        getCuit()
    }, [])


    console.log(existingData)

    const guardarAdulto = async (e) => {
        e.preventDefault()

        const adultoData = {
            cuit:Number(cuit),
            nombreAdulto:e.target.elements.nombreAdulto.value,
            dniAdulto:e.target.elements.dniAdulto.value,
            fechaNacimientoAdulto:e.target.elements.fechaNacimientoAdulto.value,
            nacionalidad:e.target.elements.nacionalidad.value,
            convivencia:e.target.elements.convivencia.value,
            motivo:e.target.elements.motivo.value,
            telefonoAdulto:e.target.elements.telefonoAdulto.value,
            emailAdulto:e.target.elements.emailAdulto.value,
            domicilio:e.target.elements.domicilio.value,
            estadoCivil:Number(estadoCivil),
            nombrePareja:e.target.elements.nombrePareja.value,
            dniPareja:e.target.elements.dniPareja.value,
            telefonoPareja:e.target.elements.telefonoPareja.value,
            convivenciaPareja:convivenciaPareja
        }

        //const res = await guardarAdultoRequest(adultoData)

       /* if(res.data.existe === 2){
            navigate(`/preguntas/${cuilNino}`)
        }*/

        setShowNinoForm(true)
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
                                <select className="w-full p-2 rounded-lg border-1 border-gray-300  mt-2" onChange={(e) => setTipoAdulto(e.target.value)}>
                                    <option value={1}>Madre</option>
                                    <option value={2}>Padre</option>
                                    <option value={3}>Responsable legal</option>
                                </select>
                                <div>
                                    <label>Nombre y apellido</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300  mt-2" placeholder="..." type="text" name="nombreAdulto" defaultValue={existingData?.[0]?.nombreAdulto} required></input>
                                </div>
                                <div>
                                    <label>DNI</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="number" name="dniAdulto" defaultValue={existingData?.[0]?.dniAdulto} required></input>
                                </div>
                                <div>
                                    <label>Fecha de nacimiento</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="date" name="fechaNacimientoAdulto" defaultValue={existingData?.[0]?.fechaNacimientoAdulto} required></input>
                                </div>
                                <div>
                                    <label>Nacionalidad</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="nacionalidad" defaultValue={existingData?.[0]?.nacionalidad} required></input>
                                </div>
                            </div>
                        </div>
                         <div className="border-l-4 border-green-500 pl-4 mb-6">
                            <h2 className="text-xl">Convivencia</h2>
                            <div className="space-y-4">
                                {tipoAdulto !== '3'&& 
                                <div className="mt-1">
                                    <label>¿Convive con el niño/a?</label><span className="text-red-500">*</span><br></br>
                                    <input className="ml-1 mt-2" id="si" placeholder="..." type="radio" name="convivencia" value={true}></input>
                                    <label className="ml-1" for="si">Si</label>
                                    <input className="ml-8 mt-2" id="no" placeholder="..." type="radio" name="convivencia" value={false} required></input>
                                    <label className="ml-1" for="no">No</label>
                                </div>}
                                <div className="mt-1">
                                    <label>Motivo</label><span className="text-red-500">*</span><br></br>
                                    <textarea className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="motivo" defaultValue={existingData?.[0]?.motivo}></textarea>
                                </div>
                                <div className="mt-1">
                                    <label>Domicilio</label><span className="text-red-500">*</span><br></br>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="domicilio" defaultValue={existingData?.[0]?.domicilio} required></input>
                                </div>
                            </div>
                        </div>
                         <div className="border-l-4 border-indigo-500 pl-4 mb-6">
                            <h2 className="text-xl">Datos de ubicación</h2>
                            <div className="space-y-4 mt-2">
                                  <div>
                                    <label>Telefono</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="number" name="telefonoAdulto" defaultValue={existingData?.[0]?.telefonoAdulto} required></input>
                                </div>
                                <div>
                                    <label>Email</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="email" name="emailAdulto" defaultValue={existingData?.[0]?.emailAdulto}></input>
                                </div>
                                <div>
                                    <label className="">Estado civil</label><span className="text-red-500">*</span><br></br>
                                    <select className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" onChange={(e) => setEstadoCivil(e.target.value)} defaultValue={existingData?.[0]?.estadoCivil}>
                                        <option value={1}>Casado</option>
                                        <option value={2}>Soltero</option>
                                        <option value={3}>Viudo</option>
                                        <option value={4}>Separado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                         <div className="border-l-4 border-red-500 pl-4 mb-6">
                            <h2 className="text-xl">Pareja</h2>
                            <div className="space-y-4 mt-2">
                                <div>
                                    <label>Si esta en pareja (no progenitora), nombre de su pareja</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="nombrePareja" defaultValue={existingData?.[0]?.nombrePareja}></input>
                                </div>
                                <div>
                                    <label>DNI de la pareja</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="dniPareja" defaultValue={existingData?.[0]?.dniPareja}></input>
                                </div>
                                <div>
                                    <label>Telefono de la pareja</label><span className="text-red-500">*</span>
                                    <input className="w-full p-2 rounded-lg border-1 border-gray-300 mt-1" placeholder="..." type="text" name="telefonoPareja" defaultValue={existingData?.[0]?.telefonoPareja}></input>
                                </div>
                                 {tipoAdulto !== '3' && <div className="mt-1">
                                    <label>¿Su pareja convive con el niño/a?</label><span className="text-red-500">*</span><br></br>
                                    <input className="ml-1 mt-2" id="si" placeholder="..." type="radio" name="convivenciaPareja" value={true}  onChange={(e) => setConvivenciaPareja(e.target.value === "true")}></input>
                                    <label className="ml-1" for="si">Si</label>
                                    <input className="ml-8" id="no" placeholder="..." type="radio" name="convivenciaPareja" value={false}  onChange={(e) => setConvivenciaPareja(e.target.value === "false")}></input>
                                    <label className="ml-1" for="no">No</label>
                                </div> }
                            </div>
                        </div>
                        <button className="bg-indigo-500! text-white p-3" type="submit">Siguiente</button>
                    </form>
                   {showNinoForm && 
                    <form>
                        <h2>ninooo</h2>
                    </form>
                   } 
                </div>
            </div>
        </>
    )
}

export default FormularioInscripcion;
