export type Deal = {
  id: number;
  name: string;
  description: string;
  bettingHouse: string;
  affiliate: string;
  revenueSharePercentage: number;
  value: number;
  type: string;
  status: string;
  currency: string;
  paymentCycle: string;
  createdAt: Date;
  updated?: Date;
};
