import { CreateDealDto } from '../dto/create-deal.dto';
import { UpdateDealDto } from '../dto/update-deal.dto';
export declare class DealValidator {
    static validateCreate(dto: CreateDealDto): void;
    static validateUpdate(dto: UpdateDealDto): void;
}
