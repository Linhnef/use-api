import { AddCacheProps } from "./type";

const addDataIntoCache = (props: AddCacheProps) => {
    const { cacheName, url, response } = props;
    if ('caches' in window) {
        caches.open(cacheName).then((cache) => {
            cache.put(url, new Response(JSON.stringify(response)));
            setTimeout( () => {
                cache.delete(url);
            },1000);
        });
    }
};

export const useCache = (props: AddCacheProps) => {
    const cache = () => {
        addDataIntoCache(props);
    }
    return { cache };
}