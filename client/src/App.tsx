import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestmesaage,setLatestmessage] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.onopen = () => {
      console.log('Connection established');
      socket.send('Hello Server!');
    }
    socket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestmessage(message.data);
    }
    setSocket(socket);
    return () => socket.close();
  }, [])

   if(!socket) {return <div>
    connecting to server...
   </div>
   }
   
  return (
    <>
   <input onChange={(e)=>setMessage(e.target.value)} />
   <button onClick={()=>socket.send(message)}>send message</button>
   {latestmesaage}
    </>
  )
}

export default App