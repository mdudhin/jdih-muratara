import StrukturOrganisasi from "./struktur_organisasi";
import VisiMisi from "./visi_misi";

const Profil = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <VisiMisi />
      <StrukturOrganisasi />
    </div>
  );
};

export default Profil;
