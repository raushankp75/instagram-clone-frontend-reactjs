// is logged in
export const isLoggesIn = () => {
    let data = localStorage.getItem("token");
    if(data != null) return true;
    else return false;
}