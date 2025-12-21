import { getArtikelId } from "@/utils/apis/artikel";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/id"; // Import locale Indonesia
import { ArrowLeft } from "lucide-react"; // Pastikan install lucide-react atau ganti icon lain

// Definisikan tipe data agar autocomplete jalan (Opsional tapi disarankan)
interface ArticleType {
  id: string;
  judul: string;
  deskripsi: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}

const DetailArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Ubah initial state jadi null, bukan array []
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  const getArticle = async () => {
    try {
      setLoading(true);
      const response = await getArtikelId(id as string);
      // Asumsi response langsung mengembalikan object artikel
      setArticle(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex h-screen items-center justify-center">
        Artikel tidak ditemukan
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      {/* Header Artikel */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.judul}
        </h1>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>
            {moment(article.createdAt).locale("id").format("dddd, D MMMM YYYY")}
          </span>
          <span>•</span>
          <span>
            {moment(article.createdAt).locale("id").format("HH:mm")} WIB
          </span>
        </div>
      </div>

      {/* Gambar Utama */}
      <div className="mb-10 w-full overflow-hidden rounded-xl shadow-sm">
        <img
          src={article.file}
          alt={article.judul}
          className="w-full h-auto max-h-[500px] object-cover"
        />
      </div>

      {/* Isi Konten */}
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
        {article.deskripsi}
      </div>
    </div>
  );
};

export default DetailArticle;
