import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import io from 'socket.io-client'
import * as Yup from 'yup';
import Pusher from 'pusher-js'
import {
  Paper,
  Container,
  Button,
  TextField,
  FormHelperText,
  Grid
} from "@material-ui/core";

import { chatActions, createChatAction } from "../../../redux/actions/chatActions";
import useStyles from './Style'

const CONNECTION_PORT = 'localhost:5000'
let socket;

const Chat = ({ user, room }) => {
  //-----------------------------With Pusher----------------------------------
  // useEffect(() => {
  //   const pusher = new Pusher('8d7a83069c1d1e1f1384', {
  //     cluster: 'eu'
  //   });

  //   const channel = pusher.subscribe('message');
  //   channel.bind('inserted', (newMessage) => {
  //     alert(JSON.stringify(newMessage));
  //   });

  //   return () => {
  //     channel.unbind_all()
  //     channel.unsubscribe()
  //   }
  // }, [])

  //-----------------------------------------------------------------------------

  //-----------------------------socket.io---------------------------------------

  // const [loggedIn, setLoggedIn] = useState(false)
  // const [message, setMessage] = useState('')
  // const [messageList, setMessageList] = useState([])

  // // console.log('USER', user);
  // // console.log('ROOM', room);

  // useEffect(() => {
  //   socket = io(CONNECTION_PORT)
  //   socket.emit('join_room', room)

  // }, [CONNECTION_PORT, room])

  // useEffect(() => {
  //   socket.on('receive_message', (data) => {
  //     setMessageList([...messageList, data])
  //   })
  // })

  // const sendMessage = (message) => {
  //   const messageContent = {
  //     room: room,
  //     content: {
  //       author: user.result.fullName,
  //       message: message,
  //     }
  //   }

  //   socket.emit('send_message', messageContent)
  //   setMessageList([...messageList, messageContent.content])
  //   setMessage("")
  // }

  //-------------------------------------------------------------------------------------------

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    socket = io(CONNECTION_PORT)
    socket.emit('join_room', room)
  }, [CONNECTION_PORT, room])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      dispatch(chatActions.createChat(data))
    })
  })

  return (
    <>
      <Container content className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Formik
            enableReinitialize
            initialValues={{ message: '' }}
            validationSchema={Yup.object().shape({ message: Yup.string().max(255).required('Enter message'), })}
            onSubmit={(values, handleChange) => {
              const messageContent = {
                room: room,
                content: {
                  author: user.result.fullName,
                  message: values.message,
                }
              }

              socket.emit('send_message', messageContent)
              dispatch(chatActions.createChat(messageContent))
            }}
          >
            {
              ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container className={classes.mainGrig}>
                    <Grid item>
                      <TextField
                        className={classes.inputGrig}
                        error={Boolean(touched.message && errors.message)}
                        fullWidth
                        helperText={touched.message && errors.message}
                        margin="normal"
                        name="message"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.message}
                        variant="outlined"
                      />
                      {Boolean(touched.policy && errors.policy) && (
                        <FormHelperText error> {errors.policy} </FormHelperText>
                      )}
                    </Grid>
                    <Grid item>
                      <Button color="primary" fullWidth size="large" type="submit" variant="contained" className={classes.button}>
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
          </Formik>
        </Paper>
      </Container>



      {/* {//-----------------------------socket.io---------------------------------------
        messageList.map(message => {
          return <div>
            <div>{message.author}</div>
            <div>{message.message}</div>
          </div>
        })
      }
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send message</button> 

      //----------------------------------------------------------------------------------*/}
    </>
  )
}

export default Chat