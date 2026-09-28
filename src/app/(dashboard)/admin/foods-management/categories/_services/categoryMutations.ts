"use server";

import {CategorySchema} from "@/app/(dashboard)/admin/foods-management/categories/_types/categorySchema"
import { executeAction } from "@/lib/executeAction"
import db from "@/lib/db" 

const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () =>
      db.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateCategory = async (data: CategorySchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.category.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

const deleteCategory = async(id:number) => {
    await executeAction({
     actionFn: () => db.category.delete({
        where: {id}
     })
    })
}

export {deleteCategory,createCategory,updateCategory}