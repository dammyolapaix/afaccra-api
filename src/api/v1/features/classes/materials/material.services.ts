import { MaterialType, NewMaterialType } from '.'
import { db } from '../../../db'
import classMaterials from './material.schema'
import { eq } from 'drizzle-orm'

export const getMaterials = async () =>
  await db.query.classMaterials.findMany({
    with: { class: true, user: { columns: { password: false } } },
  })

export const createMaterial = async (material: NewMaterialType) => {
  const newMaterial = await db
    .insert(classMaterials)
    .values(material)
    .returning()
  return newMaterial[0]
}

export const getSingleMaterialById = async ({ id }: Pick<MaterialType, 'id'>) =>
  await db.query.classMaterials.findFirst({
    where: eq(classMaterials.id, id),
    with: { class: true, user: { columns: { password: false } } },
  })

export const updateMaterialById = async (
  materialId: string,
  materialToBeUpdated: Partial<MaterialType>
) => {
  const updatedMaterial = await db
    .update(classMaterials)
    .set(materialToBeUpdated)
    .where(eq(classMaterials.id, materialId))
    .returning()

  return updatedMaterial[0]
}

export const deleteMaterialById = async (materialId: string) =>
  await db.delete(classMaterials).where(eq(classMaterials.id, materialId))
