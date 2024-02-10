export default interface IPayment {
  _id: string;
  date: string;
  payer: string;
  receiver: string;
  value: number;
  type: string;
  method: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const PaymentTypes: string[] = [
  "Receipt",
  "Payment",
]

export const PaymentMethods: string[] = [
  "Cash",
  "Card",
  "Pix",
  "Check",
]
