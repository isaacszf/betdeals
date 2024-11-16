import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Pagination } from '../common/decorators/pagination-params.decorator';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    create(createDealDto: CreateDealDto): Promise<{
        success: boolean;
        message: any;
    }>;
    findAll(paginationParams: Pagination): Promise<{
        success: boolean;
        data: import("../common/dto/paginated-resource.dto").PaginatedResource<Partial<import("./entities/deal.entity").Deal>>;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        data?: undefined;
    }>;
    findByName(name: string, paginationParams: Pagination): Promise<{
        success: boolean;
        data: import("../common/dto/paginated-resource.dto").PaginatedResource<Partial<import("./entities/deal.entity").Deal>>;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        data?: undefined;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("./entities/deal.entity").Deal;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        data?: undefined;
    }>;
    update(id: string, UpdateDealDto: UpdateDealDto): Promise<{
        success: boolean;
        message: any;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: any;
    }>;
}
