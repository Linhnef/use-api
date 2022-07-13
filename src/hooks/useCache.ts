

type AddCacheProps = {
    cacheName: string,
    url: string,
    response: any
}

const addDataIntoCache = (props: AddCacheProps) => {
    const { cacheName, url, response } = props;


    if ('caches' in window) {
        caches.open(cacheName).then((cache) => {
            cache.put(url, response);
            alert('Data Added into cache!')
        });
    }
};

export const useCache = (props: AddCacheProps) => {
    const cache = () => {
        addDataIntoCache(props);
    }
    return { cache };
}