import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashBoard from './components/DashBoard';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UserList from './features/users/UserList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<DashBoard />}>
          <Route index element={<Welcome />} />
          <Route path='notes'>
            <Route index element={<NotesList />} />
          </Route>
          <Route path='users'>
            <Route index element={<UserList />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  )
}

export default App;
