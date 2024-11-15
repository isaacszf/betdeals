import { Like, Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';

import { DealsService } from '../../src/deals/deals.service';
import { Deal } from '../../src/deals/entities/deal.entity';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findAndCount: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('DealsService', () => {
  let dealsService: DealsService;
  let dealRepository: jest.Mocked<Repository<Deal>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DealsService,
        {
          provide: getRepositoryToken(Deal),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    dealsService = module.get(DealsService);
    dealRepository = module.get(getRepositoryToken(Deal));
  });

  it('should be defined', () => expect(dealsService).toBeDefined());

  describe('create', () => {
    it('should be able to create and save a deal', async () => {
      const dto = {
        name: 'Casa 1',
        description: 'Descrição da Casa 1',
        score: 5,
        isExhausted: true,
      };
      const deal: Deal = { id: 1, ...dto, createdAt: new Date() };

      dealRepository.create.mockReturnValue(deal);
      dealRepository.save.mockResolvedValue(deal);

      const res = await dealsService.create(dto);

      expect(dealRepository.create).toHaveBeenCalledWith(dto);
      expect(dealRepository.save).toHaveBeenCalledWith(deal);
      expect(res).toEqual(deal);
    });
  });

  describe('findAll', () => {
    it('should be able to return paginated deals', async () => {
      const pagination = { page: 1, limit: 10, size: 10, offset: 0 };
      const deals: Deal[] = [
        {
          id: 1,
          name: 'Casa 1',
          description: 'Descrição da Casa 1',
          score: 5,
          isExhausted: true,
          createdAt: new Date(),
        },
      ];
      const total = 1;

      dealRepository.findAndCount.mockResolvedValue([deals, total]);

      const res = await dealsService.findAll(pagination);

      expect(dealRepository.findAndCount).toHaveBeenCalledWith({
        take: pagination.limit,
        skip: pagination.offset,
        order: { createdAt: 'DESC' },
      });
      expect(res).toEqual({
        items: deals,
        totalItems: total,
        page: pagination.page,
        size: pagination.size,
      });
    });

    it('should be able to return paginated deals by name', async () => {
      const pagination = { page: 1, limit: 10, size: 10, offset: 0 };
      const deals: Deal[] = [
        {
          id: 1,
          name: 'Casa 1',
          description: 'Descrição da Casa 1',
          score: 5,
          isExhausted: true,
          createdAt: new Date(),
        },
      ];
      const total = 1;
      const name = 'Casa';

      dealRepository.findAndCount.mockResolvedValueOnce([deals, total]);

      const res = await dealsService.findByName(name, pagination);

      expect(dealRepository.findAndCount).toHaveBeenCalledWith({
        where: [{ name: Like(`%${name.toLowerCase()}%`) }],
        take: pagination.limit,
        skip: pagination.offset,
        order: { createdAt: 'DESC' },
      });
      expect(res).toEqual({
        items: deals,
        totalItems: total,
        page: pagination.page,
        size: pagination.size,
      });
    });
  });

  describe('findOne', () => {
    it('should be able to return one single deal by its id', async () => {
      const deal: Deal = {
        id: 1,
        name: 'Casa 1',
        description: 'Descrição da Casa 1',
        score: 5,
        isExhausted: false,
        createdAt: new Date(),
      };

      dealRepository.findOneBy.mockResolvedValue(deal);

      const res = await dealsService.findOne(1);

      expect(dealRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(res).toEqual(deal);
    });
  });

  describe('update', () => {
    it('should be able to update a deal', async () => {
      const id = 1;
      const updateDealDto = {
        name: 'Casa editada',
      };

      dealRepository.update.mockResolvedValue({ affected: 1 } as any);

      const res = await dealsService.update(id, updateDealDto as any);

      expect(dealRepository.update).toHaveBeenCalledWith(id, updateDealDto);
      expect(res).toEqual({ affected: 1 });
    });

    it('should throw an error if deal is not found', async () => {
      dealRepository.findOneBy.mockResolvedValue(null);
      await expect(dealsService.remove(1)).rejects.toThrow(HttpException);
    });
  });

  describe('delete', () => {
    it('should be able to delete a deal', async () => {
      const deal: Deal = {
        id: 1,
        name: 'Casa 1',
        description: 'Descrição da Casa 1',
        score: 5,
        isExhausted: false,
        createdAt: new Date(),
      };

      dealRepository.findOneBy.mockResolvedValue(deal);
      dealRepository.remove.mockResolvedValue(deal);

      const res = await dealsService.remove(1);

      expect(dealRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(dealRepository.remove).toHaveBeenCalledWith(deal);
      expect(res).toEqual(deal);
    });

    it('should throw an error if deal is not found', async () => {
      dealRepository.findOneBy.mockResolvedValue(null);
      await expect(dealsService.remove(1)).rejects.toThrow(HttpException);
    });
  });
});
