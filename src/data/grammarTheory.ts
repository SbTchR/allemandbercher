export const grammarTheoryPageSlugs = [
  'les-cas-theorie-de-base',
  'tableaux-de-declinaisons',
  'les-prepositions',
  'le-genitif',
] as const;

export type GrammarTheoryPageSlug = (typeof grammarTheoryPageSlugs)[number];

export type GrammarTone = 'nominative' | 'accusative' | 'dative' | 'genitive' | 'preposition';

export type GrammarTableCell =
  | string
  | {
      text: string;
      html?: string;
      tone?: GrammarTone;
    };

export type GrammarTable = {
  title: string;
  note?: string;
  columns: string[];
  rows: GrammarTableCell[][];
  tone?: GrammarTone;
  rowTones?: (GrammarTone | undefined)[];
  columnTones?: (GrammarTone | undefined)[];
};

export type GrammarPracticeItem = {
  prompt: string;
  sentence: string;
  choices: string[];
  answer: string;
  hint: string;
  feedback: string;
};

export type ExternalLinkGroup = {
  title: string;
  links: {
    label: string;
    url: string;
  }[];
};

const genderColumns = ['Cas', 'Masculin', 'Neutre', 'Féminin', 'Pluriel'];

const possessiveForm = (stem: string, ending = ''): GrammarTableCell => ({
  text: `${stem}${ending}`,
  html: `<span class="mark-determiner">${stem}${ending ? `<span class="mark-ending">${ending}</span>` : ''}</span>`,
});

const adjectiveExample = (
  determiner: string,
  adjectiveStem: string,
  ending: string,
  noun: string,
): GrammarTableCell => ({
  text: `${determiner} ${adjectiveStem}${ending} ${noun}`,
  html: `<span class="mark-determiner">${determiner}</span> <span class="mark-adjective">${adjectiveStem}<span class="mark-ending">${ending}</span></span> ${noun}`,
});

const genitiveExample = (
  determiner: string,
  adjectiveStem: string,
  adjectiveEnding: string,
  nounStem: string,
  nounEnding = '',
): GrammarTableCell => ({
  text: `${determiner} ${adjectiveStem}${adjectiveEnding} ${nounStem}${nounEnding}`,
  html: `<span class="mark-determiner">${determiner}</span> <span class="mark-adjective">${adjectiveStem}<span class="mark-ending">${adjectiveEnding}</span></span> ${nounStem}${nounEnding ? `<span class="mark-ending">${nounEnding}</span>` : ''}`,
});

