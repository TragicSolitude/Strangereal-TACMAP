import { MarkerType } from '@strangereal/util-constants';

export interface MarkerDetails {
    x: number;
    y: number;
    type: MarkerType.Type,
    name: string | null;
}

export class Marker implements MarkerDetails {
    constructor(public x: number,
                public y: number,
                public type: MarkerType.Type,
                public name: string | null = null) {}

    static fromDetails(details: MarkerDetails): Marker {
        return Object.create(Marker.prototype, Object.getOwnPropertyDescriptors(details));
    }
}
