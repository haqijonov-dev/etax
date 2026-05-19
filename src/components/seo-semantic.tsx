type Topic = { h: string; p: string };

type Copy = {
  intro: { h: string; p: string };
  topics: Topic[];
  service: { h: string; p: string };
  contact: { h: string; p: string };
};

const COPY: Record<string, Copy> = {
  uz: {
    intro: {
      h: "Farg'ona shahridagi buxgalteriya va soliq xizmatlari — E-tax",
      p: "E-tax (taxservice.uz) — Farg'ona shahrida joylashgan, O'zbekiston bo'ylab MChJ, YaTT va kichik bizneslar uchun professional buxgalteriya, soliq hisoboti va konsalting xizmatlarini taqdim etuvchi jamoa. Biz buxgalteriya hisobini to'liq yuritamiz, soliq hisobotlarini, NDS deklaratsiyasini va foyda solig'i hisobotini o'z vaqtida tayyorlab davlat soliq qo'mitasiga topshiramiz, e-faktura tizimida (didox, faktura.uz) ishlaymiz, kadrlar hujjatlari, mehnat shartnomalari va ish haqi hisobini olib boramiz, kunlik bank operatsiyalarini nazorat qilamiz, MChJ va YaTT ochish, yopish hamda qayta ro'yxatdan o'tkazish xizmatlarini ko'rsatamiz. 12+ yillik tajriba, 200+ doimiy mijoz, 3 yildan 20 yilgacha ish staji.",
    },
    topics: [
      {
        h: "MChJ uchun buxgalter xizmati Farg'ona",
        p: "MChJ uchun to'liq buxgalteriya yuritish va soliq hisoboti: NDS, foyda solig'i, aylanma soliq, ijtimoiy soliqlar — barchasi belgilangan muddatda, jarimasiz topshiriladi. MChJ ro'yxatdan o'tkazish, ustav kapitali kiritish, qayta ro'yxatdan o'tkazish va likvidatsiya xizmatlari ham bor.",
      },
      {
        h: "YaTT uchun buxgalteriya xizmati",
        p: "Yakka tartibdagi tadbirkor (YaTT) uchun soddalashtirilgan buxgalteriya yuritish. Yagona soliq to'lov hisob-kitoblari, hisob-fakturalar, soliq deklaratsiyalari va yillik hisobotlar — barchasi o'z vaqtida.",
      },
      {
        h: "NDS hisoboti va deklaratsiyasi",
        p: "Qo'shilgan qiymat solig'i (NDS) bo'yicha oylik va choraklik hisobotlarni tayyorlash, NDS deklaratsiyasini soliq inspeksiyasiga topshirish, NDS qaytarilishi va NDS bo'yicha sodir bo'lgan xatoliklarni tuzatish.",
      },
      {
        h: "Elektron hisob-faktura (e-faktura) xizmati",
        p: "didox.uz va faktura.uz tizimlarida elektron hisob-fakturalarni yaratish, qabul qilish, ro'yxatdan o'tkazish va tasdiqlash. ERP va boshqaruv tizimlari bilan integratsiya.",
      },
      {
        h: "Kadrlar (HR) va ish haqi hisobi",
        p: "Mehnat shartnomalari tuzish, buyruqlar tayyorlash, kadrlar hujjatlari yuritish, ish haqi hisob-kitoblari, ta'til va kasallik varaqasi to'lovlari, kadrlar bo'limini to'liq yuritish.",
      },
      {
        h: "Soliq konsalting va optimizatsiya",
        p: "Soliq jarimalarini oldini olish, soliq yuklarini qonun doirasida kamaytirish, murakkab soliq vaziyatlarida professional maslahat, soliq inspeksiyasi tekshiruvlariga tayyorlanish.",
      },
      {
        h: "Korxona ochish va yopish",
        p: "MChJ, YaTT, AJ va boshqa shakldagi korxonalarni ochish, ro'yxatdan o'tkazish, qayta ro'yxatdan o'tkazish va yopish (likvidatsiya). Hujjatlarni davlat xizmatlari markazlariga topshirish.",
      },
    ],
    service: {
      h: "Buxgalter xizmati narxi",
      p: "Buxgalteriya xizmati narxi biznes hajmi, oylik operatsiyalar soni va kerakli xizmatlar to'plamiga qarab belgilanadi. Kichik bizneslar uchun oyiga 500 000 so'mdan boshlanadi. O'rta bizneslar uchun 1 500 000 – 7 000 000 so'm oralig'ida. Aniq narx bepul konsultatsiyada belgilanadi.",
    },
    contact: {
      h: "Bog'lanish",
      p: "Telefon: +998 90 849 8989. Telegram: @omad9999. Manzil: Farg'ona shahri, Samo sport majmuasi ro'parasi. Ish vaqti: Dushanba–Shanba, 09:00–18:00. Veb-sayt: taxservice.uz.",
    },
  },
  "uz-cyrl": {
    intro: {
      h: "Фарғона шаҳридаги бухгалтерия ва солиқ хизматлари — E-tax",
      p: "E-tax (taxservice.uz) — Фарғона шаҳрида жойлашган, Ўзбекистон бўйлаб МЧЖ, ЯТТ ва кичик бизнеслар учун профессионал бухгалтерия, солиқ ҳисоботи ва консалтинг хизматларини тақдим этувчи жамоа. Биз бухгалтерия ҳисобини тўлиқ юритамиз, солиқ ҳисоботларини, НДС декларациясини ва фойда солиғи ҳисоботини ўз вақтида тайёрлаб давлат солиқ қўмитасига топширамиз, э-фактура тизимида (didox, faktura.uz) ишлаймиз, кадрлар ҳужжатлари, меҳнат шартномалари ва иш ҳақи ҳисобини олиб борамиз, кунлик банк операцияларини назорат қиламиз, МЧЖ ва ЯТТ очиш, ёпиш ҳамда қайта рўйхатдан ўтказиш хизматларини кўрсатамиз. 12+ йиллик тажриба, 200+ доимий мижоз, 3 йилдан 20 йилгача иш стажи.",
    },
    topics: [
      {
        h: "МЧЖ учун бухгалтер хизмати Фарғона",
        p: "МЧЖ учун тўлиқ бухгалтерия юритиш ва солиқ ҳисоботи: НДС, фойда солиғи, айланма солиқ, ижтимоий солиқлар — барчаси белгиланган муддатда, жаримасиз топширилади. МЧЖ рўйхатдан ўтказиш, устав капитали киритиш, қайта рўйхатдан ўтказиш ва ликвидация хизматлари ҳам бор.",
      },
      {
        h: "ЯТТ учун бухгалтерия хизмати",
        p: "Якка тартибдаги тадбиркор (ЯТТ) учун соддалаштирилган бухгалтерия юритиш. Ягона солиқ тўлов ҳисоб-китоблари, ҳисоб-фактуралар, солиқ декларациялари ва йиллик ҳисоботлар — барчаси ўз вақтида.",
      },
      {
        h: "НДС ҳисоботи ва декларацияси",
        p: "Қўшилган қиймат солиғи (НДС) бўйича ойлик ва чораклик ҳисоботларни тайёрлаш, НДС декларациясини солиқ инспекциясига топшириш, НДС қайтарилиши ва НДС бўйича содир бўлган хатоликларни тузатиш.",
      },
      {
        h: "Электрон ҳисоб-фактура (э-фактура) хизмати",
        p: "didox.uz ва faktura.uz тизимларида электрон ҳисоб-фактураларни яратиш, қабул қилиш, рўйхатдан ўтказиш ва тасдиқлаш. ERP ва бошқарув тизимлари билан интеграция.",
      },
      {
        h: "Кадрлар (HR) ва иш ҳақи ҳисоби",
        p: "Меҳнат шартномалари тузиш, буйруқлар тайёрлаш, кадрлар ҳужжатлари юритиш, иш ҳақи ҳисоб-китоблари, таътил ва касаллик варақаси тўловлари, кадрлар бўлимини тўлиқ юритиш.",
      },
      {
        h: "Солиқ консалтинг ва оптимизация",
        p: "Солиқ жарималарини олдини олиш, солиқ юкларини қонун доирасида камайтириш, мураккаб солиқ вазиятларида профессионал маслаҳат, солиқ инспекцияси текширувларига тайёрланиш.",
      },
      {
        h: "Корхона очиш ва ёпиш",
        p: "МЧЖ, ЯТТ, АЖ ва бошқа шаклдаги корхоналарни очиш, рўйхатдан ўтказиш, қайта рўйхатдан ўтказиш ва ёпиш (ликвидация). Ҳужжатларни давлат хизматлари марказларига топшириш.",
      },
    ],
    service: {
      h: "Бухгалтер хизмати нархи",
      p: "Бухгалтерия хизмати нархи бизнес ҳажми, ойлик операциялар сони ва керакли хизматлар тўпламига қараб белгиланади. Кичик бизнеслар учун ойига 500 000 сўмдан бошланади. Ўрта бизнеслар учун 1 500 000 – 7 000 000 сўм оралиғида. Аниқ нарх бепул консультацияда белгиланади.",
    },
    contact: {
      h: "Боғланиш",
      p: "Телефон: +998 90 849 8989. Телеграм: @omad9999. Манзил: Фарғона шаҳри, Само спорт мажмуаси рўпараси. Иш вақти: Душанба–Шанба, 09:00–18:00. Веб-сайт: taxservice.uz.",
    },
  },
  ru: {
    intro: {
      h: "Бухгалтерские и налоговые услуги в Фергане — E-tax",
      p: "E-tax (taxservice.uz) — команда из города Фергана, оказывающая профессиональные бухгалтерские, налоговые и консалтинговые услуги ООО, ИП и малому бизнесу по всему Узбекистану. Мы ведём полный бухгалтерский учёт, своевременно сдаём в налоговые органы отчёты по НДС, налогу на прибыль и другим налогам, работаем с системой электронных счёт-фактур (didox, faktura.uz), оформляем кадровые документы, трудовые договоры, ведём расчёт заработной платы, контролируем ежедневные банковские операции, регистрируем, перерегистрируем и закрываем ООО и ИП. 12+ лет опыта, 200+ постоянных клиентов, стаж команды от 3 до 20 лет.",
    },
    topics: [
      {
        h: "Бухгалтер для ООО в Фергане",
        p: "Полное ведение бухгалтерского учёта ООО и налоговой отчётности: НДС, налог на прибыль, оборотный налог, социальные налоги — всё сдаётся в срок, без штрафов. Регистрация ООО, внесение уставного капитала, перерегистрация и ликвидация — под ключ.",
      },
      {
        h: "Бухгалтерия для ИП",
        p: "Упрощённое ведение бухгалтерии для индивидуального предпринимателя (ИП). Расчёт единого налогового платежа, счёт-фактуры, налоговые декларации и годовые отчёты — всё вовремя.",
      },
      {
        h: "Отчётность и декларация по НДС",
        p: "Подготовка ежемесячных и квартальных отчётов по налогу на добавленную стоимость (НДС), сдача декларации в налоговую инспекцию, возврат НДС и исправление ошибок по НДС.",
      },
      {
        h: "Электронная счёт-фактура (э-фактура)",
        p: "Создание, приём, регистрация и подтверждение электронных счёт-фактур в системах didox.uz и faktura.uz. Интеграция с ERP и системами учёта.",
      },
      {
        h: "Кадровый учёт (HR) и расчёт зарплаты",
        p: "Оформление трудовых договоров, приказов, ведение кадровой документации, расчёт заработной платы, отпускных и больничных, полное ведение HR-делопроизводства.",
      },
      {
        h: "Налоговый консалтинг и оптимизация",
        p: "Профилактика налоговых штрафов, законное снижение налоговой нагрузки, профессиональные консультации в сложных налоговых ситуациях, подготовка к налоговым проверкам.",
      },
      {
        h: "Открытие и закрытие предприятий",
        p: "Открытие, регистрация, перерегистрация и закрытие (ликвидация) ООО, ИП, АО и других форм предприятий. Подача документов через центры государственных услуг.",
      },
    ],
    service: {
      h: "Стоимость бухгалтерских услуг",
      p: "Стоимость бухгалтерских услуг определяется размером бизнеса, количеством месячных операций и нужным пакетом услуг. Для малого бизнеса — от 500 000 сум в месяц. Для среднего бизнеса — 1 500 000 – 7 000 000 сум. Точная стоимость определяется на бесплатной консультации.",
    },
    contact: {
      h: "Контакты",
      p: "Телефон: +998 90 849 8989. Telegram: @omad9999. Адрес: г. Фергана, напротив спорткомплекса «Само». Время работы: понедельник–суббота, 09:00–18:00. Сайт: taxservice.uz.",
    },
  },
};

export function SeoSemantic({ locale }: { locale: string }) {
  const copy = COPY[locale] ?? COPY.uz;

  return (
    <aside className="sr-only" aria-label={copy.intro.h}>
      <section>
        <h2>{copy.intro.h}</h2>
        <p>{copy.intro.p}</p>
      </section>
      {copy.topics.map((topic, i) => (
        <section key={i}>
          <h3>{topic.h}</h3>
          <p>{topic.p}</p>
        </section>
      ))}
      <section>
        <h3>{copy.service.h}</h3>
        <p>{copy.service.p}</p>
      </section>
      <section>
        <h3>{copy.contact.h}</h3>
        <p>{copy.contact.p}</p>
      </section>
    </aside>
  );
}
