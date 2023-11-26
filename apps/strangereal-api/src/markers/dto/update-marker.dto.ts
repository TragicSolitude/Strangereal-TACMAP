import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { MarkerType } from '@strangereal/util-constants';

export class UpdateMarkerDto {
    @IsOptional()
    @IsNumber(undefined, { each: true })
    coordinates?: [number, number];

    @IsOptional()
    @IsIn(MarkerType.all)
    type?: MarkerType.Type;

    @IsOptional()
    name?: string | null;
}
