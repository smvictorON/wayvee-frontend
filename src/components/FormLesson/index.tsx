import React, { ChangeEvent, useEffect, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputDate } from '../InputDate'
import { Select } from '../Select'
import { MultiSelect } from '../MultiSelect'
import ILesson from '../../interfaces/ILesson'
import SaveIcon from '@mui/icons-material/Save';

interface LessonFormProps {
  handleSubmit: (event: any) => void;
  lessonData: ILesson;
  btnText: string
}

export const LessonForm = ({
  handleSubmit,
  lessonData,
  btnText
}: LessonFormProps) => {
  const [lesson, setLesson] = useState(lessonData || {})

  const teachers = [
    {name: "teacher1", _id: "631a3081850dd040caafb7b2"},
    {name: "teacher2", _id: "631a3081850dd040caafb7b3"},
    {name: "teacher3", _id: "631a3081850dd040caafb7b4"},
    {name: "teacher4", _id: "631a3081850dd040caafb7b5"},
  ]

  const students = [
    {name: "student1", _id: "631a3081850dd040caafb7b2"},
    {name: "student2", _id: "631a3081850dd040caafb7b3"},
    {name: "student3", _id: "631a3081850dd040caafb7b4"},
    {name: "student4", _id: "631a3081850dd040caafb7b5"},
  ]

  // useEffect(() => {
  //   if (lessonData?.birthdate) {
  //     const formattedBirthdate = moment(lessonData.birthdate).format('YYYY-MM-DD');

  //     setLesson({
  //       ...lesson,
  //       birthdate: formattedBirthdate,
  //     });
  //   }
  // }, [])

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

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleSubmit(lesson)
  }

  return (
    <S.FormContainer>
      <InputDate
        text="Data de Nascimento"
        name="date"
        handleOnChange={handleChange}
        value={lesson.date ? new Date(lesson.date).toISOString().split('T')[0] : ""}
        required={true}
      />
      <Input
        text="Inicio"
        type="time"
        name="hour_start"
        handleOnChange={handleChange}
        value={lesson.hour_start}
        required={true}
      />
      <Input
        text="Fim"
        type="time"
        name="hour_end"
        handleOnChange={handleChange}
        value={lesson.hour_end}
        required={true}
      />
      <Select
        text="Teacher"
        name="teacher"
        options={teachers}
        handleOnChange={handleSelect}
        value={lesson.teacher}
        required={true}
      />
      <MultiSelect
        text="Students"
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
      <S.SubmitButton onClick={submit}>
        {btnText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}