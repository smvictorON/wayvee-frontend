import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';

//pages
import { ListStudents, AddStudent, EditStudent, InfoStudent  } from './pages/Students';
import { ListTeachers, AddTeacher, EditTeacher, InfoTeacher  } from './pages/Teachers';
import { ListCompanies, AddCompany, EditCompany, ProfileCompany } from './pages/Companies';
import { ListUsers, AddUser, EditUser, ProfileUser } from './pages/Users';
import { ListPayments, AddPayment, EditPayment } from './pages/Payments';
import { ListLessons, AddLesson, EditLesson  } from './pages/Lessons';

import { Login } from './pages/Login';
import { Register } from './pages/Register';

//components
import { Message } from './components/Message';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Container } from './components/Container';

import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<ProfileUser />} />
            <Route path="/company/profile" element={<ProfileCompany />} />

            <Route path="/students" element={<ListStudents />} />
            <Route path="/student/add" element={<AddStudent />} />
            <Route path="/student/edit/:id" element={<EditStudent />} />
            <Route path="/student/info/:id" element={<InfoStudent />} />

            <Route path="/users" element={<ListUsers />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />

            <Route path="/companies" element={<ListCompanies />} />
            <Route path="/company/add" element={<AddCompany />} />
            <Route path="/company/edit/:id" element={<EditCompany />} />

            <Route path="/teachers" element={<ListTeachers />} />
            <Route path="/teacher/add" element={<AddTeacher />} />
            <Route path="/teacher/edit/:id" element={<EditTeacher />} />
            <Route path="/teacher/info/:id" element={<InfoTeacher />} />

            <Route path="/lessons" element={<ListLessons />} />
            <Route path="/lesson/add" element={<AddLesson />} />
            <Route path="/lesson/edit/:id" element={<EditLesson />} />

            <Route path="/payments" element={<ListPayments />} />
            <Route path="/payment/:id" element={<AddPayment />} />
            <Route path="/payment/edit/:id" element={<EditPayment />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

