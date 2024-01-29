import { Form, FormControl } from "@/components/ui/form";
import { PeraturanSchema, peraturanSchema } from "@/utils/apis/peraturan";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/custom-formfield";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailPeraturan = () => {
  const navigate = useNavigate();
  const { action } = useParams();

  const form = useForm<PeraturanSchema>({
    resolver: zodResolver(peraturanSchema),
    defaultValues: {
      jenisPeraturan: "",
      bentukPeraturan: "",
      judul: "",
      nomorPeraturan: "",
      tahun: "",
      tempatPenetapan: "",
      tanggalPenetapan: "",
      penandatanganan: "",
      tanggalPengundangan: "",
      pemrakarsa: "",
      sumber: "",
      status: "",
      note: "",
      file: "",
    },
  });

  return (
    <ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="m-10 flex flex-col gap-5"
        >
          <CustomFormField
            control={form.control}
            name="jenisPeraturan"
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
            name="bentukPeraturan"
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
            name="nomorPeraturan"
            label="Nomor Peraturan"
            required
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Nomor Peraturan"
                type="text"
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
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className=" w-full rounded-sm bg-tblueLight p-3 text-gray-800 placeholder:text-gray-800"
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="tempatPenetapan"
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
            name="tanggalPenetapan"
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
            name="tanggalPengundangan"
            label="Tanggal Pengundangan"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Tanggal Pengundangan"
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
                <div className="flex w-full justify-center"></div>
                <Input
                  {...form.register("file")}
                  id="image"
                  type="file"
                  accept="application/pdf"
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
