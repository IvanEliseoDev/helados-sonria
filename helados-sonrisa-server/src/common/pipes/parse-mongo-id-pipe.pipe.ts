import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: unknown) {
    if (!isValidObjectId(value))
      throw new BadRequestException(
        `El valor:${String(value)} no es un formato valido para un MongoID`,
      );
    return value;
  }
}
