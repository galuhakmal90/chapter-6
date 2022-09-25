const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios').default;
const {user, biodata, history} = require('./models')

const app = express()
const jsonParser = bodyParser.json()

app.set('view engine', 'ejs')
app.use('/css', express.static(__dirname+'/css'))
app.use('/js', express.static(__dirname+'/js'))

//VIEWS
app.get('/home', async (req,res) => {
    const data = await axios.get('http://localhost:6068/biodatas')
    res.render('home', {menuBio: data.data})
})

app.get('/detail/:id', async (req, res) => {
    const data = await axios.get(`http://localhost:6068/user-biodata/${req.params.id}`)
    res.render('detail', {userDetail: data.data})
})

app.get('/score/:id', async (req, res) => {
    const data = await axios.get(`http://localhost:6068/user-score/${req.params.id}`)
    res.render('score', {userScore: data.data})
})

//READ
app.get('/login/:username/:password', async(req, res) => {
    //SELECT * FROM user WHERE username= req.params.username and password=req.params.password
    const data = await user.findOne({
        where: {
            username: req.params.username,
            password: req.params.password
        }
    })

    if(data != null){
        res.send(data)
    }else{
        res.send('Data Tidak Ditemukan')
    }
    
})

app.get('/user-biodata/:id', async (req, res) => {
    const data = await user.findByPk(req.params.id, {
        include: biodata
    })
    res.send(data)
})

app.get('/user-score/:id', async (req, res) => {
    const data = await user.findByPk(req.params.id, {
        include: history
    })
    res.send(data)
})

app.get('/biodatas', async (req, res) => {
    const biodatas = await biodata.findAll()
    res.send(biodatas)
})

//CREATE
app.post('/register', jsonParser, async(req,res) => {
    try {
        //insert ke table user
        const dataUser = await user.create({
            username: req.body.username,
            password: req.body.password
        })
        //Insert ke table biodata
        const bio = await biodata.create({
            fullname: req.body.fullname,
            address: req.body.address,
            age: req.body.age,
            userId: dataUser.id
        })
        //insert ke table history
        const hist = await history.create({
            score: req.body.score,
            userId: dataUser.id
        })
        res.status(201).send('Data Berhasil Disimpan')
    } catch (error) {
        res.status(403).send('Data User Sudah Ada')
    }
    
})

//UPDATE
app.put('/biodata/:id', jsonParser, async(req,res) => {
    try {
        const data = await biodata.findByPk(req.params.id)
        data.fullname = req.body.fullname
        data.address = req.body.address
        data.age = req.body.age
        data.save()
        res.status(202).send('Data Telah di Edit')
    } catch (error) {
        res.status(403).send('Data Gagal Diedit')
    }
    
})

// DELETE
app.delete('/biodata/:id', async(req,res) => {
    try {
      const menu = await biodata.findByPk(req.params.id)
      menu.destroy()
      res.status(202).send('Dihapus')
    } catch (error) {
      res.status(422).send('Gagal Dihapus')
    }
  })


app.listen(6068, () => {
    console.log('APP IS RUNNING')
})