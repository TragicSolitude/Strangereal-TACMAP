import { Injectable, OnModuleInit } from "@nestjs/common";
import { DbConnection } from "@strangereal/util-nest-sqlite";
import { Marker, MarkerDetails } from "./entities/marker.entity";
import * as Sqlite from 'sqlite';
import * as Error from './error';
import { MarkerType, WithId } from "@strangereal/util-constants";

@Injectable()
export class MarkersRepository {
    private readonly database: Sqlite.Database;

    constructor(dbConnection: DbConnection) {
        this.database = dbConnection.database;
    }

    async createMarker(userId: number, marker: Marker): Promise<number> {
        const { x, y, type, name } = marker;
        const query = `
            INSERT INTO markers (x, y, type, name, user_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const result = await this.database.run(query, x, y, type, name, userId);
        if (result.lastID) {
            return result.lastID;
        }

        throw new Error.InsertFailed();
    }

    // TODO Async iterate results?
    getMarkersForUser(userId: number): Promise<Array<WithId<Marker>>> {
        const query = `
            SELECT ROWID as id, x, y, type, name FROM markers
            WHERE user_id = ?
        `;
        return this.database.all<Array<WithId<MarkerDetails>>>(query, userId);
    }

    getAllMarkers(): Promise<Array<WithId<Marker>>> {
        const query = `SELECT ROWID as id, x, y, type, name FROM markers`;
        return this.database.all<Array<WithId<MarkerDetails>>>(query);
    }

    // TODO encrypt/obfuscate ids and assume they are secure -- they aren't but
    // close enough, it's easier than passing around the user id everywhere
    //
    // see: https://github.com/denostack/inthash

    async getMarker(userId: number, id: number): Promise<Marker> {
        const query = `SELECT x, y, type, name FROM markers
                       WHERE ROWID = ? AND user_id = ?`;
        const record = await this.database.get<Marker>(query, id, userId);
        if (!record) {
            throw new Error.MarkerNotFound();
        }

        return record;
    }

    async updateType(userId: number, id: number, type: MarkerType.Type): Promise<void> {
        const query = `UPDATE markers SET type = ?
                       WHERE ROWID = ? AND user_id = ?`;
        const result = await this.database.run(query, type, id, userId);
        if (result.changes !== 1) {
            throw new Error.MarkerNotFound();
        }
    }

    async updateName(userId: number, id: number, name: string | null): Promise<void> {
        const query = `UPDATE markers SET name = ?
                       WHERE ROWID = ? AND user_id = ?`;
        const result = await this.database.run(query, name, id, userId);
        if (result.changes !== 1) {
            throw new Error.MarkerNotFound();
        }
    }

    async updatePosition(userId: number, id: number, [x, y]: [number, number]): Promise<void> {
        const query = `UPDATE markers SET x = ?, y = ?
                       WHERE ROWID = ? AND user_id = ?`;
        const result = await this.database.run(query, x, y, id, userId);
        if (result.changes !== 1) {
            throw new Error.MarkerNotFound();
        }
    }

    async removeMarker(userId: number, id: number): Promise<void> {
        const query = `DELETE FROM markers WHERE ROWID = ? AND user_id = ?`;
        const result = await this.database.run(query, id, userId);
        if (result.changes !== 1) {
            throw new Error.MarkerNotFound();
        }
    }
}
