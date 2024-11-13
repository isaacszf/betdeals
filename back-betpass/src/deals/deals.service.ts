import { HttpException, Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal } from './entities/deal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { DealValidator } from './validators/deal-validator';
import { Pagination } from 'src/common/decorators/pagination-params.decorator';
import { PaginatedResource } from 'src/common/dto/paginated-resource.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal) private dealRepository: Repository<Deal>,
  ) {}

  async create(createDealDto: CreateDealDto) {
    DealValidator.validateCreate(createDealDto);

    const data = this.dealRepository.create(createDealDto);
    return await this.dealRepository.save(data);
  }

  async findAll({
    page,
    limit,
    size,
    offset,
  }: Pagination): Promise<PaginatedResource<Partial<Deal>>> {
    const [deals, total] = await this.dealRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      items: deals,
      totalItems: total,
      page,
      size,
    };
  }

  async findOne(id: number) {
    const data = await this.dealRepository.findOneBy({ id });
    if (!data) throw new HttpException('Deal not found', 404);

    return data;
  }

  async findByName(
    name: string,
    { page, limit, size, offset }: Pagination,
  ): Promise<PaginatedResource<Partial<Deal>>> {
    const [deals, total] = await this.dealRepository.findAndCount({
      where: [{ name: Like(`%${name.toLowerCase()}%`) }],
      take: limit,
      skip: offset,
    });

    return {
      items: deals,
      totalItems: total,
      page,
      size,
    };
  }

  async update(id: number, updateDealDto: UpdateDealDto) {
    DealValidator.validateUpdate(updateDealDto);
    return await this.dealRepository.update(id, updateDealDto);
  }

  async remove(id: number) {
    const deal = await this.findOne(id);
    return await this.dealRepository.remove(deal);
  }
}
