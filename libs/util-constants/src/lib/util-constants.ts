export * as MarkerType from './marker-type';
export { Permission } from './permission';

export type WithId<T> = T & { id: number };
export type Constructor<T, Options extends unknown[] = unknown[]> = {
    new (...args: Options): T;
}
