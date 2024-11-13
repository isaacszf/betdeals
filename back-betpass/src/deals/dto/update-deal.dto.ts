import { PartialType } from '@nestjs/mapped-types';
import { CreateDealDto } from './create-deal.dto';

export class UpdateDealDto extends PartialType(CreateDealDto) {
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
}
