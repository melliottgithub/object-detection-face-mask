import hyperid from "hyperid";
import localforage from "localforage";

export interface IBaseEntity {
    id: string
    createdAt: string
}

export type Filter<T extends IBaseEntity> = (entity: T) => boolean;
export type EntityParams<T extends IBaseEntity> = Omit<T, "id" | "createdAt">;

export interface IRepository<T extends IBaseEntity> {
    save(entity: EntityParams<T>): Promise<T>;
    getById(id: string): Promise<T>;
    getAll(filter?: Filter<T>): Promise<T[]>;
    delete(id: string): Promise<void>;
    update(entity: T): Promise<T>;
}

export default class IndexedDBRepository<T extends IBaseEntity> implements IRepository<T>
{
    private readonly _store: LocalForage;
    private readonly _id_gen: hyperid.Instance;

    constructor(storeName: string) {
        this._store = localforage.createInstance({
            name: "aivision-demo",
            driver: localforage.INDEXEDDB,
            storeName: storeName,
        });
        this._id_gen = hyperid({ urlSafe: true });
    }

    async save(entity: EntityParams<T>): Promise<T> {
        const fullEntity: T = {
            ...(entity as T),
            id: this._id_gen(),
            createdAt: new Date().toString(),
        };
        return await this._store.setItem<T>(fullEntity.id, fullEntity);
    }

    async getById(id: string): Promise<T> {
        const entity = await this._store.getItem<T>(id.toString());
        if (entity) return entity;
        else throw new Error("Entity not found");
    }

    async getAll(filter?: Filter<T>): Promise<T[]> {
        const results: T[] = [];
        await this._store.iterate((value: T) => {
            if (filter) {
                if (filter(value)) results.push(value);
            } else results.push(value);
        });
        return results;
    }

    async delete(id: string): Promise<void> {
        return this._store.removeItem(id.toString());
    }

    async update(entity: T): Promise<T> {
        return this._store.setItem<T>(entity.id, entity);
    }
}