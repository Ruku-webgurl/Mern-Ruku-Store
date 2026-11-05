import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen bg-[#fffafb] text-gray-800 flex flex-col font-sans antialiased selection:bg-pink-100 selection:text-pink-600">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navigation />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default App
