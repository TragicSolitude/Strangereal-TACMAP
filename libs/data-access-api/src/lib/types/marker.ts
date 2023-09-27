import { MarkerType } from '@strangereal/util-constants';

export interface Marker {
    x: number;
    y: number;
    type: MarkerType.Type;
    name?: string;
}
