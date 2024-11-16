"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationParams = void 0;
const common_1 = require("@nestjs/common");
exports.PaginationParams = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    if (isNaN(page) || page < 0 || isNaN(size) || size < 0) {
        throw new common_1.HttpException('Invalid pagination params', common_1.HttpStatus.BAD_REQUEST);
    }
    if (size > 100) {
        throw new common_1.HttpException('Invalid pagination params: Max size is 100', common_1.HttpStatus.BAD_REQUEST);
    }
    const limit = size;
    const offset = (page - 1) * limit;
    return { page, limit, size, offset };
});
//# sourceMappingURL=pagination-params.decorator.js.map