// 本地存储操作用户的代码
export const SET_TOKEN = (userInfo:string) =>{
    localStorage.setItem('USERINFO',userInfo)
}

export const GET_TOKEN = () =>{
    return localStorage.getItem('USERINFO')
}

export const REMOVE_TOKEN = () =>{
    return localStorage.removeItem('USERINFO')
}