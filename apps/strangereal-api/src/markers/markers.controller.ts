import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from '@nestjs/common';
import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { WithId } from '@strangereal/util-constants';
import { Marker } from './entities/marker.entity';

@Controller('markers')
export class MarkersController {
    constructor(private readonly markersService: MarkersService) {}

    @Post()
    async create(@Body() createMarkerDto: CreateMarkerDto): Promise<{ id: number }> {
        const id = await this.markersService.create(createMarkerDto);

        return { id };
    }

    @Get()
    findAll(): Promise<Array<WithId<Marker>>> {
        return this.markersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.markersService.findOne(+id);
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
