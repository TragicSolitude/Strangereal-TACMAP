import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common';
import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { Permission, WithId } from '@strangereal/util-constants';
import { Marker } from './entities/marker.entity';
import { AuthGuard, Claims, TokenClaims } from '@strangereal/util-nest-auth';

@UseGuards(AuthGuard)
@Controller('markers')
export class MarkersController {
    constructor(private readonly markersService: MarkersService) {}

    @Post()
    async create(@Body() createMarkerDto: CreateMarkerDto,
                 @Claims() claims: TokenClaims): Promise<{ id: number }> {
        const id = await this.markersService.create(claims.getUserId(), createMarkerDto);

        return { id };
    }

    @Get()
    findAll(@Claims() claims: TokenClaims): Promise<Array<WithId<Marker>>> {
        if (claims.hasPermission(Permission.ViewAllMaps)) {
            return this.markersService.findAll();
        } else {
            return this.markersService.findAll(claims.getUserId());
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.markersService.findOne(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMarkerDto: UpdateMarkerDto) {
        if (!updateMarkerDto.coordinates && !updateMarkerDto.coordinates) {
            return;
        }

        return this.markersService.update(+id, updateMarkerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.markersService.remove(+id);
    }
}
