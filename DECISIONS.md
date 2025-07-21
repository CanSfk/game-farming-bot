## Soru: Neden CommonJS modül sistemini kullandım ?

### Cevap: Projeye ESM olarak basladim ama kullandigim bazi `pkg - robotjs` gibi eski guncel olmayan paketler CommonJs modulunu destekliyor. Projeyi paketleme isleminde sorun yasadim. Bu yuzden projeyi CommonJs olarak ayarladim.

## Soru: Proje CommonJS oldugu halde neden ESM ozelliklerini kullandim ?

### Cevap: ESM'nin daha temiz ve alisik oldugum bir tarzi oldugu icin. Build islemini `tups` ile yapiyorum bu sayede benim yerime ESM ozelliklerini CommonJS olarak donusturuyor.

## Soru: Neden projeyi paketlemek icin `pkg` paketini kullandim ?

### Cevap: Kullanimi kolay oldugu icin. Diger paketlere de baktim ama `pkg` daha kolay geldi. Daha sonra baktigim diger paketleri ve neden kullanmadigim buraya not alirim.

## Soru: Neden `robotjs` paketini kullandim.

### Cevap: Amacim sadece klavye ve mouse ile tiklama islemini gerceklestirmek ve bu ihtiyacimi `robotjs` paketi karsiliyordu. Diger paketler ya ihtiyacimi tam olarak karsilamiyor ya da fazla geliyordu.
