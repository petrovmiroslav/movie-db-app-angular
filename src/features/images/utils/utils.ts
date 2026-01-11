export const DEFAULT_IMAGE_SIZE = 'original';

export const getImageUrl = (params: {
  baseUrl: string | undefined;
  size: string | undefined;
  filePath: string | undefined | null;
}): string | undefined => {
  if (!params.baseUrl || !params.filePath) return;
  return params.baseUrl + (params.size ?? DEFAULT_IMAGE_SIZE) + params.filePath;
};
