"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const deal_entity_1 = require("./entities/deal.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const deal_validator_1 = require("./validators/deal-validator");
let DealsService = class DealsService {
    constructor(dealRepository) {
        this.dealRepository = dealRepository;
    }
    async create(createDealDto) {
        deal_validator_1.DealValidator.validateCreate(createDealDto);
        const data = this.dealRepository.create(createDealDto);
        return await this.dealRepository.save(data);
    }
    async findAll({ page, limit, size, offset, }) {
        const [deals, total] = await this.dealRepository.findAndCount({
            take: limit,
            skip: offset,
            order: {
                createdAt: 'DESC',
            },
        });
        return {
            items: deals,
            totalItems: total,
            page,
            size,
        };
    }
    async findOne(id) {
        const data = await this.dealRepository.findOneBy({ id });
        if (!data)
            throw new common_1.HttpException('Deal not found', 404);
        return data;
    }
    async findByName(name, { page, limit, size, offset }) {
        const [deals, total] = await this.dealRepository.findAndCount({
            where: [{ name: (0, typeorm_2.Like)(`%${name.toLowerCase()}%`) }],
            take: limit,
            skip: offset,
            order: {
                createdAt: 'DESC',
            },
        });
        return {
            items: deals,
            totalItems: total,
            page,
            size,
        };
    }
    async update(id, updateDealDto) {
        deal_validator_1.DealValidator.validateUpdate(updateDealDto);
        return await this.dealRepository.update(id, updateDealDto);
    }
    async remove(id) {
        const deal = await this.findOne(id);
        return await this.dealRepository.remove(deal);
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deal_entity_1.Deal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DealsService);
//# sourceMappingURL=deals.service.js.map