export const declensionTables = {
  shortcut: {
    title: 'Repère rapide des déterminants',
    note: 'Trouve le cas, puis le genre ou le nombre du nom.',
    columns: genderColumns,
    rows: [
      ['Nominatif', 'der / ein', 'das / ein', 'die / eine', 'die'],
      ['Accusatif', 'den / einen', 'das / ein', 'die / eine', 'die'],
      ['Datif', 'dem / einem', 'dem / einem', 'der / einer', 'den'],
    ],
    rowTones: ['nominative', 'accusative', 'dative'],
  },
  definiteDeterminers: {
    title: 'Déterminants définis',
    note: 'der, das et die changent de forme selon le cas.',
    columns: genderColumns,
    rows: [
      ['Nominatif', 'der', 'das', 'die', 'die'],
      ['Accusatif', 'den', 'das', 'die', 'die'],
      ['Datif', 'dem', 'dem', 'der', 'den'],
    ],
    rowTones: ['nominative', 'accusative', 'dative'],
  },
  possessiveDeterminers: {
    title: 'Modèle ein, kein et possessifs',
    note: 'Le tableau utilise mein. Ein, kein, dein, sein, ihr, unser et euer suivent le même modèle.',
    columns: genderColumns,
    rows: [
      ['Nominatif', possessiveForm('mein'), possessiveForm('mein'), possessiveForm('mein', 'e'), possessiveForm('mein', 'e')],
      ['Accusatif', possessiveForm('mein', 'en'), possessiveForm('mein'), possessiveForm('mein', 'e'), possessiveForm('mein', 'e')],
      ['Datif', possessiveForm('mein', 'em'), possessiveForm('mein', 'em'), possessiveForm('mein', 'er'), possessiveForm('mein', 'en')],
    ],
    rowTones: ['nominative', 'accusative', 'dative'],
  },
  adjectiveAfterDefinite: {
    title: 'Adjectif après un déterminant défini',
    note: 'Observe la terminaison soulignée de l’adjectif.',
    columns: genderColumns,
    rows: [
      [
        'Nominatif',
        adjectiveExample('der', 'rot', 'e', 'Schal'),
        adjectiveExample('das', 'rot', 'e', 'Hemd'),
        adjectiveExample('die', 'rot', 'e', 'Jacke'),
        adjectiveExample('die', 'rot', 'en', 'Schuhe'),
      ],
      [
        'Accusatif',
        adjectiveExample('den', 'rot', 'en', 'Schal'),
        adjectiveExample('das', 'rot', 'e', 'Hemd'),
        adjectiveExample('die', 'rot', 'e', 'Jacke'),
        adjectiveExample('die', 'rot', 'en', 'Schuhe'),
      ],
      [
        'Datif',
        adjectiveExample('dem', 'rot', 'en', 'Schal'),
        adjectiveExample('dem', 'rot', 'en', 'Hemd'),
        adjectiveExample('der', 'rot', 'en', 'Jacke'),
        adjectiveExample('den', 'rot', 'en', 'Schuhen'),
      ],
    ],
    rowTones: ['nominative', 'accusative', 'dative'],
  },
  adjectiveAfterPossessive: {
    title: 'Adjectif après ein ou un possessif',
    note: 'Quand le déterminant ne porte pas de terminaison, l’adjectif donne davantage d’informations.',
    columns: genderColumns,
    rows: [
      [
        'Nominatif',
        adjectiveExample('mein', 'rot', 'er', 'Schal'),
        adjectiveExample('mein', 'rot', 'es', 'Hemd'),
        adjectiveExample('meine', 'rot', 'e', 'Jacke'),
        adjectiveExample('meine', 'rot', 'en', 'Schuhe'),
      ],
      [
        'Accusatif',
        adjectiveExample('meinen', 'rot', 'en', 'Schal'),
        adjectiveExample('mein', 'rot', 'es', 'Hemd'),
        adjectiveExample('meine', 'rot', 'e', 'Jacke'),
        adjectiveExample('meine', 'rot', 'en', 'Schuhe'),
      ],
      [
        'Datif',
        adjectiveExample('meinem', 'rot', 'en', 'Schal'),
        adjectiveExample('meinem', 'rot', 'en', 'Hemd'),
        adjectiveExample('meiner', 'rot', 'en', 'Jacke'),
        adjectiveExample('meinen', 'rot', 'en', 'Schuhen'),
      ],
    ],
    rowTones: ['nominative', 'accusative', 'dative'],
  },
  personalPronouns: {
    title: 'Pronoms personnels',
    note: 'La couleur correspond au cas ; les libellés distinguent les formes identiques.',
    columns: ['Personne', 'Nominatif', 'Accusatif', 'Datif'],
    rows: [
      ['je', 'ich', 'mich', 'mir'],
      ['tu', 'du', 'dich', 'dir'],
      ['il (masculin)', 'er', 'ihn', 'ihm'],
      ['neutre', 'es', 'es', 'ihm'],
      ['elle', 'sie', 'sie', 'ihr'],
      ['nous', 'wir', 'uns', 'uns'],
      ['vous (pluriel)', 'ihr', 'euch', 'euch'],
      ['ils / elles', 'sie', 'sie', 'ihnen'],
      ['vous (politesse)', 'Sie', 'Sie', 'Ihnen'],
    ],
    columnTones: [undefined, 'nominative', 'accusative', 'dative'],
  },
} satisfies Record<string, GrammarTable>;

