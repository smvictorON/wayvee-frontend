import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as S from '../../styles/styles-forms'
import { Input } from '../Inputs/text'
import { InputDate } from '../Inputs/date'
import { Select } from '../Select'
import { MultiSelect } from '../MultiSelect'
import ILesson from '../../interfaces/ILesson'
import SaveIcon from '@mui/icons-material/Save';
import api from '../../utils/api'
import ITeacher from '../../interfaces/ITeacher'
import IStudent from '../../interfaces/IStudent'

interface FormLessonProps {
  handleSubmit: (event: any) => void;
  lessonData: ILesson;
  buttonText: string
}

export const FormLesson = ({
  handleSubmit,
  lessonData,
  buttonText
}: FormLessonProps) => {
  const [lesson, setLesson] = useState(lessonData || {})
  const [teachers, setTeachers] = useState<ITeacher[]>([])
  const [students, setStudents] = useState<IStudent[]>([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/teachers`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setTeachers(res.data.teachers)
    })

    api.get(`/students`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setStudents(res.data.students)
    })
  }, [token])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.options[e.target.selectedIndex].value as string;
    setLesson({ ...lesson, [name]: value });
  }

  const handleMultiSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setLesson({ ...lesson, [name]: selectedOptions });
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(lesson)
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <InputDate
        text="Data da Aula"
        name="date"
        handleOnChange={handleChange}
        value={lesson.date ? new Date(lesson.date).toISOString().split('T')[0] : ""}
        required={true}
        todayIsMin
      />
      <Input
        type="time"
        text="Inicio"
        name="hour_start"
        handleOnChange={handleChange}
        value={lesson.hour_start}
        required={true}
      />
      <Input
        type="time"
        text="Fim"
        name="hour_end"
        handleOnChange={handleChange}
        value={lesson.hour_end}
        required={true}
      />
      <Select
        text="Professor"
        name="teacher"
        options={teachers}
        handleOnChange={handleSelect}
        value={lesson.teacher}
        required={true}
      />
      <MultiSelect
        text="Alunos"
        name="students"
        options={students}
        handleOnChange={handleMultiSelect}
        value={lesson.students}
        required={true}
      />
      <Input
        text="Classe"
        type="text"
        name="classroom"
        placeholder="Digite a classe"
        handleOnChange={handleChange}
        value={lesson.classroom || ""}
      />
      <Input
        text="Assunto"
        type="text"
        name="subject"
        placeholder="Digite o assunto"
        handleOnChange={handleChange}
        value={lesson.subject || ""}
      />
      <Input
        text="Observação"
        type="text"
        name="observation"
        placeholder="Digite alguma observação"
        handleOnChange={handleChange}
        value={lesson.observation || ""}
      />
      <S.SubmitButton>
        {buttonText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}