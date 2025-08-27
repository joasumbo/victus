import axios from "axios"
import router from "@/router"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Adicionar token automaticamente
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Removendo token e user salvos
            localStorage.removeItem("token")
            localStorage.removeItem("user")

            router.push("/login")
        }
        return Promise.reject(error)
    }
)

export async function getUser() {
    const token = localStorage.getItem("token")
    if (!token) return null

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        return null
    }
}


export default api
