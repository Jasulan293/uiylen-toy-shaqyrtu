import { WeddingData, GuestWish } from '../types';

export const INITIAL_WEDDING_DATA: WeddingData = {
  groomName: 'Жасұлан',
  brideName: 'Шырайлы',
  monogram: 'Ж & Ш',
  date: '2026-12-13',
  time: '19:00',
  city: 'Кентау қ.',
  venueName: 'Bay-Sal Kerim',
  venueAddress: 'Кентау қаласы, Bay-Sal Kerim салтанат сарайы',
  mapGisUrl: 'https://2gis.kz/turkestan/geo/70000001067529703?inv_by=bbd6e645e7e249c6ab0efaf36be3e74b&inv_ts=1794325747',
  mapYandexUrl: 'https://yandex.kz/maps/?text=Bay-Sal%20Kerim%20Кентау',
  mapGoogleUrl: 'https://www.google.com/maps/search/?api=1&query=Bay-Sal+Kerim+Kentau',
  heroKicker: 'ҮЙЛЕНУ ТОЙҒА ШАҚЫРУ',
  heroHeadline: 'Бақытымызға ортақ болыңыздар',
  heroSubtitle: 'Біздің махаббат хикаямыздың ең маңызды сәтін бірге қарсы алып, қуанышымызды бөлісуге шақырамыз.',
  invitationText: 'Құрметті ағайын-туыс, бауырлар, құда-жекжат және ардақты достар! Сіздерді ұлымыз бен қызымыздың отау құру салтанатына арналған үйлену тойына шын жүректен қадірлі қонақ болуға шақырамыз.',
  parentsText: 'Той иелері: ата-аналары',
  heroImage: '/src/assets/images/hero_wedding_couple_1794311551143.jpg',
  ringsImage: '/src/assets/images/rings_wedding_editorial_1794311551343.jpg',
  venueImage: '/src/assets/images/venue_reception_dinner_1794311551835.jpg',
  dressCodeDescription: 'Біздің мерекеміздің үйлесімді әрі есте қаларлықтай өтуі үшін келесі түстер палитрасындағы салтанатты киім үлгісін таңдауыңызды өтінеміз:',
  dressCodeColors: [
    { name: 'Ақшыл сүт', hex: '#F5F5F7' },
    { name: 'Шампань', hex: '#EADBCE' },
    { name: 'Жұмсақ беж', hex: '#D8C7B5' },
    { name: 'Титан сұр', hex: '#A1A1A6' },
    { name: 'Сәнді қара', hex: '#1D1D1F' },
  ],
  timeline: [
    {
      time: '17:00',
      title: 'Welcome Drink & Қонақтарды қарсы алу',
      desc: 'Жеңіл фуршет, скрипка әуені және фотоаймақта естелік суретке түсу.',
      icon: 'GlassWater',
    },
    {
      time: '18:00',
      title: 'Салтанатты неке қию рәсімі',
      desc: 'Жас жұбайлардың жүрекжарды серті мен сақина алмасу сәті.',
      icon: 'HeartHandshake',
    },
    {
      time: '19:00',
      title: 'Тойдың ресми ашылуы & Ақ бата',
      desc: 'Ата-аналардың, құдалардың ізгі тілектері мен дастархан салтанаты.',
      icon: 'Sparkles',
    },
    {
      time: '21:00',
      title: 'Жас жұбайлардың алғашқы вальсі & Би кеші',
      desc: 'Музыкалық шоу-бағдарлама, әндер және интерактивті тосынсыйлар.',
      icon: 'Music',
    },
    {
      time: '23:00',
      title: 'Той тортын кесу & Салтанатты аяқталу',
      desc: 'Тәтті тілектер, естелік фотолар және салтанатты шамдармен қоштасу.',
      icon: 'Cake',
    },
  ],
};

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'w-1',
    author: 'Ернар & Меруерт',
    message: 'Жастар бақытты болсын! Махаббаттарыңыз мәңгілік болып, шаңырақтарыңыз шаттыққа толсын! Тойға міндетті түрде барамыз.',
    createdAt: '1 сағат бұрын',
    likes: 12,
  },
  {
    id: 'w-2',
    author: 'Айбек аға отбасымен',
    message: 'Қос аққудай жарасқан жұп болыңыздар. Дендеріңіз сау, бастарыңыз аман болсын, ұрпақтарыңыз көп болсын!',
    createdAt: '3 сағат бұрын',
    likes: 8,
  },
  {
    id: 'w-3',
    author: 'Аружан & Данияр',
    message: 'Шын жүректен құттықтаймыз! Керемет шақырту сайты екен! 19-қыркүйекті асыға күтеміз!',
    createdAt: 'Кеше',
    likes: 15,
  },
];
