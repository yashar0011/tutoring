import { useState, useEffect } from 'react';
import './App.css';

interface Message {
  user: string;
  text: string;
  id?: number;
}

function App() {
  const [personA, setPersonA] = useState<Message>({ user: '', text: '' });
  const [personB, setPersonB] = useState<Message>({ user: '', text: '' });
  const [data, setData] = useState<Message[]>([]);

  const updateTextA = (event: any) => {
    setPersonA({ ...personA, text: event.target.value });
  };

  const updateTextB = (event: any) => {
    setPersonB({ ...personB, text: event.target.value });
  };

  const addMessageA = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:3000/save-data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: 'Yashar', text: personA.text, id: Math.random() }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setPersonA({ user: '', text: '' })
      })
      .catch((err) => console.log('Error in line 37:', err));
  };

  const addMessageB = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:3000/save-data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: 'Aylar', text: personB.text, id: Math.random() }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setPersonB({ user: '', text: '' })
      })
      .catch((err) => console.log('Error in line 54:', err));
  };

  const deleteAllMessages = () => {
    fetch('http://localhost:3000/messages', {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setData([]);
      })
      .catch((error) => console.error('Error deleting all messages:', error));
  };

  const deleteMessage = (id: number) => {
    fetch(`http://localhost:3000/messages/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(`Message with id ${id} deleted successfully`);
          setData(data);
        }
      })
      .catch((error) => console.error(`Error deleting message with id ${id}:`, error));
  };

  useEffect(() => {
    fetch('http://localhost:3000/Yashar', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);

  useEffect(() => {
    if (data.length < 2) return;

    const lastMessage = data[data.length - 2];
    const newMessage = data[data.length - 1];

    if (lastMessage.user === newMessage.user && lastMessage.text === newMessage.text) {
      alert('Please stop spam!');
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 10){
      deleteAllMessages()
      
    }
  })

  const refresh = () => {
    fetch('http://localhost:3000/Yashar', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Refreshed successfully');
        setData(data);
      })
      .catch((error) => console.error('Error refreshing messages:', error));
  };

  return (
    <>
      <input type="button" value="Refresh" onClick={refresh} />
      <input type="button" value="Remove All" onClick={deleteAllMessages} />

      <ul>
        {data.map((message: Message) => (
          <li key={message.id}>
            {message.user} Said: {message.text}
            <button onClick={() => deleteMessage(message.id!)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        Yashar's message{' '}
        <input type="text" value={personA.text} onChange={updateTextA} />
        <input type="submit" value="Submit" onClick={addMessageA} />
      </div>
      <div>
        Aylar's message{' '}
        <input type="text" value={personB.text} onChange={updateTextB} />
        <input type="submit" value="Submit" onClick={addMessageB} />
      </div>
    </>
  );
}

export default App;
