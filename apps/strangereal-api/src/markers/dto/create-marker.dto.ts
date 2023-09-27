import { MarkerType } from "@strangereal/util-constants";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateMarkerDto {
    @IsNumber(undefined, { each: true })
    coordinates: [number, number];

    @IsEnum(MarkerType.Type)
    type: MarkerType.Type;

    @IsOptional()
    @IsNotEmpty()
    name: string;
}
