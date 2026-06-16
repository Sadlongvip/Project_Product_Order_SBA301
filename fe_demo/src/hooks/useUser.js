

export function useUser(){
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}