"use client";

import { Button } from "@/components/ui/button";
import { useCategoriesStore } from "@/app/(dashboard)/admin/foods-management/categories/_libs/use-category-store";
import { useDeleteCategory } from "../_services/use-categories-mutations";
import { useCategories } from "../_services/use-categories-queries"
import { Edit, Trash } from "lucide-react";
import { alert } from "@/lib/use-global-store";
import { CategoryCardsSkeleton } from "./category-cards-skeleton";
import { NoItemsFound } from "@/components/no-items-found";


const CategoryCards = ()=> {
    const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoriesStore();

    const categoriesQuery = useCategories();
    const deleteCategoryMutation = useDeleteCategory();

    if(categoriesQuery.data?.length===0){
        return <NoItemsFound onClick={()=>updateCategoryDialogOpen(true)}/>
    }

    return <div className="grid grid-cols-4 gap-2">
         {
            categoriesQuery.isLoading ? (<CategoryCardsSkeleton/>) 
            : 
            (
                <>
         {categoriesQuery.data?.map((item) => (
            <div className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 border shadow-md" key={item.id}>
                <p className="truncate">{item.name}</p>
                <div className="flex gap-1">
                    <Button
                  className="size-6"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    updateSelectedCategoryId(item.id);
                    updateCategoryDialogOpen(true);
                  }}
                >
                  <Edit />
                </Button>
                    <Button className="size-6" variant="ghost" size="icon" onClick={()=>{
                        alert({
                            onConfirm:()=>deleteCategoryMutation.mutate(item.id)
                        })
                        
                    }}>
                        <Trash/>
                    </Button>
                </div>
            </div>
        ))} 
        </>
        )  
         }
 
    </div>
}

export {CategoryCards}