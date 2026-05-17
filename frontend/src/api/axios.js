

fetch('http://localhost:3000/auth/login',{
    headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type': `Applicatoin/json`
    }
})