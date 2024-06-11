import NodeCache from 'node-cache';

class CacheManager {
    private static instance: CacheManager;
    private cache: NodeCache;

    private constructor() {
        this.cache = new NodeCache();
    }

    public static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    public set(key: string, value: any, ttl: number): boolean {
        return this.cache.set(key, value, ttl);
    }

    public get(key: string): any {
        return this.cache.get(key);
    }

    public del(keys: string | string[]): number {
        return this.cache.del(keys);
    }

    // Các phương thức khác mà bạn cần có thể thêm vào đây
    //lấy thông tin các cache
    public getStats(): NodeCache.Stats {
        return this.cache.getStats();
    }
}

const instance = CacheManager.getInstance();
Object.freeze(instance); // Đảm bảo instance không thể bị thay đổi

export default instance;
