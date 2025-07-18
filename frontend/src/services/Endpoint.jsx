import axios from 'axios'

export const Base_url = 'http://localhost:7000'

const instance = axios.create({
    baseURL : Base_url,
    withCredentials: true
})

export const get=(url,params) => instance.get(url,{params})
export const  post = (url,data) => instance.post(url,data)
export const patch = (url,data) => instance.patch(url,data)
export const del =(url) => instance.delete(url)
