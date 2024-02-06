import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema, loginSchema } from "@/utils/apis/auth";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/custom-formfield";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  // const { toast } = useToast();
  // const { changeToken } = useToken();
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="w-1/2">
          <Card>
            <CardHeader>
              <CardDescription className="text-center text-gray-800">
                Enter Your Email and Password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="mail@domain.com"
                    type="email"
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
              <Link to={`/admin`}>
                <p className="mt-2 text-[12px] text-blue-600">
                  Forgot Password?
                </p>
              </Link>
            </CardContent>
            <CardFooter>
              <Button className="mx-5 w-full bg-green-500 hover:bg-green-400">
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
