import { useState } from "react"
import axios from "axios"

axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const useAxios = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState([])

    const fetchData = async ({ url, method, data, headers }) => {
        setLoading(true)
        setError([])
        
        try {
            const response = await axios({
                url,
                method,
                data,
                headers
            })
            return response.data
        } catch (error) {
            //console.log(error)
            console.error(error?.response?.data?.error || error?.response?.data?.message || ['Error en el envío de la petición'])
            setError(error?.response?.data?.error || error?.response?.data?.message || ['Error en el envío de la petición']); // Actualiza el estado de error
            throw (error?.response?.data?.error || error?.response?.data?.message || ['Error en el envío de la petición del servidor']); // Retorna el error
        } finally {
            setLoading(false)
        }
    }
    return { fetchData, loading, error, setLoading };
}