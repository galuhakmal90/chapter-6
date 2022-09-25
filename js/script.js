const handleRegister = async () => {
    let regUsername = document.getElementById("regUsername").value
    let regPassword = document.getElementById("regPassword").value
    let regNamaLengkap = document.getElementById("regNamaLengkap").value
    let regAlamat = document.getElementById("regAlamat").value
    let regUmur = document.getElementById("regUmur").value
    let score = document.getElementById("score").value
    
    const resp = await fetch('http://localhost:6068/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: regUsername,
            password: regPassword,
            fullname: regNamaLengkap,
            address: regAlamat,
            age: regUmur,
            score: score
        })
    })
    if(resp.status === 201){
        alert("Data Berhasil Disimpan")
        document.getElementById("regUsername").value = null
        document.getElementById("regPassword").value = null
        document.getElementById("regNamaLengkap").value = null
        document.getElementById("regAlamat").value = null
        document.getElementById("regUmur").value = null
    }else{
        alert("Data Gagal Disimpan")
    }
}

    const handleLogin = async () => {
        const username = document.getElementById("cariUsername").value
        const password = document.getElementById("cariPassword").value
        const resp = await fetch(`http://localhost:6068/login/${username}/${password}`)
        //const dt = await resp.json()
        
        if(resp.status === 404){
            alert("User Tidak Ditemukan")
        }else{
            const data = await resp.json();
             window.location.href = `/detail/${data.id}`
        }
    }

const handleEdit = async (biodataId) => {
    let detNamaLengkap = document.getElementById("detNamaLengkap").value
    let detAlamat = document.getElementById("detAlamat").value
    let detUmur = document.getElementById("detUmur").value

    const resp = await fetch(`http://localhost:6068/biodata/${biodataId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullname: detNamaLengkap,
            address: detAlamat,
            age: detUmur
        })
    })
    if(resp.status === 202){
        alert("Data Berhasil Diedit")
    }else{
        alert("Data Gagal Diedit")
    }
}

const lihatScore = async (usId) => {
    const resp = await fetch(`http://localhost:6068/user-score/${usId}`)
        //const dt = await resp.json()
    const data = await resp.json();
    window.location.href = `/score/${data.id}`
        
}

const handleDelete = async (menuId) => {
    let answe = confirm('Apakah kamu yakin')
    if(answe){
        await fetch(`http://localhost:6068/biodata/${menuId}`, {
            method: 'DELETE'
        })
        location.reload
    }
}

let x = Math.floor((Math.random() * 100) + 1);
document.getElementById("score").value = x;