import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/Home'
import AddTask from './pages/AddTask'
import LoginButton from './pages/Login'
import LogoutButton from './pages/Logout'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addTask' element={<AddTask />} />
          <Route path='/login' element={<LoginButton />} />

          <Route path='/logout' element={<LogoutButton />} />
          <Route path='/user' element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  )
}

export default App
