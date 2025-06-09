import AsyncStorage from '@react-native-async-storage/async-storage';
const LINK_STORAGE_KEY = "links-storage"

export type LinkStorage = {
    id: string;
    name: string;
    url: string;
    category: string;
}

async function get(): Promise<LinkStorage[]> {
    const storage = await AsyncStorage.getItem(LINK_STORAGE_KEY);
    const response = storage ? JSON.parse(storage) : [];

    return response
}

async function save(newLink: LinkStorage) {
    try {
        const storage = await get();
        const updated= JSON. stringify([...storage, newLink])

        await AsyncStorage.setItem(LINK_STORAGE_KEY, updated)


    } catch (error) {
        throw error
    }
}

async function remove(id: string) {
    try {
        const storage = await get();
        const updated = storage.filter((link) => link.id !== id);

        await AsyncStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(updated));

    } catch (error) {
        throw error
    }
}

export const linkStorage = { get, save, remove }

