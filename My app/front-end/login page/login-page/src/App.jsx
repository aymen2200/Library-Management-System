import Login from './Pages/loginPage'
import { AuthProvider } from './Contexts/AuthAccept'
import { LoginProvider } from './Contexts/login'
import './App.css'

function MyApp () {
  return (
    <AuthProvider>
      <LoginProvider>
        <Login/>
      </LoginProvider>
    </AuthProvider>
  )
}

export default MyApp;