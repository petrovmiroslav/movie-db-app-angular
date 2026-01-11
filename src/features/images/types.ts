import { z } from 'zod';

const ImageIdSchema = z.string().brand<'ImageId'>();
export type ImageId = z.infer<typeof ImageIdSchema>;

export const ImageDtoSchema = z
  .object({
    file_path: z.string(),
  })
  .merge(
    z
      .object({
        aspect_ratio: z.number().finite(),
        height: z.number().finite(),
        iso_639_1: z.string().nullable(),
        vote_average: z.number().finite(),
        vote_count: z.number().finite(),
        width: z.number().finite(),
      })
      .partial(),
  );

export type ImageDto = z.infer<typeof ImageDtoSchema>;

export type Image = {
  id: ImageId;
  filePath: string;
} & Partial<{
  aspectRatio: number;
  height: number;
  iso_639_1: string | null;
  voteAverage: number;
  voteCount: number;
  width: number;
}>;
