"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealValidator = void 0;
const common_1 = require("@nestjs/common");
class DealValidator {
    static validateCreate(dto) {
        if (dto.name.length < 5 || dto.name.length > 25) {
            throw new common_1.HttpException("'name' must be between 5 and 25 characters in length", common_1.HttpStatus.BAD_REQUEST);
        }
        if (dto.description.length < 5 || dto.description.length > 80) {
            throw new common_1.HttpException("'description' must be between 5 and 80 characters in length", common_1.HttpStatus.BAD_REQUEST);
        }
        if (dto.score <= 0) {
            throw new common_1.HttpException("'score' must be greater than 0", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    static validateUpdate(dto) {
        if (dto.name) {
            if (dto.name.length < 5 || dto.name.length > 100) {
                throw new common_1.HttpException("'name' must be between 5 and 100 characters in length", common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (dto.description) {
            if (dto.name.length < 5 || dto.name.length > 100) {
                throw new common_1.HttpException("'description' must be between 1 and 100 characters in length", common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
}
exports.DealValidator = DealValidator;
//# sourceMappingURL=deal-validator.js.map