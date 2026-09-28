"use client";
import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
import {
  mealFiltersDefaultValues,
  mealFiltersSchema,
  MealFiltersSchema,
} from "@/app/(dashboard)/client/_types/mealFilterSchema";
import { Button } from "@/components/ui/button";
import { ControlledDatePicker } from "@/components/ui/controlled-datepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const MealFilters = () => {
  const form = useForm<MealFiltersSchema>({
    defaultValues: mealFiltersDefaultValues,
    resolver: zodResolver(mealFiltersSchema),
  });

  const { updateMealFilters } = useMealsStore();

  const onSubmit: SubmitHandler<MealFiltersSchema> = (data) => {
    updateMealFilters(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 flex items-center gap-3"
      >
        <ControlledDatePicker<MealFiltersSchema>
          name="dateTime"
          label="Filter by date 1"
        />
        <ControlledDatePicker<MealFiltersSchema>
          name="dateTime2"
          label="Filter by date 2"
        />        
        <Button type="submit" size="sm">
          Apply
        </Button>
      </form>
    </FormProvider>
  );
};

export { MealFilters };
