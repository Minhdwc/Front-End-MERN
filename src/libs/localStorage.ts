const saveLocalStorage=(key: string, value:string)=>{
    localStorage.setItem(key, value)
}

const getItemLocalStorage=(key: string)=>{
    return localStorage.getItem(key)
}

const deleteItemLocalStorage=(key: string)=>{
    localStorage.removeItem(key)
}

module.exports ={
    saveLocalStorage,
    getItemLocalStorage,
    deleteItemLocalStorage
}