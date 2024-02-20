export default interface IPayment {
  _id: string;
  date: string;
  person: string;
  value: number;
  type: string;
  method: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const PaymentTypes: any[] = [
  { name: "Recebimento", _id: "Receipt" },
  { name: "Pagamento", _id: "Payment" },
]

export const PaymentMethods: any[] = [
  { name: "Dinheiro", _id: "Cash" },
  { name: "Cartão", _id: "Card" },
  { name: "Pix", _id: "Pix" },
  { name: "Cheque", _id: "Check" },
]
