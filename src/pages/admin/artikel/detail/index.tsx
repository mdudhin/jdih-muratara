import {
  ArtikelSchema,
  artikelSchema,
  createArtikel,
  editArtikel,
  getArtikelId,
} from "@/utils/apis/artikel";
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../../components/ui/button";
import CustomFormField from "../../../../components/shared/custom-formfield";
import { Form } from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Textarea } from "../../../../components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "../../../../components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailArtikel = () => {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState<string>("");
  const { toast } = useToast();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ArtikelSchema>({
    resolver: zodResolver(artikelSchema),
    defaultValues: {
      judul: "",
      deskripsi: "",
      file: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("file");

  const handleCreateArtikel = async (body: ArtikelSchema) => {
    try {
      await createArtikel(body);
      toast({
        description: "Insert data successfully",
      });
      navigate("/admin/artikel");
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleEditPeraturan = async (body: ArtikelSchema) => {
    try {
      await editArtikel(id as string, body);
      toast({
        description: "Edit data successfully",
      });
      navigate("/admin/artikel");
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const fetchArtikelId = async () => {
    setLoading(true);
    try {
      const result = await getArtikelId(id as string);
      form.setValue("judul", result?.judul as string);
      form.setValue("deskripsi", result?.deskripsi as string);

      const url = await fetchPdf(result.file);
      setImgUrl(url || "");
      setLoading(false);
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const fetchPdf = async (file: any) => {
    try {
      const response = await fetch(file, {
        method: "GET",
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return url;
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (id) {
      form.setValue("mode", "edit");
    } else {
      form.setValue("mode", "create");
    }
  }, []);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setImgUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  useEffect(() => {
    if (id) {
      fetchArtikelId();
    }
  }, [id]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 />
    </div>
  ) : (
    <ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            id ? handleEditPeraturan : handleCreateArtikel
          )}
          className="m-10 flex flex-col gap-5"
        >
          <CustomFormField control={form.control} name="judul" label="Judul">
            {(field) => (
              <Input
                {...field}
                placeholder="Judul"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="deskripsi"
            label="Deskripsi"
          >
            {(field) => (
              <Textarea
                {...field}
                placeholder="Deskripsi"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="file"
            label="Foto Artikel"
            required={!id}
          >
            {() => (
              <>
                {imgUrl && (
                  <div className="flex w-full justify-center ">
                    <img src={imgUrl} className=" max-h-72" />
                  </div>
                )}

                {imgUrl ? (
                  <Trash2
                    className="size-8 text-red-500 cursor-pointer"
                    onClick={() => {
                      return form.resetField("file"), setImgUrl("");
                    }}
                  />
                ) : null}

                <Input
                  {...form.register("file")}
                  id="image"
                  type="file"
                  accept="image/jpeg, image/png, image/gif"
                  required={!id}
                />
              </>
            )}
          </CustomFormField>

          <div className="flex flex-row gap-3 self-end">
            <Button
              className=" bg-blue-500 hover:bg-blue-400"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
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
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default DetailArtikel;
