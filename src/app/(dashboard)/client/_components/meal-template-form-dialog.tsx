"use client";

//import { SpecifyMealFoods } from "@/app/(dashboard)/client/_components/specify-meal-foods";
import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
//import {
//  useCreateMeal,
//  useUpdateMeal,
//} from "@/app/(dashboard)/client/_services/use-meal-mutations";
//import { useMeal } from "@/app/(dashboard)/client/_services/use-meal-queries";
//import {
//  mealDefaultValues,
//  mealSchema,
//  MealSchema,
//} from "@/app/(dashboard)/client/_types/mealSchema";
import { Button } from "@/components/ui/button";
//import { ControlledDatePicker } from "@/components/ui/controlled-datepicker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
//import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Session } from "next-auth";
//import { useEffect } from "react";
//import {
//  FormProvider,
//  SubmitHandler,
//  useForm,
//  useWatch,
//} from "react-hook-form"; 

type MealTemplateFormDialogProps = {
  smallTrigger?: boolean;
  //session: Session;
};
const MealTemplateFormDialog = ({ smallTrigger }: MealTemplateFormDialogProps) => {
/*   const form = useForm<MealSchema>({
    defaultValues: mealDefaultValues,
    resolver: zodResolver(mealSchema), 
  });*/

  //const userId = useWatch({ control: form.control, name: "userId" });

   const {
 //   selectedMealId,
 //   updateSelectedMealId,
    mealDialogOpen,
 //   updateMealDialogOpen,
  } = useMealsStore(); 

  //const mealQuery = useMeal();
  //const createMealMutation = useCreateMeal();
  //const updateMealMutation = useUpdateMeal();

  /* useEffect(() => {
    if (!!selectedMealId && mealQuery.data) {
      form.reset(mealQuery.data);
    }
  }, [mealQuery.data, form, selectedMealId]);

  useEffect(() => {
    if (!userId && session?.user?.id) {
      form.setValue("userId", session.user.id);
    }
  }, [form, session?.user?.id, userId]); */

 /*  const handleDialogOpenChange = (open: boolean) => {
    updateMealDialogOpen(open);

    if (!open) {
      updateSelectedMealId(null);
      form.reset(mealDefaultValues);
    }
  };  */

 /*  const handleSuccess = () => {
    handleDialogOpenChange(false);
  }; */

 /*  const onSubmit: SubmitHandler<MealSchema> = (data) => {
    if (data.action === "create") {
      createMealMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateMealMutation.mutate(data, { onSuccess: handleSuccess });
    }
  }; */

/*   const isPending =
    createMealMutation.isPending || updateMealMutation.isPending; */

  return (
    <Dialog >
      <DialogTrigger render={smallTrigger ? (
          <Button size="icon" variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            
            Use Template
          </Button>
        )}>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {"development in progress..."}
         </DialogTitle>
        </DialogHeader>
     
      </DialogContent>
    </Dialog>
  );
};
export { MealTemplateFormDialog };
