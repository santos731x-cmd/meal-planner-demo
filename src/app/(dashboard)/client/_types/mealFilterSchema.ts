import { z } from "zod";

const mealFiltersSchema = z.object({
  dateTime: z.coerce.date(),
  dateTime2: z.coerce.date(),
});

type MealFiltersSchema = z.infer<typeof mealFiltersSchema>;

const mealFiltersDefaultValues: MealFiltersSchema = {
  dateTime: new Date(),
  dateTime2: new Date(),
};

export { mealFiltersDefaultValues, mealFiltersSchema, type MealFiltersSchema };
