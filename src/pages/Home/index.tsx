import React from 'react'
import * as S from './styles'
import { BarChart } from '@mui/x-charts/BarChart';

export const Home = () => {
  return (
    <section>
      <S.Header>
        <S.HeaderTitle>Home</S.HeaderTitle>
        <S.Paragraph>Veja as principais informações do negócio!</S.Paragraph>
      </S.Header>

      <S.Container>
        <S.Item>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] }]}
            series={[{ data: [4, 3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 5],  label: "Total de Aulas Agendadas por Mês" }]}
            width={500}
            height={300}
          />
        </S.Item>
        <S.Item>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] }]}
            series={[{ data: [4, 3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 5],  label: "Total de Aulas Canceladas por Mês", color:"#ff4c4c" }]}
            width={500}
            height={300}
          />
        </S.Item>
        <S.Item>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] }]}
            series={[{ data: [4, 3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 5],  label: "Total de Alunos Cadastros por Mês", color:"#0097FE" }]}
            width={500}
            height={300}
          />
        </S.Item>
        <S.Item>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] }]}
            series={[{ data: [4, 3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 5],  label: "Total Pagamentos/Recebimentos por Mês", color:"#00af5a" }]}
            width={500}
            height={300}
          />
        </S.Item>
      </S.Container>

    </section>
  )
}