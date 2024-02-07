import IAddress from './IAddress'

export default interface IStudent {
  _id: string;
  name: string;
  phone: string;
  cpf: string;
  address?: IAddress;
  email?: string;
  rg?: string;
  birthdate?: Date;
  images?: File[];
  exams?: File[];
  createdAt?: Date;
  updatedAt?: Date;
}

