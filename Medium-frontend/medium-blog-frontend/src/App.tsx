import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUpPage'
import SignIn from './pages/SignInPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import AlertComponet from './components/AlertComponent'
import PublishPost from './pages/PublishPostPage'
import PublishHouse from './pages/PublishHouse'
import { useSetRecoilState } from 'recoil'
import { EmailIdAtom, FirstNameAtom, LastNameAtom, PasswordAtom } from './state-store/auth-store'

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

function RouteNotFound() {
  const navigate = useNavigate();
  const setFirstName = useSetRecoilState(FirstNameAtom);
  const setLastName = useSetRecoilState(LastNameAtom);
  const setEmailId = useSetRecoilState(EmailIdAtom);
  const setPassword = useSetRecoilState(PasswordAtom);
  return <div onClick={() => {
    setFirstName(undefined);
    setLastName(undefined);
    setEmailId(undefined);
    setPassword(undefined);
    navigate("/signin")
  }} className='flex flex-col h-screen justify-center bg-slate-400'>
    <div className='flex justify-center'>
      <div className='w-1/2 h-96 bg-slate-800 text-center flex flex-col justify-center text-4xl font-bold text-white p-2 rounded-2xl'>
        {`System.out.println("ERROR 404 ! NOT FOUND")`}
      </div>
    </div>
  </div>
}

export default App