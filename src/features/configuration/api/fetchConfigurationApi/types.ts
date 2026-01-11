import { z } from 'zod';
import { Configuration, ConfigurationDtoSchema } from '../../types';
import { configurationDtoMappers } from '../../mappers';

export const fetchConfigurationApiDtoSchema = ConfigurationDtoSchema.pick({ images: true });

export type FetchConfigurationApiDto = z.infer<typeof fetchConfigurationApiDtoSchema>;

export const fetchConfigurationApiMapper = (
  dto: FetchConfigurationApiDto,
): FetchConfigurationApiResponse => ({
  ...configurationDtoMappers.images(dto),
});

export type FetchConfigurationApiResponse = Pick<Configuration, 'images'>;
