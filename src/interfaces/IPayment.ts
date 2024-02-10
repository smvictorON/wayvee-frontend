export default interface IPayment {
  _id: string;
  date: string;
  payer: string;
  receiver: string;
  value: number;
  type: 'Receipt' | 'Payment';
  method: 'Cash' | 'Card' | 'Pix';
  status: 'Pendent' | 'Cancelled' | 'Done';
  createdAt?: Date;
  updatedAt?: Date;
}


