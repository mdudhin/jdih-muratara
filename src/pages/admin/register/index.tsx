import CustomFormField from "@/components/shared/custom-formfield";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema, userSchema, registerUser } from "@/utils/apis/user";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Register = () => {
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
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="m-10 flex flex-col xl:px-48">
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
            className=" bg-green-500 hover:bg-green-400"
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

export default Register;
