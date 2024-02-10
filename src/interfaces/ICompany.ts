export default interface ICompany {
  _id: string
  name: string
  email: string,
  phone: string,
  cnpj: string
  image?: File[]
}