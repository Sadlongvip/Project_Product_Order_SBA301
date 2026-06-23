

export function useAccount(){
    const account = JSON.parse(localStorage.getItem("account"));
    return account;
}