import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUpPage'
import SignIn from './pages/SignInPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import AlertComponet from './components/AlertComponent'
import PublishPost from './pages/PublishPostPage'


function App() {
  return (
    <AlertComponet>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/signin' element={<SignIn></SignIn>}></Route>
          <Route path='/dashboard' element={<ProtectedRoute>
            <DashboardPage></DashboardPage>
          </ProtectedRoute>}></Route>
          <Route path='/publishPost' element={<PublishPost></PublishPost>}></Route>
        </Routes>
      </BrowserRouter>
    </AlertComponet>
  )
}

export default App