export const prepositionTables = {
  accusative: {
    title: 'Prépositions prioritaires + accusatif',
    note: 'La préposition impose l’accusatif.',
    columns: ['Préposition', 'Sens principal', 'Exemple'],
    rows: [
      ['durch', 'à travers', 'durch den Park'],
      ['für', 'pour', 'für meinen Geburtstag'],
      ['gegen', 'contre / vers une heure approximative', 'gegen den besten Spieler / gegen acht Uhr'],
      ['ohne', 'sans', 'ohne seine Hilfe'],
      ['um', 'autour de / à une heure précise', 'um das Haus / um sieben Uhr'],
    ],
    tone: 'accusative',
  },
  dative: {
    title: 'Prépositions et constructions prioritaires + datif',
    note: 'Cette liste correspond aux formes à maîtriser dans la leçon.',
    columns: ['Préposition', 'Sens principal', 'Exemple'],
    rows: [
      ['aus', 'hors de / en matière de', 'aus der Schule / aus Holz'],
      ['bei', 'chez / près de', 'bei mir zu Hause / bei Bercher'],
      ['mit', 'avec', 'mit meinem Freund'],
      ['nach', 'à, en / après', 'nach Berlin / nach der Schule'],
      ['seit', 'depuis', 'seit einer Woche'],
      ['von', 'de', 'von meinem Bruder'],
      ['zu', 'à, en direction de / pour un événement', 'zum Bahnhof / zu Weihnachten'],
      ['gegenüber', 'en face de', 'gegenüber der Post'],
      ['an … vorbei', 'passer devant', 'an der Kirche vorbei'],
    ],
    tone: 'dative',
  },
  mixed: {
    title: 'Prépositions mixtes : wo ou wohin ?',
    note: 'Datif pour le lieu de l’action (wo ?). Accusatif pour la direction vers un but (wohin ?).',
    columns: ['Préposition', 'Lieu — wo ? : datif', 'Direction — wohin ? : accusatif'],
    rows: [
      ['an', 'an der Wand', 'an die Wand'],
      ['auf', 'auf dem Tisch', 'auf den Tisch'],
      ['in', 'in dem Haus / im Haus', 'in das Haus / ins Haus'],
      ['neben', 'neben dem Schrank', 'neben den Schrank'],
      ['über', 'über dem Bett', 'über das Bett'],
      ['unter', 'unter dem Stuhl', 'unter den Stuhl'],
      ['hinter', 'hinter dem Haus', 'hinter das Haus'],
      ['vor', 'vor dem Kino', 'vor das Kino'],
      ['zwischen', 'zwischen den Bäumen', 'zwischen die Bäume'],
    ],
    columnTones: ['preposition', 'dative', 'accusative'],
  },
} satisfies Record<string, GrammarTable>;

export const genitiveTable = {
  title: 'Déclinaisons du génitif',
  note: 'Au masculin et au neutre, le nom reçoit généralement -(e)s.',
  columns: ['Type', 'Masculin', 'Neutre', 'Féminin', 'Pluriel'],
  rows: [
    [
      'Déterminant défini',
      genitiveExample('des', 'nett', 'en', 'Bruder', 's'),
      genitiveExample('des', 'nett', 'en', 'Kind', 'es'),
      genitiveExample('der', 'nett', 'en', 'Mutter'),
      genitiveExample('der', 'nett', 'en', 'Eltern'),
    ],
    [
      'Type ein / possessif',
      genitiveExample('eines', 'nett', 'en', 'Bruder', 's'),
      genitiveExample('eines', 'nett', 'en', 'Kind', 'es'),
      genitiveExample('einer', 'nett', 'en', 'Mutter'),
      genitiveExample('meiner', 'nett', 'en', 'Eltern'),
    ],
  ],
  tone: 'genitive',
} satisfies GrammarTable;

