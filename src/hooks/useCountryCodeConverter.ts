// Tableau de correspondance entre ISO 639-3 et ISO 3166-1 alpha-2
const countryCodeConverter: { [key: string]: { countryCode: string; languageName: string } } = {
  afr: {
    countryCode: 'ZA',
    languageName: 'Afrikaans',
  },
  ara: {
    countryCode: 'AE',
    languageName: 'Arabe',
  },
  asm: {
    countryCode: 'IN',
    languageName: 'Assamese',
  },
  ava: {
    countryCode: 'RU',
    languageName: 'Avar',
  },
  aze: {
    countryCode: 'AZ',
    languageName: 'Azerbaïdjan',
  },
  bel: {
    countryCode: 'BY',
    languageName: 'Biélorusse',
  },
  ben: {
    countryCode: 'IN',
    languageName: 'Bengali',
  },
  bos: {
    countryCode: 'BA',
    languageName: 'Bosnien',
  },
  bul: {
    countryCode: 'BG',
    languageName: 'Bulgare',
  },
  cat: {
    countryCode: 'ES',
    languageName: 'Catalan',
  },
  ces: {
    countryCode: 'CZ',
    languageName: 'Tchèque',
  },
  chi: {
    countryCode: 'CN',
    languageName: 'Chinois',
  },
  dan: {
    countryCode: 'DK',
    languageName: 'Danois',
  },
  deu: {
    countryCode: 'DE',
    languageName: 'Allemand',
  },
  ell: {
    countryCode: 'GR',
    languageName: 'Grec',
  },
  eng: {
    countryCode: 'GB',
    languageName: 'Anglais',
  },
  epo: {
    countryCode: 'XX',
    languageName: 'Espéranto',
  },
  est: {
    countryCode: 'EE',
    languageName: 'Estonien',
  },
  eus: {
    countryCode: 'ES',
    languageName: 'Basque',
  },
  fin: {
    countryCode: 'FI',
    languageName: 'Finnois',
  },
  fra: {
    countryCode: 'FR',
    languageName: 'Français',
  },
  glg: {
    countryCode: 'ES',
    languageName: 'Galicien',
  },
  guj: {
    countryCode: 'IN',
    languageName: 'Gujarati',
  },
  heb: {
    countryCode: 'IL',
    languageName: 'Hébreu',
  },
  hin: {
    countryCode: 'IN',
    languageName: 'Hindi',
  },
  hrv: {
    countryCode: 'HR',
    languageName: 'Croate',
  },
  hun: {
    countryCode: 'HU',
    languageName: 'Hongrois',
  },
  ibo: {
    countryCode: 'NG',
    languageName: 'Igbo',
  },
  ind: {
    countryCode: 'ID',
    languageName: 'Indonésien',
  },
  isl: {
    countryCode: 'IS',
    languageName: 'Islandais',
  },
  ita: {
    countryCode: 'IT',
    languageName: 'Italien',
  },
  jpn: {
    countryCode: 'JP',
    languageName: 'Japonais',
  },
  kan: {
    countryCode: 'IN',
    languageName: 'Kannada',
  },
  kat: {
    countryCode: 'GE',
    languageName: 'Géorgien',
  },
  kaz: {
    countryCode: 'KZ',
    languageName: 'Kazakh',
  },
  kir: {
    countryCode: 'KG',
    languageName: 'Kirghizistan',
  },
  kor: {
    countryCode: 'KR',
    languageName: 'Coréen',
  },
  lat: {
    countryCode: 'VA',
    languageName: 'Latin',
  },
  lav: {
    countryCode: 'LV',
    languageName: 'Letton',
  },
  lit: {
    countryCode: 'LT',
    languageName: 'Lituanien',
  },
  ltz: {
    countryCode: 'LU',
    languageName: 'Luxembourgeois',
  },
  mal: {
    countryCode: 'MY',
    languageName: 'Malais',
  },
  mar: {
    countryCode: 'IN',
    languageName: 'Marathi',
  },
  mkd: {
    countryCode: 'MK',
    languageName: 'Macédonien',
  },
  mlt: {
    countryCode: 'MT',
    languageName: 'Maltais',
  },
  mri: {
    countryCode: 'NZ',
    languageName: 'Maori',
  },
  msa: {
    countryCode: 'MY',
    languageName: 'Malais',
  },
  nep: {
    countryCode: 'NP',
    languageName: 'Népali',
  },
  nld: {
    countryCode: 'NL',
    languageName: 'Néerlandais',
  },
  nor: {
    countryCode: 'NO',
    languageName: 'Norvégien',
  },
  pan: {
    countryCode: 'IN',
    languageName: 'Pendjabi',
  },
  pol: {
    countryCode: 'PL',
    languageName: 'Polonais',
  },
  por: {
    countryCode: 'PT',
    languageName: 'Portugais',
  },
  pus: {
    countryCode: 'AF',
    languageName: 'Pachtou',
  },
  que: {
    countryCode: 'PE',
    languageName: 'Quechua',
  },
  ron: {
    countryCode: 'RO',
    languageName: 'Roumain',
  },
  rus: {
    countryCode: 'RU',
    languageName: 'Russe',
  },
  sco: {
    countryCode: 'GB',
    languageName: 'Écossais',
  },
  scr: {
    countryCode: 'HR',
    languageName: 'Croate',
  },
  slk: {
    countryCode: 'SK',
    languageName: 'Slovaque',
  },
  slv: {
    countryCode: 'SI',
    languageName: 'Slovène',
  },
  som: {
    countryCode: 'SO',
    languageName: 'Somali',
  },
  spa: {
    countryCode: 'ES',
    languageName: 'Espagnol',
  },
  swa: {
    countryCode: 'KE',
    languageName: 'Swahili',
  },
  swe: {
    countryCode: 'SE',
    languageName: 'Suédois',
  },
  tam: {
    countryCode: 'IN',
    languageName: 'Tamoul',
  },
  tel: {
    countryCode: 'IN',
    languageName: 'Télougou',
  },
  tha: {
    countryCode: 'TH',
    languageName: 'Thaïlandais',
  },
  tur: {
    countryCode: 'TR',
    languageName: 'Turc',
  },
  ukr: {
    countryCode: 'UA',
    languageName: 'Ukrainien',
  },
  urd: {
    countryCode: 'PK',
    languageName: 'Ourdou',
  },
  vie: {
    countryCode: 'VN',
    languageName: 'Vietnamien',
  },
  wel: {
    countryCode: 'GB',
    languageName: 'Gallois',
  },
  yid: {
    countryCode: 'IL',
    languageName: 'Yiddish',
  },
  zho: {
    countryCode: 'CN',
    languageName: 'Chinois',
  },
}

export default function useCountryCodeConverter(lang: string) {
  let conversion = { languageName: '', countryCode: '' }

  if (Object.keys(countryCodeConverter).includes(lang)) {
    conversion = countryCodeConverter[lang]
  }

  return conversion
}
