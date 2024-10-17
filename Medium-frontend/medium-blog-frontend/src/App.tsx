import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUpPage'
import SignIn from './pages/SignInPage'


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<SignUp></SignUp>}></Route>
            <Route path='/signin' element={<SignIn></SignIn>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App