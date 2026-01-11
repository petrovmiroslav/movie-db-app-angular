import { ImageDto, ImageId } from './types';

export const imagesDtoMappers = {
  id: (dto: Pick<ImageDto, 'file_path'>) => ({
    id: dto.file_path as ImageId,
  }),
  filePath: (dto: Pick<ImageDto, 'file_path'>) => ({
    filePath: dto.file_path,
  }),
  aspectRatio: (dto: Pick<ImageDto, 'aspect_ratio'>) => ({
    aspectRatio: dto.aspect_ratio,
  }),
  height: (dto: Pick<ImageDto, 'height'>) => ({
    height: dto.height,
  }),
  width: (dto: Pick<ImageDto, 'width'>) => ({
    width: dto.width,
  }),
  iso_639_1: (dto: Pick<ImageDto, 'iso_639_1'>) => ({
    iso_639_1: dto.iso_639_1,
  }),
  voteAverage: (dto: Pick<ImageDto, 'vote_average'>) => ({
    voteAverage: dto.vote_average,
  }),
  voteCount: (dto: Pick<ImageDto, 'vote_count'>) => ({
    voteCount: dto.vote_count,
  }),
};
