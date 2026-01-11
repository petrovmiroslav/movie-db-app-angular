import { z } from 'zod';

export const GenreIdSchema = z.number().finite().brand<'GenreId'>();
export type GenreId = z.infer<typeof GenreIdSchema>;

export const GenreDtoSchema = z
  .object({
    id: GenreIdSchema,
  })
  .merge(
    z
      .object({
        name: z.string(),
      })
      .partial(),
  );

export type GenreDto = z.infer<typeof GenreDtoSchema>;

export type Genre = { id: GenreId } & Partial<{
  name: string;
}>;
