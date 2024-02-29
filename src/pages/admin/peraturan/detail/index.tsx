import { Form, FormControl } from "@/components/ui/form";
import {
  PeraturanSchema,
  createPeraturan,
  editPeraturan,
  getPeraturanId,
  peraturanSchema,
} from "@/utils/apis/peraturan";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/custom-formfield";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

const DetailPeraturan = () => {
  const navigate = useNavigate();
  // const { action } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const { toast } = useToast();
  const { id } = useParams();
  const [pdf, setPdf] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<PeraturanSchema>({
    resolver: zodResolver(peraturanSchema),
    defaultValues: {
      jenis_peraturan: "",
      bentuk_peraturan: "",
      judul: "",
      no_peraturan: "",
      tahun: "",
      tmpt_penetapan: "",
      tgl_penetapan: "",
      penandatanganan: "",
      tgl_penandatanganan: "",
      pemrakarsa: "",
      sumber: "",
      status: "",
      note: "",
      file: "",
    },
  });

  const fileWatcher = form.watch("file");

  const handleCreatePeraturan = async (body: PeraturanSchema) => {
    try {
      await createPeraturan(body);
      toast({
        description: "Insert data successfully",
      });
      navigate("/admin/peraturan");
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleEditPeraturan = async (body: PeraturanSchema) => {
    try {
      await editPeraturan(id as string, body);
      toast({
        description: "Edit data successfully",
      });
      navigate("/admin/peraturan");
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const fetchPengaturanId = async () => {
    setLoading(true);
    try {
      const result = await getPeraturanId(id as string);
      console.log(result);
      form.setValue("jenis_peraturan", result?.jenis_peraturan as string);
      form.setValue("bentuk_peraturan", result?.bentuk_peraturan as string);
      form.setValue("judul", result?.judul as string);
      form.setValue("no_peraturan", result?.no_peraturan as string);
      form.setValue("tahun", result?.tahun as string);
      form.setValue("tmpt_penetapan", result?.tmpt_penetapan as string);
      form.setValue("tgl_penetapan", result?.tgl_penetapan as string);
      form.setValue("penandatanganan", result?.penandatanganan as string);
      form.setValue(
        "tgl_penandatanganan",
        result?.tgl_penandatanganan as string
      );
      form.setValue("pemrakarsa", result?.pemrakarsa as string);
      form.setValue("sumber", result?.sumber as string);
      form.setValue("status", result?.status as string);
      form.setValue("note", result?.note as string);
      setPdf(result?.file);
      setLoading(false);
    } catch (error) {
      toast({
        description: (error as Error).message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setPdfUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  useEffect(() => {
    if (id) {
      fetchPengaturanId();
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
            id ? handleEditPeraturan : handleCreatePeraturan
          )}
          className="m-10 flex flex-col gap-5"
        >
          <CustomFormField
            control={form.control}
            name="jenis_peraturan"
            label="Jenis Peraturan"
            required
          >
            {(field) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Peraturan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Peraturan Daerah">
                    Peraturan Daerah
                  </SelectItem>
                  <SelectItem value="Peraturan Bupati">
                    Peraturan Bupati
                  </SelectItem>
                  <SelectItem value="Keputusan bupati">
                    Keputusan bupati
                  </SelectItem>
                  <SelectItem value="Surat Edaran">Surat Edaran</SelectItem>
                </SelectContent>
              </Select>
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="bentuk_peraturan"
            label="Bentuk Peraturan"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Bentuk Peraturan"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="judul"
            label="Judul"
            required
          >
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
            name="no_peraturan"
            label="Nomor Peraturan"
            required
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Nomor Peraturan"
                type="number"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="tahun"
            label="Tahun"
            required
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Tahun"
                type="number"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="tmpt_penetapan"
            label="Tempat Penetapan"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Tempat Penetapan"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="tgl_penetapan"
            label="Tanggal Penetapan"
            required
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Tanggal Penetapan"
                type="date"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="penandatanganan"
            label="Penandatanganan"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Penandatanganan"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="tgl_penandatanganan"
            label="Tanggal Penandatanganan"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Tanggal Penandatanganan"
                type="date"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="pemrakarsa"
            label="Pemrakarsa"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Pemrakarsa"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField control={form.control} name="sumber" label="Sumber">
            {(field) => (
              <Input
                {...field}
                placeholder="Sumber"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="status"
            label="Status"
            required
          >
            {(field) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Berlaku">Berlaku</SelectItem>
                  <SelectItem value="Diubah">Diubah</SelectItem>
                  <SelectItem value="Dicabut">Dicabut</SelectItem>
                </SelectContent>
              </Select>
            )}
          </CustomFormField>

          {form.getValues("status") === "Diubah" && (
            <CustomFormField control={form.control} name="note" label="Note">
              {(field) => (
                <Input
                  {...field}
                  placeholder="Note"
                  type="text"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
                />
              )}
            </CustomFormField>
          )}

          <CustomFormField
            control={form.control}
            name="file"
            label="Upload Peraturan"
            required
          >
            {() => (
              <>
                <div className="flex w-full justify-center">
                  {pdfUrl || pdf ? (
                    <embed
                      src={pdfUrl || pdf}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                    />
                  ) : null}
                </div>
                <Input
                  {...form.register("file")}
                  id="image"
                  type="file"
                  accept="application/pdf"
                  required
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

export default DetailPeraturan;
