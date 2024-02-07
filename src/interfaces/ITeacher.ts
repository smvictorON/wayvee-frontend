import IAddress from './IAddress'

export default interface ITeacher {
  _id: string;
  name: string;
  phone: string;
  cpf: string;
  address?: IAddress;
  email?: string;
  rg?: string;
  birthdate?: Date;
  images?: File[];
  certificates?: File[];
  createdAt?: Date;
  updatedAt?: Date;
}
