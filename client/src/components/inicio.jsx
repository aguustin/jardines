import { guardarAdultoRequest } from "@/api/inscripcionRequest"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import CuitContext from "@/context/cuitContext"

const Inicio = () => {
    const {setExistingData} = useContext(CuitContext)
    const [CUIT, setCUIT] = useState('');
    const navigate = useNavigate(); // o usar <Link> si prefieres

    const validarCUIT = (valor) => {
        const limpio = valor.replace(/[^0-9]/g, '');
        if (limpio.length !== 11) return false;

        const factores = [5,4,3,2,7,6,5,4,3,2];
        let suma = 0;

        for (let i = 0; i < 10; i++) {
            suma += parseInt(limpio[i], 10) * factores[i];
        }

        let resto = suma % 11;
        let digito = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto;

        return digito === parseInt(limpio[10], 10);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await localStorage.setItem('cuit', JSON.stringify(CUIT))
        const cuitInt = Number(CUIT)
        const adultoData = {
            cuit:cuitInt
        }
        const res = await guardarAdultoRequest(adultoData)

        if(res.data.existe === 1){
            await localStorage.setItem("existingData", JSON.stringify(res.data.adultoExiste));
            navigate('/inscripcion');
        }
        if(res.data.existe === 3){
            navigate('/inscripcion');
        }
        //const normalizado = CUIT.trim();
       /* if (validarCUIT(normalizado)) {
            fetch(`/api/usuarios/${normalizado}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('CUIT no encontrado');
                    }
                    return response.json();
                })
                .then(data => {
                    const persona = data.usuario
                    console.log('Usuario encontrado:', persona);
                    //navigate('/inscripcion');
                })
                .catch(error => {
                    alert('CUIT no encontrado. Por favor, verifique e intente nuevamente.');
                    console.error('Error al buscar usuario:', error);
                });         
        }*/
    };

    return (
        <div className=" min-h-screen from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Sistema de Inscripción a Jardines
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Ingrese su CUIT para comenzar el proceso de inscripción
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CUIT
                            </label>
                            <Input 
                                type="text" 
                                placeholder="Ej: 20123456789"
                                value={CUIT}
                                onChange={(e) => setCUIT(e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                                required
                            />
                        </div>
                        
                        <Button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
                            onSubmit={handleSubmit}
                        >
                            Ingresar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inicio
