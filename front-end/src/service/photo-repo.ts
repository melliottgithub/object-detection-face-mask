import IndexedDBRepository, {IBaseEntity} from "./repository";

export interface ImageDimensions {
    width: number;
    height: number;
}

export interface PhotoEntity extends IBaseEntity, ImageDimensions {
    data: string;
    name: string;
    extension: string;
    size: number;
    tag?: string;
    results?: PhotoAnalysisResult[];
}

export interface PhotoAnalysisResult {
    class: string,
    confidence: number,
    boundingBox: number[]
}

export default class PhotoRepo extends IndexedDBRepository<PhotoEntity> {
    private static _singleton: PhotoRepo;

    private constructor() {
        super("photo-store");
    }

    public static get singleton(): PhotoRepo {
        if (!this._singleton) this._singleton = new PhotoRepo();
        return this._singleton;
    }
}