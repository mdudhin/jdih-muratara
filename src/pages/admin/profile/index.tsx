import CustomFormField from "@/components/shared/custom-formfield";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema, userSchema, updateProfile } from "@/utils/apis/user";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleUpdateProfile = async (body: UserSchema) => {
    if (body.password !== passwordConfirmation) {
      toast({
        description: "Password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }
    try {
      const result = await updateProfile(id as string, body);
      toast({
        description: result.message,
      });
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="m-10 flex flex-col">
      <p className="text-3xl font-semibold">Profile</p>
      <p></p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="m-10 flex flex-col gap-6 xl:px-48"
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
              "Save"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
