import { UserSchema, registerUser, userSchema } from "@/utils/apis/user";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/custom-formfield";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleRegisterUser = async (body: UserSchema) => {
    if (body.password !== passwordConfirmation) {
      toast({
        description: "Password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }
    try {
      await registerUser(body);
      toast({
        description: "Insert data successfully",
      });
      navigate(-1);
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="m-10 flex flex-col">
      <p className="text-3xl font-semibold">Add User</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegisterUser)}
          className="m-10 flex flex-col gap-6"
        >
          <CustomFormField
            control={form.control}
            name="username"
            label="Username"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Username"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className="border-tyellow focus-visible:ring-tyellow"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="password"
            label="Password"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Password"
                type="password"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className="border-tyellow focus-visible:ring-tyellow"
              />
            )}
          </CustomFormField>
          <Input
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
            className="border-tyellow focus-visible:ring-tyellow"
          />
          <Button
            type="submit"
            className=" bg-green-500 hover:bg-green-400 self-end"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DetailRegister;
