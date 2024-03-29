import axios from "axios"
import services from "./services"


export async function getRequest(url) {
    
    const auth_key=await services.getData('token')

    try {
        const response = await axios.get(`${process.env.API_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${auth_key}`,
            },
        })
        return response
    } catch (error) {
        throw error?.response
    }
   
}