import { z } from 'zod';

export const StringDateSchema = z.string().brand<'StringDate'>();
export type StringDate = z.infer<typeof StringDateSchema>;
