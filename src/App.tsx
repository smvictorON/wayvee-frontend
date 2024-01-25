import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { AddStudent } from './pages/AddStudent';
import { EditStudent } from './pages/EditStudent';
import { MyPets } from './pages/MyPets';
import { MyAdoptions } from './pages/MyAdoptions';
import { PetDetails } from './pages/PetDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Message } from './components/Message';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Container } from './components/Container';

import { UserProvider } from './context/UserContext';

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
            <Route path="/student/add" element={<AddStudent />} />
            <Route path="/student/edit/:id" element={<EditStudent />} />
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
