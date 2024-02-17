import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

//students
import { Students } from './pages/ListStudents';
import { AddStudent } from './pages/AddStudent';
import { EditStudent } from './pages/EditStudent';

//teachers
import { Teachers } from './pages/ListTeachers';
import { AddTeacher } from './pages/AddTeacher';
import { EditTeacher } from './pages/EditTeacher';

//lessons
import { Lessons } from './pages/ListLessons';
import { AddLesson } from './pages/AddLesson';
import { EditLesson } from './pages/EditLesson';

//users
import { Users } from './pages/ListUsers';
import { AddUser } from './pages/AddUser';
import { EditUser } from './pages/EditUser';

//companies
import { Companies } from './pages/ListCompanies';
import { AddCompany } from './pages/AddCompany';
import { EditCompany } from './pages/EditCompany';

//login
import { Login } from './pages/Login';
import { Register } from './pages/Register';

//payment
import { AddPayment } from './pages/AddPayment';
import { Payments } from './pages/ListPayments';

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
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/students" element={<Students />} />
            <Route path="/student/add" element={<AddStudent />} />
            <Route path="/student/edit/:id" element={<EditStudent />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/add" element={<AddCompany />} />
            <Route path="/company/edit/:id" element={<EditCompany />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teacher/add" element={<AddTeacher />} />
            <Route path="/teacher/edit/:id" element={<EditTeacher />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lesson/add" element={<AddLesson />} />
            <Route path="/lesson/edit/:id" element={<EditLesson />} />
            <Route path="/payment/:id" element={<AddPayment />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

