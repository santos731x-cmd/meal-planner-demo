import { z } from "zod";

const categorySchema = z.intersection(
  z.object({
    name: z.string().min(1).max(255),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ]),
);



const categoryDefaultValues: CategorySchema = {
  action: "create",
  name: "",
};



  type CategorySchema = z.infer<typeof categorySchema>;

  /* const userSchema = 
  z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    age:z.coerce.number().min(18).max(90)
  });

type UserSchema = z.infer<typeof userSchema>; */

export { categorySchema ,categoryDefaultValues, type CategorySchema };
