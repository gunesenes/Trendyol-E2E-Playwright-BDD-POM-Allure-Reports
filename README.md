Bu senaryo, bir kullanıcının Trendyol platformu üzerindeki deneyimini en başından (arama) en sonuna (ödeme/adres aşaması) kadar simüle eden kapsamlı bir E2E (Uçtan Uca) Regresyon testidir.

Test Adımları:
Hazırlık ve Giriş

Trendyol ana sayfasına gidilir, çerezler kabul edilir ve "Erkek" kategorisi seçilerek giriş yapılır.

Gelişmiş Ürün Arama ve Filtreleme

"Kazak" araması yapılır.

Marka (Bershka) ve Renk (Kırmızı) filtreleri uygulanarak sonuçlar daraltılır.

İlk ürün seçilerek yeni sekmede açılır.

Konum Bazlı Sepet İşlemleri

Konum seçimi (İstanbul/Esenler) yapılarak teslimat verileri güncellenir.

Ürün sepete eklenir; adet artırma ve azaltma fonksiyonlarının doğruluğu kontrol edilir.

Kullanıcı Girişi (Auth)

Ödeme adımında "Giriş Yap" sayfasına yönlendirme doğrulanır.

Mevcut kullanıcı bilgileriyle sisteme login olunur.

Kategori Navigasyonu ve Sıralama

Menü üzerinden "Erkek > Günlük Ayakkabı" kategorisine gidilir.

"Siyah" renk ve "3000 TL - 4000 TL" fiyat filtreleri uygulanır.

Ürünler "En Yüksek Fiyat"a göre sıralanır ve seçilen ürün sepete eklenir.

Dinamik Adres Yönetimi

"Yeni Adres Ekle" formu doldurulur.

İl, İlçe ve Mahalle seçimleri yapılırken dinamik (rastgele) adres başlığı oluşturularak form kaydedilir.

Veri Temizliği 

Testin sürekliliği için sepetteki ürünler silinerek hesap bir sonraki teste hazır hale getirilir.
