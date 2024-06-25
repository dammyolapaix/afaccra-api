import { createInsertSchema } from 'drizzle-zod'
import { z, object } from 'zod'
import materials from './material.schema'

const createMaterialSchema = createInsertSchema(materials, {
  userId: z.string().optional(),
  titleEn: z
    .string()
    .trim()
    .min(3, {
      message: 'error.class.material.titleEn_3_min',
    })
    .optional(),
  titleFr: z
    .string()
    .min(3, {
      message: 'error.class.material.titleFr_3_min',
    })
    .optional(),
}).refine(
  ({ titleEn, titleFr }) => {
    if (!titleEn && !titleFr) return false
    return true
  },
  {
    message: 'error.class.material.title_required',
  }
)

const createMaterialBody = {
  body: createMaterialSchema,
}

const createMaterialParams = {
  params: object({
    classId: z.string({
      required_error: 'error.class.material.class.required',
    }),
  }),
}

export const createMaterialValidation = object({
  ...createMaterialBody,
  ...createMaterialParams,
})
