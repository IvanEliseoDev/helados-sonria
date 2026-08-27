import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common"
import { MongoError } from "src/errors/mongoError.interface";

export const handleDBException = (error: unknown, context: string): never =>{
    const logger = new Logger(context)
    const mongoError = error as MongoError;

    if (mongoError.code === 11000) {
        const duplicateField = Object.keys(mongoError.keyValue || {})[0] || 'campo';
        const value = mongoError.keyValue?.[duplicateField] || '';

        throw new BadRequestException(
            `El ${duplicateField} '${value}' ya está registrado en la base de datos.`
        );
    }

    logger.error(error);
    throw new InternalServerErrorException(
        `No se pudo procesar la solicitud - Revisa los server logs`
    );
}