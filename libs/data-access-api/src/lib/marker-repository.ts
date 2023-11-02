import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Marker } from "./types/marker";
import { MarkerType, WithId } from "@strangereal/util-constants";

interface MarkerDto {
    coordinates: [number, number],
    type: MarkerType.Type,
    name?: string
}

@Injectable()
export class MarkerRepository {
    constructor(private readonly http: HttpClient) {}

    async create(marker: Marker): Promise<number> {
        const dto = {
            coordinates: [marker.x, marker.y],
            type: marker.type
        } as MarkerDto;

        if (marker.name) {
            dto.name = marker.name;
        }

        const request = this.http.post('/api/markers', dto);
        const response = await firstValueFrom(request);
        if ('id' in response) {
            return Number(response.id);
        }

        throw new Error('asdf');
    }

    getAll(): Promise<Array<WithId<Marker>>> {
        const request = this.http.get<Array<WithId<Marker>>>('/api/markers', {
            withCredentials: true
        });

        return firstValueFrom(request);
    }

    async updatePosition(id: number, x: number, y: number): Promise<void> {
        const request = this.http.patch(`/api/markers/${id}`, {
            coordinates: [x, y]
        });

        await firstValueFrom(request);
    }

    async updateName(id: number, name: string): Promise<void> {
        const request = this.http.patch(`/api/markers/${id}`, {
            name
        });

        await firstValueFrom(request);
    }

    async remove(id: number): Promise<void> {
        const request = this.http.delete(`/api/markers/${id}`);

        await firstValueFrom(request);
    }
}
