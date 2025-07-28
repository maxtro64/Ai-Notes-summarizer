import { useState } from 'react'
import Navbar from './components/Navbar'
import './index.css'
// import Home from './components/Home'
import Chatbot from './components/Chatbot'
import LoginPage from './components/Login'

function App() {
  const [user, setUser] = useState(null);
 if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <>
    <div className=" [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Navbar/>
    <Chatbot/>

    </div>
    </>
  )
}

export default App
