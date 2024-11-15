import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateDealDto } from '../dto/create-deal.dto';
import { UpdateDealDto } from '../dto/update-deal.dto';

export class DealValidator {
  static validateCreate(dto: CreateDealDto) {
    if (dto.name.length < 5 || dto.name.length > 25) {
      throw new HttpException(
        "'name' must be between 5 and 25 characters in length",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.description.length < 5 || dto.description.length > 80) {
      throw new HttpException(
        "'description' must be between 5 and 80 characters in length",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.score <= 0) {
      throw new HttpException(
        "'score' must be greater than 0",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  static validateUpdate(dto: UpdateDealDto) {
    if (dto.name) {
      if (dto.name.length < 5 || dto.name.length > 100) {
        throw new HttpException(
          "'name' must be between 5 and 100 characters in length",
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (dto.description) {
      if (dto.name.length < 5 || dto.name.length > 100) {
        throw new HttpException(
          "'description' must be between 1 and 100 characters in length",
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