export const grammarPractices = {
  'les-cas-theorie-de-base': {
    title: 'Mission : trouver le cas',
    intro: 'Lis la phrase, repère le rôle du groupe souligné, puis choisis le cas ou la forme correcte.',
    items: [
      {
        prompt: 'Quel est le cas de « einen Brief » ?',
        sentence: 'Heute schickt das Mädchen einen Brief.',
        choices: ['nominatif', 'accusatif', 'datif'],
        answer: 'accusatif',
        hint: 'Pose la question : das Mädchen schickt quoi ?',
        feedback: '« einen Brief » est le CVD. Le CVD se met à l’accusatif.',
      },
      {
        prompt: 'Quel est le cas de « das Mädchen » ?',
        sentence: 'Heute schickt das Mädchen einen Brief.',
        choices: ['nominatif', 'accusatif', 'datif'],
        answer: 'nominatif',
        hint: 'Cherche qui fait l’action du verbe schickt.',
        feedback: '« das Mädchen » est le sujet. Le sujet est au nominatif.',
      },
      {
        prompt: 'Quel est le cas de « seiner Freundin » ?',
        sentence: 'Er schenkt seiner Freundin ein Buch.',
        choices: ['nominatif', 'accusatif', 'datif'],
        answer: 'datif',
        hint: 'Pose la question : il offre un livre à qui ?',
        feedback: '« seiner Freundin » est le CVI. Le CVI se met au datif.',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Ich sehe ___ Lehrer.',
        choices: ['der', 'den', 'dem'],
        answer: 'den',
        hint: 'Lehrer est masculin et il est CVD de sehen.',
        feedback: 'Masculin + accusatif donne « den Lehrer ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Wir helfen ___ Kind.',
        choices: ['das', 'dem', 'den'],
        answer: 'dem',
        hint: 'helfen se construit avec un complément au datif.',
        feedback: 'Neutre + datif donne « dem Kind ».',
      },
    ],
  },
  'tableaux-de-declinaisons': {
    title: 'Mission : lire les tableaux',
    intro: 'Utilise les tableaux comme une carte : genre, nombre, cas, puis forme.',
    items: [
      {
        prompt: 'Quelle forme faut-il choisir ?',
        sentence: 'Ich trage ___ roten Schal.',
        choices: ['der', 'den', 'dem'],
        answer: 'den',
        hint: 'Schal est masculin et il est CVD de tragen.',
        feedback: 'Masculin accusatif : « den roten Schal ».',
      },
      {
        prompt: 'Quelle forme faut-il choisir ?',
        sentence: '___ rote Jacke ist neu.',
        choices: ['die', 'der', 'den'],
        answer: 'die',
        hint: 'Jacke est féminin et le groupe est sujet.',
        feedback: 'Féminin nominatif : « die rote Jacke ».',
      },
      {
        prompt: 'Quelle forme faut-il choisir ?',
        sentence: 'Wir sprechen mit ___ netten Lehrerin.',
        choices: ['die', 'der', 'den'],
        answer: 'der',
        hint: 'mit impose toujours le datif.',
        feedback: 'Féminin datif : « mit der netten Lehrerin ».',
      },
      {
        prompt: 'Quel pronom remplace « ich » au datif ?',
        sentence: 'Kannst du ___ helfen?',
        choices: ['mich', 'mir', 'ich'],
        answer: 'mir',
        hint: 'helfen demande le datif.',
        feedback: 'Le datif de « ich » est « mir ».',
      },
      {
        prompt: 'Quel pronom remplace « er » à l’accusatif ?',
        sentence: 'Ich kenne ___.',
        choices: ['ihn', 'ihm', 'er'],
        answer: 'ihn',
        hint: 'kennen prend un CVD.',
        feedback: 'L’accusatif de « er » est « ihn ».',
      },
    ],
  },
  'les-prepositions': {
    title: 'Mission : préposition + cas',
    intro: 'Commence par la préposition. Si elle est mixte, demande-toi si le groupe répond à wo ? ou à wohin ?.',
    items: [
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Das Geschenk ist für ___ Freund.',
        choices: ['mein', 'meinen', 'meinem'],
        answer: 'meinen',
        hint: 'für est toujours suivi de l’accusatif.',
        feedback: 'für + masculin accusatif : « für meinen Freund ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Ich gehe mit ___ Freundin ins Kino.',
        choices: ['meine', 'meiner', 'meinen'],
        answer: 'meiner',
        hint: 'mit est toujours suivi du datif.',
        feedback: 'mit + féminin datif : « mit meiner Freundin ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Peter legt das Heft auf ___ Tisch.',
        choices: ['der', 'den', 'dem'],
        answer: 'den',
        hint: 'Le groupe répond à wohin ? : vers la table.',
        feedback: 'Préposition mixte + direction vers un but : accusatif, donc « auf den Tisch ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Das Heft liegt auf ___ Tisch.',
        choices: ['der', 'den', 'dem'],
        answer: 'dem',
        hint: 'Le groupe répond à wo ? : sur la table.',
        feedback: 'Préposition mixte + lieu déjà établi : datif, donc « auf dem Tisch ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Wir gehen in ___ Kino.',
        choices: ['das', 'dem', 'den'],
        answer: 'das',
        hint: 'Le groupe répond à wohin ? : vers le cinéma.',
        feedback: 'in + direction vers un but + neutre : accusatif, donc « in das Kino » ou « ins Kino ».',
      },
    ],
  },
  'le-genitif': {
    title: 'Mission : construire le génitif',
    intro: 'Cherche d’abord le possesseur : c’est ce groupe qui passe au génitif.',
    items: [
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Die Jacke ___ jungen Mannes ist blau.',
        choices: ['der', 'des', 'dem'],
        answer: 'des',
        hint: 'Mann est masculin et le groupe exprime la possession.',
        feedback: 'Masculin génitif : « des jungen Mannes ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Das Zimmer ___ kleinen Kindes ist hell.',
        choices: ['des', 'dem', 'das'],
        answer: 'des',
        hint: 'Kind est neutre.',
        feedback: 'Neutre génitif : « des kleinen Kindes ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Die Tasche ___ netten Lehrerin liegt hier.',
        choices: ['die', 'der', 'des'],
        answer: 'der',
        hint: 'Lehrerin est féminin.',
        feedback: 'Féminin génitif : « der netten Lehrerin ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Das Auto ___ alten Eltern ist rot.',
        choices: ['des', 'der', 'den'],
        answer: 'der',
        hint: 'Eltern est pluriel.',
        feedback: 'Pluriel génitif : « der alten Eltern ».',
      },
      {
        prompt: 'Quelle forme complète la phrase ?',
        sentence: 'Trotz ___ guten Noten ist sie nervös.',
        choices: ['meiner', 'meinen', 'meinem'],
        answer: 'meiner',
        hint: 'trotz peut être suivi du génitif dans cette construction.',
        feedback: 'On dit ici « trotz meiner guten Noten ».',
      },
    ],
  },
} satisfies Record<GrammarTheoryPageSlug, { title: string; intro: string; items: GrammarPracticeItem[] }>;

