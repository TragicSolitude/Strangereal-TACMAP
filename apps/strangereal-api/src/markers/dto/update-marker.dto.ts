import { PartialType } from '@nestjs/mapped-types';
import { CreateMarkerDto } from './create-marker.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateMarkerDto {
    @IsOptional()
    @IsNumber(undefined, { each: true })
    coordinates: [number, number];

    @IsOptional()
    @IsNotEmpty()
    name?: string;
}
