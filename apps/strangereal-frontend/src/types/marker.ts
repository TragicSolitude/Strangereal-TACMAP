import * as MarkerType from './marker-type';

export interface Marker {
    x: number;
    y: number;
    type: MarkerType.Type;
    name?: string;
}
