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

    findOne(userId: number, id: number) {
        return this.markersRepository.getMarker(userId, id);
    }

    async update(userId: number, id: number, updateMarkerDto: UpdateMarkerDto) {
        const { name, coordinates, type } = updateMarkerDto;


        // TODO optimize this for when type and name are provided at the same
        // time (as they often will be)
        if (type) {
            await this.markersRepository.updateType(userId, id, type);
        }
        if (typeof name !== 'undefined') {
            await this.markersRepository.updateName(userId, id, name);
        }
        if (coordinates) {
            await this.markersRepository.updatePosition(userId, id, coordinates);
        }
    }

    remove(userId: number, id: number): Promise<void> {
        return this.markersRepository.removeMarker(userId, id);
    }
}
