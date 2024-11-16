import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal } from './entities/deal.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/common/dto/paginated-resource.dto';
export declare class DealsService {
    private dealRepository;
    constructor(dealRepository: Repository<Deal>);
    create(createDealDto: CreateDealDto): Promise<Deal>;
    findAll({ page, limit, size, offset, }: Pagination): Promise<PaginatedResource<Partial<Deal>>>;
    findOne(id: number): Promise<Deal>;
    findByName(name: string, { page, limit, size, offset }: Pagination): Promise<PaginatedResource<Partial<Deal>>>;
    update(id: number, updateDealDto: UpdateDealDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<Deal>;
}
