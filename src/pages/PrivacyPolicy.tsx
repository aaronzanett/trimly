import { Link } from "react-router-dom";
import { ArrowLeft, Scissors } from "lucide-react";

const PrivacyPolicy = () => {
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
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Kebijakan Privasi</h1>
          <p className="text-muted-foreground text-sm">Terakhir diperbarui: 18 Februari 2026</p>
        </div>

        <div className="space-y-8 font-body text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">1. Pendahuluan</h2>
            <p>
              Trimly ("kami", "kita") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat menggunakan platform Trimly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">2. Informasi yang Kami Kumpulkan</h2>
            <p className="mb-2">Kami mengumpulkan informasi berikut saat Anda menggunakan layanan kami:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
              <li><strong className="text-foreground">Informasi Akun</strong>: Nama, alamat email, nomor telepon, dan nama barbershop.</li>
              <li><strong className="text-foreground">Data Bisnis</strong>: Informasi cabang, data karyawan, transaksi, dan laporan keuangan.</li>
              <li><strong className="text-foreground">Data Pelanggan</strong>: Nama, nomor telepon, dan riwayat kunjungan pelanggan barbershop Anda.</li>
              <li><strong className="text-foreground">Data Teknis</strong>: Alamat IP, jenis perangkat, browser, dan log aktivitas.</li>
              <li><strong className="text-foreground">Data Pembayaran</strong>: Informasi langganan dan riwayat transaksi (tidak termasuk data kartu kredit penuh).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">3. Cara Kami Menggunakan Informasi</h2>
            <p className="mb-2">Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
              <li>Menyediakan, mengoperasikan, dan meningkatkan layanan Trimly.</li>
              <li>Memproses pembayaran dan mengelola langganan.</li>
              <li>Mengirimkan notifikasi terkait akun dan pembaruan layanan.</li>
              <li>Memberikan dukungan pelanggan.</li>
              <li>Menganalisis penggunaan platform untuk pengembangan fitur.</li>
              <li>Mematuhi kewajiban hukum yang berlaku.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">4. Berbagi Informasi</h2>
            <p className="mb-2">
              Kami tidak menjual informasi pribadi Anda. Kami dapat berbagi data hanya dalam kondisi berikut:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
              <li><strong className="text-foreground">Mitra Layanan</strong>: Pihak ketiga yang membantu operasional kami (seperti pemrosesan pembayaran) dengan kewajiban kerahasiaan yang ketat.</li>
              <li><strong className="text-foreground">Kewajiban Hukum</strong>: Jika diwajibkan oleh hukum, perintah pengadilan, atau otoritas pemerintah Indonesia.</li>
              <li><strong className="text-foreground">Perlindungan Hak</strong>: Untuk melindungi hak, properti, atau keselamatan Trimly dan penggunanya.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">5. Keamanan Data</h2>
            <p>
              Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data Anda, termasuk enkripsi data saat transit (TLS/HTTPS) dan saat penyimpanan. Namun, tidak ada sistem yang 100% aman, dan kami mendorong Anda untuk menggunakan kata sandi yang kuat.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">6. Penyimpanan Data</h2>
            <p>
              Data Anda disimpan di server yang berlokasi di Indonesia dan/atau wilayah Asia Pasifik. Kami menyimpan data selama akun Anda aktif, atau selama diperlukan untuk keperluan hukum dan bisnis, biasanya tidak lebih dari 5 tahun setelah penghapusan akun.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">7. Cookie dan Teknologi Pelacakan</h2>
            <p>
              Kami menggunakan cookie dan teknologi serupa untuk menjaga sesi login Anda, menganalisis penggunaan platform, dan meningkatkan pengalaman pengguna. Anda dapat menonaktifkan cookie melalui pengaturan browser, namun beberapa fitur mungkin tidak berfungsi optimal.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">8. Hak Anda</h2>
            <p className="mb-2">Sesuai regulasi perlindungan data Indonesia, Anda memiliki hak untuk:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
              <li>Mengakses data pribadi yang kami miliki tentang Anda.</li>
              <li>Meminta koreksi data yang tidak akurat.</li>
              <li>Meminta penghapusan data Anda (dengan batasan tertentu).</li>
              <li>Menarik persetujuan pemrosesan data kapan saja.</li>
              <li>Mengajukan keluhan kepada otoritas perlindungan data.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">9. Privasi Anak</h2>
            <p>
              Layanan Trimly tidak ditujukan untuk individu di bawah usia 18 tahun. Kami tidak secara sengaja mengumpulkan informasi dari anak-anak. Jika Anda mengetahui adanya data anak yang dikirimkan kepada kami, harap hubungi kami segera.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">10. Perubahan Kebijakan</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu. Perubahan signifikan akan diberitahukan melalui email atau notifikasi dalam aplikasi minimal 14 hari sebelum berlaku. Penggunaan layanan yang berkelanjutan setelah pembaruan berarti Anda menerima kebijakan yang baru.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">11. Kontak</h2>
            <p>
              Untuk pertanyaan atau permintaan terkait privasi Anda, hubungi tim kami di{" "}
              <a href="mailto:privacy@trimly.id" className="text-primary hover:underline">privacy@trimly.id</a>{" "}
              atau kirim surat ke:
            </p>
            <address className="mt-2 not-italic text-muted-foreground pl-2 border-l-2 border-border">
              PT Trimly Teknologi Indonesia<br />
              Jl. Sudirman No. 123, Lantai 10<br />
              Jakarta Selatan, DKI Jakarta 12190<br />
              Indonesia
            </address>
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

export default PrivacyPolicy;
