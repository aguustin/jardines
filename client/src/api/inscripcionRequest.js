import axios from "axios";

export const guardarAdultoRequest = async (adultoData) => axios.post('http://localhost:4000/guardar_datos_adulto', adultoData)