import { Injectable } from '@nestjs/common';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { MarkersRepository } from './markers.repository';
import { Marker, MarkerDetails } from './entities/marker.entity';
import { WithId } from '@strangereal/util-constants';

@Injectable()
export class MarkersService {
    constructor(private readonly markersRepository: MarkersRepository) {}

    create(userId: number, createMarkerDto: CreateMarkerDto): Promise<number> {
        const [x, y] = createMarkerDto.coordinates;
        const marker: MarkerDetails = {
            x, y,
            type: createMarkerDto.type,
            name: null
        };

        if (createMarkerDto.name) {
            marker.name = createMarkerDto.name;
        }

        return this.markersRepository.createMarker(userId, marker);
    }

    findAll(userId?: number): Promise<Array<WithId<Marker>>> {
        if (userId) {
            return this.markersRepository.getMarkersForUser(userId);
        } else {
            return this.markersRepository.getAllMarkers();
        }
    }

    findOne(id: number) {
        return this.markersRepository.getMarker(id);
    }

    async update(id: number, updateMarkerDto: UpdateMarkerDto) {
        const { name, coordinates } = updateMarkerDto;

        if (name) {
            await this.markersRepository.updateName(id, name);
        }
        if (coordinates) {
            await this.markersRepository.updatePosition(id, coordinates);
        }
    }

    remove(id: number): Promise<void> {
        return this.markersRepository.removeMarker(id);
    }
}
