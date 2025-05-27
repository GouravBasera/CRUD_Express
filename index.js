import express from 'express'

const app = express()

app.use(express.json());

const port = 3000

const userDatabase = []

// Get user from database
app.get('/', (req, res) => {
    if (userDatabase.length === 0) {
        return res.status(404).send("No Active Users Found")
    } else {
        res.status(200).send(userDatabase)
    }
})

// Add User to Database 
app.post('/addUser', (req, res) => {
    const {username, password} = req.body
    const uniqueId = parseInt(Math.floor(Math.random() * 1000))
    const userObject = {uniqueId, username, password}
    userDatabase.push(userObject)
    res.status(200).send(`User: ${username} saved in database with UniqueID: ${uniqueId}`)
})

// Update User in Database
app.put('/updateUser/:id', (req, res) => {
    const userId = req.params.id
    const user = userDatabase.find(u => u.uniqueId === parseInt(userId))
    if(!user){
        return res.status(404).send("No User Found with Given ID to Update")
    }
    user.username = req.body.username
    user.password = req.body.password
    res.status(200).send(`New Username: ${req.body.username} & Password: ${req.body.password}`)
})

// Delete User from Database
app.delete('/deleteUser/:username', (req, res) => {
    const userIndex = userDatabase.indexOf(u => u.username == req.params.username)
    if(!userIndex){
        res.status(404).send(`No user found with username ${req.params.username}`)
    } else {
        userDatabase.splice(userIndex, 1)
        res.status(200).send(`User removed with username ${req.params.username}`)
    }
})

app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
})