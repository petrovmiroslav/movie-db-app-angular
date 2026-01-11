export enum AsyncStorageKeys {
  FAVORITES = 'favorites',
}

export const getAsyncStorageData = async (key: AsyncStorageKeys): Promise<unknown> => {
  try {
    const jsonValue = storage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error: getAsyncStorageData', error);
    return null;
  }
};

export const setAsyncStorageData = async (key: AsyncStorageKeys, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    storage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error: setAsyncStorageData', error);
  }
};

const storage: Pick<Storage, 'getItem' | 'setItem'> =
  typeof window === 'undefined'
    ? {
        getItem: () => null,
        setItem: () => {},
      }
    : localStorage;
