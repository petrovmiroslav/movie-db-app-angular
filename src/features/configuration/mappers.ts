import { ConfigurationDto, ConfigurationImagesDto } from './types';

export const configurationImagesDtoMappers = {
  secureBaseUrl: (dto: Pick<ConfigurationImagesDto, 'secure_base_url'>) => ({
    secureBaseUrl: dto.secure_base_url,
  }),
  backdropSizes: (dto: Pick<ConfigurationImagesDto, 'backdrop_sizes'>) => ({
    backdropSizes: dto.backdrop_sizes,
  }),
  posterSizes: (dto: Pick<ConfigurationImagesDto, 'poster_sizes'>) => ({
    posterSizes: dto.poster_sizes,
  }),
};

export const configurationDtoMappers = {
  images: (dto: Pick<ConfigurationDto, 'images'>) => ({
    images: dto.images && {
      ...configurationImagesDtoMappers.secureBaseUrl(dto.images),
      ...configurationImagesDtoMappers.backdropSizes(dto.images),
      ...configurationImagesDtoMappers.posterSizes(dto.images),
    },
  }),
};
