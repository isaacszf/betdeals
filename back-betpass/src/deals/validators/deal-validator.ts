import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateDealDto } from '../dto/create-deal.dto';
import { UpdateDealDto } from '../dto/update-deal.dto';

export class DealValidator {
  static validateCreate(dto: CreateDealDto) {
    if (dto.name.length < 5 || dto.name.length > 100) {
      throw new HttpException(
        "'name' must be between 5 and 100 characters in length",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.description || dto.description.trim().length === 0) {
      throw new HttpException(
        "'description' cannot be empty",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!dto.bettingHouse || dto.bettingHouse.trim().length === 0) {
      throw new HttpException(
        "'bettingHouse' cannot be empty",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.affiliate || dto.affiliate.trim().length === 0) {
      throw new HttpException(
        "'affiliate' cannot be empty",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.revenueSharePercentage < 0 || dto.revenueSharePercentage > 100) {
      throw new HttpException(
        "'revenueSharePercentage' must be between 0 and 100",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.value <= 0) {
      throw new HttpException(
        "'value' must be greater than 0",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.type || dto.type.trim().length === 0) {
      throw new HttpException("'type' cannot be empty", HttpStatus.BAD_REQUEST);
    }

    if (!dto.status || dto.status.trim().length === 0) {
      throw new HttpException(
        "'status' cannot be empty",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.currency || dto.currency.trim().length === 0) {
      throw new HttpException(
        "'currency' cannot be empty",
        HttpStatus.BAD_REQUEST,
      );
    }

    const validPaymentCycles = ['semanal', 'mensal', 'quaternal', 'anual'];
    if (!dto.paymentCycle || !validPaymentCycles.includes(dto.paymentCycle)) {
      throw new HttpException(
        `'paymentCycle' must be one of the following values: ${validPaymentCycles.join(', ')}`,
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

    if (dto.revenueSharePercentage) {
      if (dto.revenueSharePercentage < 0 || dto.revenueSharePercentage > 100) {
        throw new HttpException(
          "'revenueSharePercentage' must be between 0 and 100",
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (dto.paymentCycle) {
      const validPaymentCycles = ['semanal', 'mensal', 'quaternal', 'anual'];
      if (!dto.paymentCycle || !validPaymentCycles.includes(dto.paymentCycle)) {
        throw new HttpException(
          `'paymentCycle' must be one of the following values: ${validPaymentCycles.join(', ')}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
