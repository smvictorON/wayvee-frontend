import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';
import MyPets from './components/pages/Pets/MyPets';
import AddPet from './components/pages/Pets/AddPet';
import PetDetails from './components/pages/Pets/PetDetails';
import MyAdoptions from './components/pages/Pets/MyAdoptions';

import { Message } from './components/Message'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Container } from './components/Container';

import { UserProvider } from './context/UserContext'
import EditPet from './components/pages/Pets/EditPet';

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            <Route path="/pet/myadoptions" element={<MyAdoptions />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
