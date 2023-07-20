const restify = require('restify');
// const port = process.env.PORT || 3000;
const server = restify.createServer({
    name: 'server coba',
    version: '1.0.0'
})

const users = [
    { id: 1, name: 'fulan' },
    { id: 2, name: 'doni'}
]

server.use(restify.plugins.bodyParser())// agar bisa melihat user yg ditambhkan dari postman
server.use(restify.plugins.queryParser())// untuk mendapatkan query dalam bentuk objekk

// const ensureAuth = (req, res, next) => { //midleware tanpa parameter
//     //console.log('Info ini auth');
//     if(req.headers.authorization === '1'){
//         next();
//     }else{
//         res.send(401, { message : 'tidak boleh masuk'})
//     }

//     //next();//menggunakan auth secara global
// }

const ensureAuth = (idCard) => {//midleware dengan parameter
    return (req, res, next) => { 
        //console.log('Info ini auth');
        if(req.headers.authorization === idCard){
            next();
        }else{
            res.send(401, { message : 'tidak boleh masuk'})
        }
    }
    //next();//menggunakan auth secara global
}

//server.use(ensureAuth);


// localhost:3000/blog/restify?filterBy=name&sortOrder=asc&max=7
// *Cara Menggunakan req.params dan req.query Di Restify
// server.get('/blog/*', (req, res, next) => {
//     const paramList = ['category','year','month','day','title'];
//     const params = req.params['*'].split('/');
//     const objParams = {};
//     params.forEach((param, index) => {
//         if(index < paramList.length){
//             objParams[paramList[index]] = param;
//         }
//     })
//     res.send(200, { params: objParams, query: req.query});
// })

server.get('/blog/*', (req, res, next) => {
    const { userId } = req.query;
    const user =  users.filter(user => user.id === +userId)[0]
    if(!user){
        return res.send(404, {message: `user with ${userId} tidak ada`})
    }
    const message = 'sukses';
    res.send(200, {message, data: user });
})

server.get('/', function (req, res, next) { // cek server
    res.send(200, 'Server  OK')
})

// server.get('/api/v1/users', function (req, res, next) { // menampilkan data semua users
//     res.send(200, users)
// })

server.get('/api/v1/users', ensureAuth('1'), function (req, res, next) { // menampilkan data semua users dengan menggunakan midleware dengan idCardnya 1
    res.send(200, users)
})

// server.get('/api/v1/users/:id', function (req, res, next) {// menampilkan users berdasarkan id
//     console.log(req.params.id)
//     const user = users.filter(user => user.id === +req.params.id)[0]
//     if(!user){
//         return res.send(404, { message: `users dengan id ${req.params.id} tidak ada` })
//     }
//     res.send(200, user)
// })

server.get('/api/v1/users/:id', ensureAuth('2'), function (req, res, next) { // edit users dengan menggunakan midleware dengan idCardnya 2
    console.log(req.params.id)
    const user = users.filter(user => user.id === +req.params.id)[0]
    if(!user){
        return res.send(404, { message: `users dengan id ${req.params.id} tidak ada` })
    }
    res.send(200, user)
})

server.post('/api/v1/users', function (req, res, next){ // create users
    const user = {id: users.length + 1, name:req.body.name}
    users.push(user);
    res.send(200, user);
})

server.put('/api/v1/users/:id',  function (req, res, next) { //edit user
    const userId = +req.params.id;
    const { name } = req.body;
    const indexUser = users.findIndex(user => user.id === userId);
    console.log("index user : "+ indexUser);
    users[indexUser].name = name;
    console.log(users[indexUser]);
    res.send(200, users[indexUser]);

})

server.del('/api/v1/users/:id',  function (req, res, next){//delete users
    const userId = +req.params.id;
    const indexUser = users.findIndex(user => user.id === userId);
    if(indexUser === -1){
        return res.send(404, { message: `users dengan id ${req.params.id} tidak ada` })
    }
    users.splice(indexUser, 1);
    res.send(200, { message : 'berhasil'});
})

server.listen(port, () => {
    console.log(`server is up on port ${port} with name ${server.name} and URI ${server.url} `)
})
