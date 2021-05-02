import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import {ClientWebSocket} from './websocket/client';
import './App.css';

// let socket;
const clientWebSocket = new ClientWebSocket();

function App() {
  const [name, setName] = useState('teste');
  const [email, setEmail] = useState('teste@teste.com');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [attendantMessage, setAttendantMessage] = useState({});
  const [dataClient, setDataClient] = useState({});

  const handleAccessClient = () => {
    const params = {
      name,
      email,
      from: clientWebSocket.id
    }
    setDataClient(params);
    clientWebSocket.emit('access_client', params);
  }

  const handleSubmitMessage = () => {
    // console.log(attendantWebSocket.id);
    // console.log(client);
    const messageToShow = {
      text: message,
      hour: '20:00',
      isAttendant: false,
      to: attendantMessage.from,
      from: clientWebSocket.id
    };

    setMessages([...messages, ...[messageToShow]]);

    clientWebSocket.emit('delivery_message_to_attendant', messageToShow);

  }

  const handleCloseChat = () => {
    clientWebSocket.emit('client_disconnect', dataClient);
    clientWebSocket.close();
  }

  useEffect(() => {
    clientWebSocket.on('recieve_message_of_attendant', (params)=>{
      setAttendantMessage(params);
    })
  }, []);

  useEffect(() => {
    setMessages([...messages, ...[attendantMessage]]);
  }, [attendantMessage])

  return (
    <div>
      <h1>Chat cliente</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* <button onClick={() => handleConnectChat()}>Conectar</button> */}
      <button onClick={() => handleAccessClient()}>Solicitar atendimento</button>
      <button onClick={() => handleCloseChat()}>Encerrar atendimento</button>

      <br />
      <br />
      <br />
      <br />

      <div style={{display: 'flex'}}>
        <div>
          <h3>Você está sendo atendido por:</h3>
          <p>Rafael Estevam</p>
        </div>
        <div>
          <div style={{display: 'block', maxHeight: '600px', width: '400px', overflowX: 'hidden', overFlowY: 'auto', height:'400px', border: '1px solid #ddd'}}> 
            {messages?.map((item) => (
              <div style={{background: item.isAttendant && '#fc3'}}>
                <p>{item.text}</p>
                <small>{item.hour}</small>
              </div>
            ))}
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <textarea rows="8" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Sua mensagem"></textarea>
            <button onClick={() => handleSubmitMessage()}>Enviar mensagem</button>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default App;