async function doLogin(email,password){
    const response= await fetch('http://localhost:3000/api/sessions',{
        method:'POST',
        body: JSON.stringify({
            username:email,
            password:password
        }),
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include'
    })

    if(response.ok){
        const user= await response.json()
        return user
    }
    else{
        throw new Error("Login failed!");
    }

}


async function doLogout() {
    const response = await fetch('http://localhost:3000/api/sessions/current', {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error("Log out failed on server side.");
    }
}


export {doLogin, doLogout}