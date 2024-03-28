import axios from "axios"
import services from "./services"


export async function getRequest(url) {
    
    const auth_key=await services.getData('token')
    console.log("token sssssssss",auth_key)

    try {
        const response = await axios.get(`${process.env.API_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${auth_key}`,
            },
        })
        return response
    } catch (error) {
        // console.log(error)
        // handleRedirect(error?.response?.status)
        throw error?.response
    }
   
}