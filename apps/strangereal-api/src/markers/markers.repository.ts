import { Injectable, OnModuleInit } from "@nestjs/common";
import { DbConnection } from "@strangereal/util-nest-sqlite";
import { Marker, MarkerDetails } from "./entities/marker.entity";
import * as Sqlite from 'sqlite';
import * as Error from './error';
import { WithId } from "@strangereal/util-constants";

@Injectable()
export class MarkersRepository {
    private readonly database: Sqlite.Database;

    constructor(dbConnection: DbConnection) {
        this.database = dbConnection.database;
    }

    async createMarker(marker: Marker): Promise<number> {
        const { x, y, type, name } = marker;
        const query = `
            INSERT INTO markers (x, y, type, name)
            VALUES (?, ?, ?, ?)
        `;
        const result = await this.database.run(query, x, y, type, name);
        if (result.lastID) {
            return result.lastID;
        }

        throw new Error.InsertFailed();
    }

    getMarkersForUser(userId: number): Promise<Array<WithId<Marker>>> {
        const query = `
            SELECT ROWID as id, x, y, type, name FROM markers
            WHERE ROWID = ?
        `;
        return this.database.all<Array<WithId<MarkerDetails>>>(query, userId);
    }

    getAllMarkers(): Promise<Array<WithId<Marker>>> {
        const query = `SELECT ROWID as id, x, y, type, name FROM markers`;
        return this.database.all<Array<WithId<MarkerDetails>>>(query);
    }

    async getMarker(id: number): Promise<Marker> {
        const query = `SELECT x, y, type, name FROM markers WHERE ROWID = ?`;
        const record = await this.database.get<Marker>(query, id);
        if (!record) {
            throw new Error.MarkerNotFound();
        }

        return record;
    }

    async updateName(id: number, name: string): Promise<void> {
        const query = `UPDATE markers SET name = ? WHERE ROWID = ?`;
        const result = await this.database.run(query, name, id);
        if (result.changes !== 1) {
            throw new Error.MarkerNotFound();
        }
    }

    async updatePosition(id: number, [x, y]: [number, number]): Promise<void> {
        const query = `UPDATE markers SET x = ?, y = ? WHERE ROWID = ?`;
        const result = await this.database.run(query, x, y, id);
        if (result.changes !== 1) {
            throw new Error.MarkerNotFound();
        }
    }

    async removeMarker(id: number): Promise<void> {
        const query = `DELETE FROM markers WHERE ROWID = ?`;
        const result = await this.database.run(query, id);
        if (result.changes !== 1) {
            throw new Error.MarkerNotFound();
        }
    }
}
