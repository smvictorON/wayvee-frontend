interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface ITeacher {
  _id?: string;
  name: string;
  phone: string;
  cpf: string;
  address?: Address;
  email?: string;
  rg?: string;
  birthdate?: Date;
  images?: string[];
  certificates?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default ITeacher;
