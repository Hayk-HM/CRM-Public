import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import socket from 'socket.io'
import Pusher from 'pusher'

import authRouter from './router/authRouter.js'
import usersRouter from './router/usersRouter.js'
import taskRouter from './router/taskRouter.js'
import chatRouter from './router/chatRouter.js'

import Messages from './models/dbmessages.js'


dotenv.config()
const app = express()
const server = http.createServer(app)

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/task', taskRouter)
app.use('/chat', chatRouter)
app.get('/', (req, res) => {
  console.log('CRM HEROKU');
})


//-------------------------------------------Chat block With Pusher----------------------------------



// const pusher = new Pusher({
//   appId: "1198125",
//   key: "8d7a83069c1d1e1f1384",
//   secret: "46f3b60ffd41f6032aef",
//   cluster: "eu",
//   useTLS: true
// });

// const db = mongoose.connection

// db.once('open', () => {
//   console.log('DB  connected');

//   const msgCollection = db.collection('messagecontents')
//   const changeStream = msgCollection.watch()

//   changeStream.on('change', (change) => {
//     console.log(change);

//     if (change.operationType === 'insert') {
//       const messageDetails = change.fullDocument;
//       pusher.trigger('message', 'inserted', {
//         name: messageDetails.name,
//         message: messageDetails.message,
//         timestamp: messageDetails.timestamp,
//         received: messageDetails.received
//       })
//     } else {
//       console.log('Error triggering pusher');
//     }
//   })
// })

// app.get('/main', (req, res) => res.status(200).send("Hello from server"))

// app.get('/main/message/sync', (req, res) => {
//   Messages.find((err, data) => {
//     if (err) {
//       res.status(500).send(err)
//     } else {
//       res.status(200).send(data)
//     }
//   })

// })

// app.post('/main/message/new', (req, res) => {
//   const dbMessage = req.body
//   console.log(req.body);
//   Messages.create(dbMessage, (err, data) => {
//     if (err) {
//       res.status(500).send(err)
//     } else {
//       res.status(201).send(data)
//     }
//   })
// })

//------------------------------------------------------------------------------------------------


//----------------------------------------socket.io-----------------------------------------------

// const io = socket(server)

// io.on('connect', (socket) => {
//   //console.log(socket.id);

//   socket.on('join_room', (data) => {
//     socket.join(data)
//     console.log(`User joined room ${data}`);
//   })

//   socket.on('send_message', (data) => {
//     socket.broadcast.to(data.room).emit('receive_message', data)

//     console.log('AAAA------', data);

//   })


//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   })
// })

//------------------------------------------------------------------------------------------------


const io = socket(server)

io.on('connect', (socket) => {

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`User joined room ${data}`);
  })

  socket.on('send_message', (data) => {
    socket.broadcast.to(data.room).emit('receive_message', data)

    //console.log('AAAA------', data);
    // const dbMessage = {
    //   message: data.message,
    //   user: data.user,
    //   room: data.room
    // }

  })


  socket.on('disconnect', () => {
    console.log('Client disconnected');
  })
})

//------------------------------------------------------------------------------------------------

const CONNECTION_URL = `mongodb+srv://JSProject:Manv159Manv@cluster0.tcdje.mongodb.net/CRM?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
