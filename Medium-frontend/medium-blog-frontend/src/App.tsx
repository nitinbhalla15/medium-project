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
  return <div className='flex flex-col h-screen justify-center bg-slate-400'>
    <div className='flex justify-center'>
      <div className='w-1/2 h-96 bg-slate-800 text-center flex flex-col justify-center  p-2 rounded-2xl'>
        <div className='text-3xl font-bold text-white'>
          {`System.out.println ("ERROR 404 ! ROUTE NOT FOUND") `}
        </div>
        <div className='text-black mt-10 text-xl flex justify-center'>
          <div className='w-1/2 bg-white p-2 cursor-pointer' onClick={() => {
            setFirstName(undefined);
            setLastName(undefined);
            setEmailId(undefined);
            setPassword(undefined);
            {(localStorage.getItem("jwtToken")!=undefined || localStorage.getItem("jwtToken")!=null)?navigate('/dashboard'):navigate('/signin')}
          }} >
            Take me home !
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default App