export const externalLinkGroups = {
  'les-cas-theorie-de-base': [
    {
      title: 'Déterminants et cas',
      links: [
        {
          label: 'Déterminants définis',
          url: 'https://deutschlernerblog.de/deklination-bestimmter-artikel-online-uebungen-grammatikuebungen/',
        },
        {
          label: 'Déterminants indéfinis',
          url: 'https://deutschlernerblog.de/deklination-unbestimmter-artikel-online-uebungen-grammatikuebungen/',
        },
        {
          label: 'Lehrerlenz : datif',
          url: 'http://www.lehrerlenz.de/lektion_14_dativ.html',
        },
        {
          label: 'Nominatif, accusatif ou datif',
          url: 'https://www.grammatiktraining.de/dativakkusativ/grammatikuebung-nominativ-dativ-oder-akkusativ-zuordnen.html',
        },
      ],
    },
    {
      title: 'Accord de l’adjectif',
      links: [
        {
          label: 'Lehrerlenz : adjectifs',
          url: 'http://www.lehrerlenz.de/lektion_18_adjektivdeklination.html',
        },
        {
          label: 'Mein Deutschbuch',
          url: 'https://mein-deutschbuch.de/grammatikuebungen-adjektivdeklination-1.html',
        },
        {
          label: 'Deutschlernerblog',
          url: 'https://deutschlernerblog.de/uebungen-zur-adjektivdeklination-deutsch-a1-a2/',
        },
        {
          label: 'Schubert Verlag',
          url: 'https://www.schubert-verlag.de/aufgaben/xg/xg05_15.htm',
        },
        {
          label: 'Lingolia',
          url: 'https://deutsch.lingolia.com/de/grammatik/adjektive/deklination/uebungen',
        },
        {
          label: 'Grammatiktraining',
          url: 'https://www.grammatiktraining.de/adjektive/grammatikuebung-adjektivkonstruktionen-ergaenzen.html',
        },
      ],
    },
  ],
  'tableaux-de-declinaisons': [],
  'les-prepositions': [
    {
      title: 'Datif après les prépositions de lieu',
      links: [
        {
          label: 'Lehrerlenz : Wechselpräpositionen',
          url: 'http://www.lehrerlenz.de/lektion_16_wechselprpositionen.html',
        },
        {
          label: 'Schubert : Zuhause',
          url: 'https://www.schubert-verlag.de/aufgaben/uebungen_a1/a1_kap7_zuhause.htm',
        },
      ],
    },
    {
      title: 'Position ou mouvement',
      links: [

        {
          label: 'Mein Deutschbuch',
          url: 'https://mein-deutschbuch.de/grammatikuebungen-wechselpraepositionen.html',
        },

        {
          label: 'Schubert XG 03',
          url: 'https://www.schubert-verlag.de/aufgaben/xg/xg03_08.htm',
        },
        {
          label: 'Deutsch Perfekt',
          url: 'https://www.deutsch-perfekt.com/deutsch-ueben/die-praepositionen-testen-sie-sich',
        },
      ],
    },
  ],
  'le-genitif': [
    {
      title: 'Exercices externes sur le génitif',
      links: [
        {
          label: 'Lingolia',
          url: 'https://deutsch.lingolia.com/de/grammatik/deklination/genitiv/uebungen',
        },

        {
          label: 'Mein Deutschbuch',
          url: 'https://mein-deutschbuch.de/grammatikuebungen-genitiv.html',
        },

        {
          label: 'Allemand facile 1',
          url: 'https://www.allemandfacile.com/exercices/exercice-allemand-2/exercice-allemand-114828.php',
        },
        {
          label: 'Allemand facile 2',
          url: 'https://www.allemandfacile.com/exercices/exercice-allemand-2/exercice-allemand-87001.php',
        },
      ],
    },
  ],
} satisfies Record<GrammarTheoryPageSlug, ExternalLinkGroup[]>;
