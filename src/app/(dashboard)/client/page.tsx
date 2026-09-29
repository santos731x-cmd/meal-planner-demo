import { MealCards } from "@/app/(dashboard)/client/_components/meal-cards";
import { MealFilters } from "@/app/(dashboard)/client/_components/meal-filters";
import { MealFormDialog } from "@/app/(dashboard)/client/_components/meal-form-dialog";
import { MealTemplateFormDialog } from "@/app/(dashboard)/client/_components/meal-template-form-dialog";
import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
  if (!session) return null;

  return (
    <>
      <div className="flex justify-between">
        <MealFilters />
        <MealTemplateFormDialog />
        <MealFormDialog session={session} />
      </div>
      <MealCards />
    </>
  );
};

export default Page;
