export type AppScreen = 'TRANSFER' | 'CONFIRM' | 'PIN' | 'LOADING' | 'SUCCESS' | 'HISTORY';

export interface TransferData {
  fromNumber: string;
  toNumber: string;
  recipientName: string;
  amount: number;
  fees: number;
  totalAmount: number;
  greetingCard?: {
    enabled: boolean;
    template: string;
    message: string;
  };
  operationDate: string;
  operationId: string;
}

export interface Contact {
  name: string;
  maskedName: string;
  phone: string;
  avatarColor: string;
}
