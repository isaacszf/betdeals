import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import {
  Pagination,
  PaginationParams,
} from '../common/decorators/pagination-params.decorator';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  async create(@Body() createDealDto: CreateDealDto) {
    try {
      await this.dealsService.create(createDealDto);

      return {
        success: true,
        message: 'Deal created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll(@PaginationParams() paginationParams: Pagination) {
    try {
      const data = await this.dealsService.findAll(paginationParams);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('/names/:name')
  async findByName(
    @Param('name') name: string,
    @PaginationParams() paginationParams: Pagination,
  ) {
    try {
      const data = await this.dealsService.findByName(name, paginationParams);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.dealsService.findOne(+id);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateDealDto: UpdateDealDto) {
    try {
      await this.dealsService.update(+id, UpdateDealDto);
      return {
        success: true,
        message: 'Deal updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.dealsService.remove(Number(id));
      return {
        success: true,
        message: 'Deal deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
