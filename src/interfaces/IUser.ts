export default interface IUser {
  _id: string
  name: string
  email: string,
  phone: string,
  password: string
  company: string
  image?: File[]
}