import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUpPage'
import SignIn from './pages/SignInPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import AlertComponet from './components/AlertComponent'
import PublishPost from './pages/PublishPostPage'
import PublishHouse from './pages/PublishHouse'

function App() {
  return (
    <AlertComponet>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/signin' element={<SignIn></SignIn>}></Route>
          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path='/dashboard' element={<DashboardPage></DashboardPage>}></Route>
            <Route path='/publishPost' element={<PublishPost></PublishPost>}></Route>
            <Route path="/publishHouse" element={<PublishHouse></PublishHouse>}></Route>
          </Route>
          <Route path='*' element={<RouteNotFound></RouteNotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </AlertComponet>
  )
}

function RouteNotFound(){
  const navigate = useNavigate();
  return <div onClick={()=>{
    navigate("/signin")
  }}>
    Route not found
  </div>
}

export default App