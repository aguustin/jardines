import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FormularioInscripcion = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const persona = state?.persona;
    
    const [tipoAdulto, setTipoAdulto] = useState("1");
    const [formData, setFormData] = useState({
        cuit: '',
        nombreAdulto: '',
        dniAdulto: '',
        fechaNacimientoAdulto: '',
        nacionalidad: '',
        convivencia: true,
        motivo: '',
        telefonoAdulto: '',
        emailAdulto: '',
        domicilio: '',
        estadoCivil: '1',
        tienePareja: 'no',
        dniPareja: '',
        telefonoPareja: '',
        convivenciaPareja: false
    });

    const [ninos, setNinos] = useState([{
        cuil: '',
        nombreNino: '',
        dniNino: '',
        imagenDniFrente: null,
        imagenDniDorso: null,
        nacimientoNino: '',
        nacionalidadNino: '',
        domicilioNino: '',
        poseeObraSocial: false,
        nombreObraSocial: '',
        efectorSalud: '',
        grupoSanguineo: '',
        alergico: 'no',
        descripcionAlergia: '',
        imagenCud: null,
        cantidadDeInscripciones: 0
    }]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNinoChange = (index, field, value) => {
        setNinos(prev => prev.map((nino, i) => 
            i === index ? { ...nino, [field]: value } : nino
        ));
    };

    const handleFileChange = (index, field, file) => {
        setNinos(prev => prev.map((nino, i) => 
            i === index ? { ...nino, [field]: file } : nino
        ));
    };

    const agregarNino = () => {
        setNinos(prev => [...prev, {
            cuil: '',
            nombreNino: '',
            dniNino: '',
            imagenDniFrente: null,
            imagenDniDorso: null,
            nacimientoNino: '',
            nacionalidadNino: '',
            domicilioNino: '',
            poseeObraSocial: false,
            nombreObraSocial: '',
            efectorSalud: '',
            grupoSanguineo: '',
            alergico: 'no',
            descripcionAlergia: '',
            imagenCud: null,
            cantidadDeInscripciones: 0
        }]);
    };

    const eliminarNino = (index) => {
        if (ninos.length > 1) {
            setNinos(prev => prev.filter((_, i) => i !== index));
        }
    };

    const irAPreguntas = (indexNino) => {
        navigate('/preguntas', { 
            state: { 
                ninoIndex: indexNino,
                formData: formData,
                ninos: ninos
            } 
        });
    };

    const guardarAdulto = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        
        // Agregar datos del adulto
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        // Agregar datos de niños con archivos
        ninos.forEach((nino, index) => {
            Object.keys(nino).forEach(key => {
                if (key === 'imagenDniFrente' || key === 'imagenDniDorso' || key === 'imagenCud') {
                    if (nino[key]) {
                        formDataToSend.append(`ninos[${index}][${key}]`, nino[key]);
                    }
                } else {
                    formDataToSend.append(`ninos[${index}][${key}]`, nino[key]);
                }
            });
        });

        try {
            // Aquí iría tu llamada al backend
            console.log('Datos a enviar:', { ...formData, ninos });
            alert('Formulario guardado exitosamente');
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar el formulario');
        }
    };

    const getTituloAdulto = () => {
        switch(tipoAdulto) {
            case "1": return "Datos de la Madre";
            case "2": return "Datos del Padre";
            case "3": return "Datos del Responsable Legal";
            default: return "Datos del Adulto";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Botón volver */}
                <button
                    onClick={() => window.history.back()}
                    className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver
                </button>

                <form onSubmit={guardarAdulto} encType="multipart/form-data">
                    {/* Selector de tipo de adulto */}
                    <Card className="mb-6">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600">
                            <CardTitle className="text-white text-xl">Tipo de Tutor</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Seleccione el tipo de tutor
                            </label>
                            <select 
                                value={tipoAdulto}
                                onChange={(e) => setTipoAdulto(e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="1">Madre</option>
                                <option value="2">Padre</option>
                                <option value="3">Responsable Legal</option>
                            </select>
                        </CardContent>
                    </Card>

                    {/* Datos del Adulto */}
                    <Card className="mb-6">
                        <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600">
                            <CardTitle className="text-white text-xl">{getTituloAdulto()}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">CUIT</label>
                                    <Input
                                        type="number"
                                        name="cuit"
                                        value={formData.cuit}
                                        onChange={handleInputChange}
                                        placeholder="20123456789"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                                    <Input
                                        type="text"
                                        name="nombreAdulto"
                                        value={formData.nombreAdulto}
                                        onChange={handleInputChange}
                                        placeholder="Nombre completo"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">DNI</label>
                                    <Input
                                        type="number"
                                        name="dniAdulto"
                                        value={formData.dniAdulto}
                                        onChange={handleInputChange}
                                        placeholder="12345678"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                                    <Input
                                        type="date"
                                        name="fechaNacimientoAdulto"
                                        value={formData.fechaNacimientoAdulto}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad</label>
                                    <Input
                                        type="text"
                                        name="nacionalidad"
                                        value={formData.nacionalidad}
                                        onChange={handleInputChange}
                                        placeholder="Argentina"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                    <Input
                                        type="tel"
                                        name="telefonoAdulto"
                                        value={formData.telefonoAdulto}
                                        onChange={handleInputChange}
                                        placeholder="2611234567"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <Input
                                        type="email"
                                        name="emailAdulto"
                                        value={formData.emailAdulto}
                                        onChange={handleInputChange}
                                        placeholder="email@ejemplo.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Domicilio</label>
                                    <Input
                                        type="text"
                                        name="domicilio"
                                        value={formData.domicilio}
                                        onChange={handleInputChange}
                                        placeholder="Calle 123, Ciudad"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado Civil</label>
                                    <select
                                        name="estadoCivil"
                                        value={formData.estadoCivil}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="1">Soltero/a</option>
                                        <option value="2">Casado/a</option>
                                        <option value="3">Divorciado/a</option>
                                        <option value="4">Viudo/a</option>
                                        <option value="5">Unión de hecho</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="convivencia"
                                        checked={formData.convivencia}
                                        onChange={handleInputChange}
                                        className="w-5 h-5"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        Convive con el/los niño/s
                                    </label>
                                </div>

                                {!formData.convivencia && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de no convivencia</label>
                                        <textarea
                                            name="motivo"
                                            value={formData.motivo}
                                            onChange={handleInputChange}
                                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                                            rows="3"
                                            placeholder="Especifique el motivo"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">¿Tiene pareja?</label>
                                    <select
                                        name="tienePareja"
                                        value={formData.tienePareja}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="no">No</option>
                                        <option value="si">Sí</option>
                                    </select>
                                </div>

                                {formData.tienePareja === 'si' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">DNI Pareja</label>
                                            <Input
                                                type="number"
                                                name="dniPareja"
                                                value={formData.dniPareja}
                                                onChange={handleInputChange}
                                                placeholder="12345678"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Pareja</label>
                                            <Input
                                                type="tel"
                                                name="telefonoPareja"
                                                value={formData.telefonoPareja}
                                                onChange={handleInputChange}
                                                placeholder="2611234567"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name="convivenciaPareja"
                                                checked={formData.convivenciaPareja}
                                                onChange={handleInputChange}
                                                className="w-5 h-5"
                                            />
                                            <label className="text-sm font-medium text-gray-700">
                                                Convive con la pareja
                                            </label>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Datos de los Niños */}
                    {ninos.map((nino, index) => (
                        <Card key={index} className="mb-6">
                            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-white text-xl">Datos del Niño/a #{index + 1}</CardTitle>
                                    {ninos.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => eliminarNino(index)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CUIL del Niño/a</label>
                                        <Input
                                            type="number"
                                            value={nino.cuil}
                                            onChange={(e) => handleNinoChange(index, 'cuil', e.target.value)}
                                            placeholder="20123456789"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                                        <Input
                                            type="text"
                                            value={nino.nombreNino}
                                            onChange={(e) => handleNinoChange(index, 'nombreNino', e.target.value)}
                                            placeholder="Nombre completo"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">DNI</label>
                                        <Input
                                            type="number"
                                            value={nino.dniNino}
                                            onChange={(e) => handleNinoChange(index, 'dniNino', e.target.value)}
                                            placeholder="12345678"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                                        <Input
                                            type="date"
                                            value={nino.nacimientoNino}
                                            onChange={(e) => handleNinoChange(index, 'nacimientoNino', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Imagen DNI Frente</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(index, 'imagenDniFrente', e.target.files[0])}
                                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Imagen DNI Dorso</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(index, 'imagenDniDorso', e.target.files[0])}
                                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad</label>
                                        <Input
                                            type="text"
                                            value={nino.nacionalidadNino}
                                            onChange={(e) => handleNinoChange(index, 'nacionalidadNino', e.target.value)}
                                            placeholder="Argentina"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Domicilio</label>
                                        <Input
                                            type="text"
                                            value={nino.domicilioNino}
                                            onChange={(e) => handleNinoChange(index, 'domicilioNino', e.target.value)}
                                            placeholder="Calle 123, Ciudad"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={nino.poseeObraSocial}
                                            onChange={(e) => handleNinoChange(index, 'poseeObraSocial', e.target.checked)}
                                            className="w-5 h-5"
                                        />
                                        <label className="text-sm font-medium text-gray-700">
                                            ¿Posee Obra Social?
                                        </label>
                                    </div>

                                    {nino.poseeObraSocial && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Obra Social</label>
                                            <Input
                                                type="text"
                                                value={nino.nombreObraSocial}
                                                onChange={(e) => handleNinoChange(index, 'nombreObraSocial', e.target.value)}
                                                placeholder="Nombre de la obra social"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Efector de Salud</label>
                                        <Input
                                            type="text"
                                            value={nino.efectorSalud}
                                            onChange={(e) => handleNinoChange(index, 'efectorSalud', e.target.value)}
                                            placeholder="Hospital o centro de salud"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Grupo Sanguíneo</label>
                                        <select
                                            value={nino.grupoSanguineo}
                                            onChange={(e) => handleNinoChange(index, 'grupoSanguineo', e.target.value)}
                                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">¿Es alérgico?</label>
                                        <select
                                            value={nino.alergico}
                                            onChange={(e) => handleNinoChange(index, 'alergico', e.target.value)}
                                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="no">No</option>
                                            <option value="si">Sí</option>
                                        </select>
                                    </div>

                                    {nino.alergico === 'si' && (
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de Alergias</label>
                                            <textarea
                                                value={nino.descripcionAlergia}
                                                onChange={(e) => handleNinoChange(index, 'descripcionAlergia', e.target.value)}
                                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                                                rows="3"
                                                placeholder="Detalle las alergias"
                                            />
                                        </div>
                                    )}

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Imagen CUD (Certificado Único de Discapacidad) - Opcional</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(index, 'imagenCud', e.target.files[0])}
                                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Button
                                            type="button"
                                            onClick={() => irAPreguntas(index)}
                                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                                        >
                                            Completar Formulario de datos del Niño/a
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Botón agregar niño */}
                    <div className="mb-6">
                        <Button
                            type="button"
                            onClick={agregarNino}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        >
                            + Agregar otro Niño/a
                        </Button>
                    </div>

                    {/* Botón enviar */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-bold"
                        >
                            Guardar Inscripción
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioInscripcion;
