interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface IStudent {
  _id?: string;
  name: string;
  phone: string;
  cpf: string;
  address?: Address;
  email?: string;
  rg?: string;
  birthdate?: Date;
  images?: File[];
  exams?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default IStudent;
