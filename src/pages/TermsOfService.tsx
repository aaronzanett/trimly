import { Link } from "react-router-dom";
import { ArrowLeft, Scissors } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">Trimly</span>
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Pendaftaran
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Syarat dan Ketentuan</h1>
          <p className="text-muted-foreground text-sm">Terakhir diperbarui: 18 Februari 2026</p>
        </div>

        <div className="space-y-8 font-body text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">1. Penerimaan Ketentuan</h2>
            <p>
              Dengan mengakses atau menggunakan layanan Trimly, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan salah satu bagian dari ketentuan ini, Anda tidak diizinkan menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">2. Deskripsi Layanan</h2>
            <p>
              Trimly adalah platform manajemen barbershop berbasis Software-as-a-Service (SaaS) yang menyediakan fitur seperti manajemen jadwal, kasir (POS), laporan keuangan, manajemen karyawan, dan portal pelanggan. Layanan ini tersedia melalui aplikasi web yang dapat diakses oleh pemilik, staf, dan pelanggan barbershop.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">3. Akun dan Pendaftaran</h2>
            <p className="mb-2">
              Untuk menggunakan Trimly, Anda harus mendaftarkan akun dengan memberikan informasi yang akurat dan lengkap. Anda bertanggung jawab untuk:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
              <li>Menjaga kerahasiaan kata sandi akun Anda.</li>
              <li>Semua aktivitas yang terjadi di bawah akun Anda.</li>
              <li>Segera memberitahu kami jika terjadi penggunaan akun tanpa izin.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">4. Paket Langganan dan Pembayaran</h2>
            <p className="mb-2">
              Trimly menawarkan beberapa paket berlangganan dengan harga dalam Rupiah (IDR):
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
              <li><strong className="text-foreground">Starter</strong>: Rp 149.000/bulan — untuk barbershop dengan 1 cabang.</li>
              <li><strong className="text-foreground">Professional</strong>: Rp 229.000/bulan — untuk barbershop berkembang.</li>
              <li><strong className="text-foreground">Enterprise</strong>: Rp 299.000/bulan — untuk jaringan barbershop besar.</li>
            </ul>
            <p className="mt-2">
              Pembayaran dilakukan di muka setiap bulan. Trimly berhak mengubah harga dengan pemberitahuan minimal 30 hari sebelumnya.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">5. Uji Coba Gratis</h2>
            <p>
              Pengguna baru berhak mendapatkan masa uji coba gratis selama 14 hari tanpa memerlukan informasi kartu kredit. Setelah masa uji coba berakhir, akun Anda akan otomatis beralih ke paket berbayar jika Anda memilih untuk melanjutkan.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">6. Penggunaan yang Dilarang</h2>
            <p className="mb-2">Anda dilarang menggunakan layanan Trimly untuk:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
              <li>Melanggar hukum atau peraturan yang berlaku di Indonesia.</li>
              <li>Mengirimkan konten yang bersifat berbahaya, menipu, atau melecehkan.</li>
              <li>Melakukan rekayasa balik atau menduplikasi sistem kami.</li>
              <li>Mengganggu keamanan atau integritas platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">7. Kepemilikan Intelektual</h2>
            <p>
              Semua konten, merek dagang, logo, dan kode yang terkait dengan Trimly adalah milik eksklusif PT Trimly Teknologi Indonesia. Anda tidak diperkenankan untuk menyalin, mendistribusikan, atau memodifikasi aset kami tanpa izin tertulis.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">8. Penghentian Layanan</h2>
            <p>
              Kami berhak menangguhkan atau menghentikan akun Anda tanpa pemberitahuan sebelumnya jika Anda melanggar Syarat dan Ketentuan ini. Anda juga dapat membatalkan langganan kapan saja melalui pengaturan akun.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">9. Batasan Tanggung Jawab</h2>
            <p>
              Trimly tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan kami. Tanggung jawab kami terbatas pada jumlah yang Anda bayarkan kepada kami dalam 3 bulan terakhir.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">10. Hukum yang Berlaku</h2>
            <p>
              Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui Pengadilan Negeri Jakarta Selatan.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">11. Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai Syarat dan Ketentuan ini, silakan hubungi kami di{" "}
              <a href="mailto:legal@trimly.id" className="text-primary hover:underline">legal@trimly.id</a>.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Trimly. Hak cipta dilindungi.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-foreground transition-colors">Syarat & Ketentuan</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
