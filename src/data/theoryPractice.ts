import { advicePracticePages } from './advicePractice';
export type TheoryLabOption = {
  label: string;
  sentenceHtml: string;
  note: string;
};

export type TheoryChoiceItem = {
  prompt: string;
  sentence: string;
  choices: string[];
  answer: string;
  hint: string;
  feedback: string;
};

export type TheoryGap = {
  answer: string;
  aliases?: string[];
};

export type TheoryGapItem = {
  prompt: string;
  parts: string[];
  gaps: TheoryGap[];
  hint: string;
};

export type TheorySortCategory = {
  key: string;
  label: string;
};

export type TheorySortItem = {
  label: string;
  sentence: string;
  answer: string;
  feedback: string;
};

export type TheoryOrderItem = {
  prompt: string;
  tokens: string[];
  answer: string;
  hint: string;
};

export type TheoryCard = {
  front: string;
  back: string;
};

export type TheoryPracticePage = {
  title: string;
  intro: string;
  level: '9H' | '10H' | '11H' | 'Révision';
  lab?: {
    title: string;
    intro: string;
    options: TheoryLabOption[];
  };
  choices?: {
    title: string;
    intro: string;
    items: TheoryChoiceItem[];
  };
  gaps?: {
    title: string;
    intro: string;
    items: TheoryGapItem[];
  };
  sort?: {
    title: string;
    intro: string;
    categories: TheorySortCategory[];
    items: TheorySortItem[];
  };
  order?: {
    title: string;
    intro: string;
    items: TheoryOrderItem[];
  };
  cards?: {
    title: string;
    intro: string;
    items: TheoryCard[];
  };
};

export const theoryPracticePages: Record<string, TheoryPracticePage> = {
  ...advicePracticePages,
  'grammaire/les-cas-theorie-de-base': {
    title: 'Manipuler les cas',
    intro: 'Repère le rôle du groupe avant de chercher la terminaison.',
    level: '9H',
    lab: {
      title: 'Observe le rôle qui change',
      intro: 'La couleur montre le rôle du groupe dans la phrase.',
      options: [
        {
          label: 'Sujet',
          sentenceHtml: '<span class="case-chip case-chip-nominative">Der Schüler</span> fragt die Lehrerin.',
          note: 'Le groupe qui fait l’action est au nominatif.',
        },
        {
          label: 'CVD',
          sentenceHtml: 'Ich sehe <span class="case-chip case-chip-accusative">den Schüler</span> auf dem Pausenplatz.',
          note: 'Avec sehen, le groupe vu est le complément direct : accusatif.',
        },
        {
          label: 'CVI',
          sentenceHtml: 'Die Lehrerin hilft <span class="case-chip case-chip-dative">dem Schüler</span>.',
          note: 'Avec helfen, la personne aidée est au datif.',
        },
      ],
    },
    sort: {
      title: 'Trie les groupes',
      intro: 'Choisis le rôle du groupe marqué.',
      categories: [
        { key: 'sujet', label: 'Sujet' },
        { key: 'cvd', label: 'CVD' },
        { key: 'cdi', label: 'CVI' },
        { key: 'prep', label: 'Groupe prép.' },
      ],
      items: [
        {
          label: 'das Mädchen',
          sentence: 'Heute schickt das Mädchen einen Brief.',
          answer: 'sujet',
          feedback: 'das Mädchen fait l’action : nominatif.',
        },
        {
          label: 'einen Brief',
          sentence: 'Heute schickt das Mädchen einen Brief.',
          answer: 'cvd',
          feedback: 'Elle envoie quoi ? einen Brief : accusatif.',
        },
        {
          label: 'seiner Freundin',
          sentence: 'Er schenkt seiner Freundin ein Buch.',
          answer: 'cdi',
          feedback: 'Il offre à qui ? seiner Freundin : datif.',
        },
      ],
    },
  },
  'grammaire/tableaux-de-declinaisons': {
    title: 'Lire les tableaux',
    intro: 'Avance toujours dans le même ordre : genre, cas, forme.',
    level: 'Révision',
    cards: {
      title: 'Cartes réflexes',
      intro: 'Retourne la carte pour vérifier le réflexe.',
      items: [
        { front: 'masculin + accusatif + der', back: 'den : Ich sehe den Lehrer.' },
        { front: 'neutre + datif + das', back: 'dem : Ich helfe dem Kind.' },
        { front: 'féminin + datif + die', back: 'der : mit der Freundin.' },
        { front: 'pluriel + datif + die', back: 'den + -n si possible : mit den Freunden.' },
      ],
    },
    choices: {
      title: 'Choisis la forme',
      intro: 'Utilise mentalement le tableau avant de cliquer.',
      items: [
        {
          prompt: 'Masculin accusatif',
          sentence: 'Ich kaufe ___ Schal.',
          choices: ['der', 'den', 'dem'],
          answer: 'den',
          hint: 'Schal est masculin et acheté : CVD.',
          feedback: 'Masculin accusatif avec der donne den.',
        },
        {
          prompt: 'Féminin datif',
          sentence: 'Ich spreche mit ___ Lehrerin.',
          choices: ['die', 'der', 'den'],
          answer: 'der',
          hint: 'mit impose le datif.',
          feedback: 'Féminin datif avec die donne der.',
        },
        {
          prompt: 'Neutre nominatif',
          sentence: '___ Kind spielt im Garten.',
          choices: ['das', 'dem', 'den'],
          answer: 'das',
          hint: 'Le groupe est sujet.',
          feedback: 'Neutre nominatif : das Kind.',
        },
      ],
    },
  },
  'grammaire/les-prepositions': {
    title: 'Préposition + cas',
    intro: 'Commence par la préposition, puis demande-toi : wo ou wohin ?',
    level: '9H',
    lab: {
      title: 'Wo ou wohin ?',
      intro: 'Choisis la situation et observe le cas.',
      options: [
        {
          label: 'Wo ? · lieu',
          sentenceHtml: 'Das Buch liegt <span class="case-chip case-chip-dative">auf dem Tisch</span>.',
          note: 'On décrit où se trouve le livre : datif.',
        },
        {
          label: 'Wo ? · action dans un lieu',
          sentenceHtml: 'Die Kinder laufen <span class="case-chip case-chip-dative">im Park</span>.',
          note: 'Les enfants bougent, mais le parc reste le lieu de l’action : datif.',
        },
        {
          label: 'Wohin ? · but',
          sentenceHtml: 'Ich lege das Buch <span class="case-chip case-chip-accusative">auf den Tisch</span>.',
          note: 'Le livre est posé vers un nouveau but : accusatif.',
        },
      ],
    },
    sort: {
      title: 'Classe les prépositions',
      intro: 'Choisis le cas demandé par la préposition.',
      categories: [
        { key: 'accusatif', label: 'Accusatif' },
        { key: 'datif', label: 'Datif' },
        { key: 'mixte', label: 'Mixte' },
      ],
      items: [
        { label: 'für', sentence: 'Das Geschenk ist für meinen Bruder.', answer: 'accusatif', feedback: 'für impose l’accusatif.' },
        { label: 'mit', sentence: 'Ich gehe mit meiner Freundin.', answer: 'datif', feedback: 'mit impose le datif.' },
        { label: 'in', sentence: 'Ich gehe ins Kino / Ich bin im Kino.', answer: 'mixte', feedback: 'in dépend de wo ou wohin.' },
      ],
    },
  },
  'grammaire/le-genitif': {
    title: 'Construire le génitif',
    intro: 'Le génitif marque souvent le possesseur.',
    level: '11H',
    lab: {
      title: 'Qui possède ?',
      intro: 'Repère le possesseur dans la phrase.',
      options: [
        {
          label: 'Masculin',
          sentenceHtml: 'Die Tasche <span class="case-chip case-chip-genitive">des Lehrers</span> ist hier.',
          note: 'Le professeur possède le sac : des Lehrers.',
        },
        {
          label: 'Féminin',
          sentenceHtml: 'Das Fahrrad <span class="case-chip case-chip-genitive">der Schülerin</span> ist blau.',
          note: 'Au féminin génitif, le déterminant devient der.',
        },
        {
          label: 'Alternative orale',
          sentenceHtml: 'Das Fahrrad <span class="case-chip case-chip-dative">von der Schülerin</span> ist blau.',
          note: 'À l’oral, von + datif remplace souvent le génitif.',
        },
      ],
    },
    gaps: {
      title: 'Complète le possesseur',
      intro: 'Écris la forme du déterminant au génitif.',
      items: [
        { prompt: 'Le sac du garçon est noir.', parts: ['Die Tasche ', ' Jungen ist schwarz.'], gaps: [{ answer: 'des' }], hint: 'Junge est masculin.' },
        { prompt: 'La chambre de l’enfant est claire.', parts: ['Das Zimmer ', ' Kindes ist hell.'], gaps: [{ answer: 'des' }], hint: 'Kind est neutre.' },
        { prompt: 'La veste de la prof est rouge.', parts: ['Die Jacke ', ' Lehrerin ist rot.'], gaps: [{ answer: 'der' }], hint: 'Lehrerin est féminin.' },
      ],
    },
  },
  'grammaire/les-pronoms-personnels': {
    title: 'Remplacer par un pronom',
    intro: 'Le pronom dépend de la personne et du cas.',
    level: '9H',
    cards: {
      title: 'Cartes pronoms',
      intro: 'Entraîne les formes qui se ressemblent.',
      items: [
        { front: 'ich à l’accusatif', back: 'mich : Sie sieht mich.' },
        { front: 'ich au datif', back: 'mir : Er hilft mir.' },
        { front: 'er à l’accusatif', back: 'ihn : Ich kenne ihn.' },
        { front: 'er au datif', back: 'ihm : Ich antworte ihm.' },
      ],
    },
    gaps: {
      title: 'Choisis le pronom',
      intro: 'Écris le pronom qui remplace le groupe.',
      items: [
        { prompt: 'Remplace den Lehrer.', parts: ['Ich sehe ', '.'], gaps: [{ answer: 'ihn' }], hint: 'den Lehrer est masculin accusatif.' },
        { prompt: 'Remplace meiner Freundin.', parts: ['Ich helfe ', '.'], gaps: [{ answer: 'ihr' }], hint: 'meiner Freundin est féminin datif.' },
        { prompt: 'Remplace Anna und Paul.', parts: ['Wir treffen ', ' im Park.'], gaps: [{ answer: 'sie' }], hint: 'Deux personnes en CVD : sie.' },
      ],
    },
  },
  'grammaire/les-pronoms-possessifs': {
    title: 'Déterminants possessifs',
    intro: 'Choisis d’abord le possesseur, puis accorde le déterminant avec le nom.',
    level: '9H',
    lab: {
      title: 'Possesseur ou objet possédé ?',
      intro: 'Le possesseur donne la racine, le nom possédé donne la terminaison.',
      options: [
        {
          label: 'Je + masculin',
          sentenceHtml: '<span class="case-chip case-chip-determiner">mein</span> Bruder ist nett.',
          note: 'Je possède : mein. Bruder est masculin nominatif : pas de -e.',
        },
        {
          label: 'Tu + féminin',
          sentenceHtml: '<span class="case-chip case-chip-determiner">deine</span> Schwester ist sportlich.',
          note: 'Tu possèdes : dein. Schwester est féminin nominatif : -e.',
        },
        {
          label: 'Elle + pluriel',
          sentenceHtml: '<span class="case-chip case-chip-determiner">ihre</span> Freunde kommen.',
          note: 'Elle possède : ihr. Freunde est pluriel nominatif : -e.',
        },
      ],
    },
    choices: {
      title: 'Racine + terminaison',
      intro: 'Clique sur la forme complète.',
      items: [
        { prompt: 'Je parle de mon frère.', sentence: '___ Bruder wohnt in Bern.', choices: ['mein', 'meine', 'meinen'], answer: 'mein', hint: 'Bruder masculin sujet.', feedback: 'Masculin nominatif : mein Bruder.' },
        { prompt: 'Tu parles de ta mère.', sentence: '___ Mutter ist Ärztin.', choices: ['dein', 'deine', 'deinen'], answer: 'deine', hint: 'Mutter féminin sujet.', feedback: 'Féminin nominatif : deine Mutter.' },
        { prompt: 'Nous voyons notre prof.', sentence: 'Wir sehen ___ Lehrer.', choices: ['unser', 'unseren', 'unserem'], answer: 'unseren', hint: 'Lehrer masculin CVD.', feedback: 'Masculin accusatif : unseren Lehrer.' },
      ],
    },
  },
  'grammaire/les-adjectifs': {
    title: 'Accorder les adjectifs',
    intro: 'L’adjectif se place entre le déterminant et le nom.',
    level: '10H',
    lab: {
      title: 'Observe la terminaison',
      intro: 'Le déterminant donne déjà une partie de l’information.',
      options: [
        {
          label: 'Avec der',
          sentenceHtml: '<span class="case-chip case-chip-determiner">der</span> <span class="case-chip case-chip-adjective">rote</span> Schal',
          note: 'Après der, l’adjectif prend souvent -e au nominatif.',
        },
        {
          label: 'Avec ein',
          sentenceHtml: '<span class="case-chip case-chip-determiner">ein</span> <span class="case-chip case-chip-adjective">roter</span> Schal',
          note: 'Avec ein, l’adjectif doit porter l’information masculine : -er.',
        },
        {
          label: 'Au datif',
          sentenceHtml: 'mit <span class="case-chip case-chip-determiner">dem</span> <span class="case-chip case-chip-adjective">roten</span> Schal',
          note: 'Au datif après dem, l’adjectif prend -en.',
        },
      ],
    },
    gaps: {
      title: 'Complète la terminaison',
      intro: 'Écris seulement l’adjectif complet.',
      items: [
        { prompt: 'Le pull rouge est cher.', parts: ['Der ', ' Pullover ist teuer.'], gaps: [{ answer: 'rote' }], hint: 'Masculin nominatif après der.' },
        { prompt: 'J’achète un pull rouge.', parts: ['Ich kaufe einen ', ' Pullover.'], gaps: [{ answer: 'roten' }], hint: 'Masculin accusatif après einen.' },
        { prompt: 'Elle parle avec la nouvelle élève.', parts: ['Sie spricht mit der ', ' Schülerin.'], gaps: [{ answer: 'neuen' }], hint: 'Datif après mit.' },
      ],
    },
  },
  'grammaire/le-comparatif': {
    title: 'Comparer deux éléments',
    intro: 'Distingue la différence avec als et l’égalité avec wie.',
    level: '10H',
    choices: {
      title: 'Als ou wie ?',
      intro: 'Choisis le bon signal de comparaison.',
      items: [
        { prompt: 'Différence', sentence: 'Lina ist schneller ___ Tom.', choices: ['als', 'wie', 'am'], answer: 'als', hint: 'Il y a une différence avec -er.', feedback: 'Comparatif de différence : schneller als.' },
        { prompt: 'Égalité', sentence: 'Das Fahrrad ist genauso teuer ___ der Helm.', choices: ['als', 'wie', 'am'], answer: 'wie', hint: 'genauso annonce une égalité.', feedback: 'Égalité : genauso ... wie.' },
        { prompt: 'Préférence', sentence: 'Ich spiele lieber Fussball ___ Tennis.', choices: ['als', 'wie', 'am'], answer: 'als', hint: 'lieber exprime une préférence.', feedback: 'Préférence : lieber ... als.' },
      ],
    },
  },
  'grammaire/le-superlatif': {
    title: 'Choisir le superlatif',
    intro: 'Décide si le superlatif accompagne un nom ou non.',
    level: '10H',
    choices: {
      title: 'Am ou déterminant ?',
      intro: 'Clique sur la bonne construction.',
      items: [
        { prompt: 'Sans nom après l’adjectif', sentence: 'Lea läuft ___.', choices: ['am schnellsten', 'die schnellste', 'schneller als'], answer: 'am schnellsten', hint: 'Aucun nom ne suit.', feedback: 'Sans nom : am schnellsten.' },
        { prompt: 'Avec un nom', sentence: 'Das ist ___ Sportlerin.', choices: ['am besten', 'die beste', 'besser als'], answer: 'die beste', hint: 'Sportlerin est un nom féminin.', feedback: 'Avec un nom : die beste Sportlerin.' },
        { prompt: 'Forme irrégulière', sentence: 'Mathe gefällt mir ___.', choices: ['am gutsten', 'am besten', 'die beste'], answer: 'am besten', hint: 'gut est irrégulier.', feedback: 'gut -> am besten.' },
      ],
    },
  },
  'syntaxe/la-place-du-verbe-principal': {
    title: 'Verbe en deuxième position',
    intro: 'Le verbe principal reste le deuxième groupe de la phrase affirmative.',
    level: '9H',
    order: {
      title: 'Remets la phrase en ordre',
      intro: 'Clique les groupes dans l’ordre correct.',
      items: [
        { prompt: 'Aujourd’hui, Anna apprend l’allemand.', tokens: ['Anna', 'Deutsch', 'lernt', 'heute'], answer: 'Heute lernt Anna Deutsch', hint: 'Si Heute est en premier, le verbe vient juste après.' },
        { prompt: 'Après l’école, nous jouons au foot.', tokens: ['wir', 'Fussball', 'spielen', 'nach der Schule'], answer: 'Nach der Schule spielen wir Fussball', hint: 'Le complément de temps occupe la première position.' },
      ],
    },
  },
  'syntaxe/les-questions': {
    title: 'Construire des questions',
    intro: 'Distingue les questions oui/non et les questions avec mot interrogatif.',
    level: '9H',
    sort: {
      title: 'Quel type de question ?',
      intro: 'Classe chaque question.',
      categories: [
        { key: 'w', label: 'Question en W' },
        { key: 'ja-nein', label: 'Oui / non' },
      ],
      items: [
        { label: 'Wo wohnst du', sentence: 'Wo wohnst du?', answer: 'w', feedback: 'Wo est le mot interrogatif.' },
        { label: 'Spielst du Tennis', sentence: 'Spielst du Tennis?', answer: 'ja-nein', feedback: 'Le verbe commence la question : réponse oui/non.' },
        { label: 'Was ist dein Lieblingsfach', sentence: 'Was ist dein Lieblingsfach?', answer: 'w', feedback: 'Was introduit une question précise.' },
      ],
    },
    order: {
      title: 'Mets les mots dans l’ordre',
      intro: 'Forme une question correcte.',
      items: [
        { prompt: 'Où habites-tu ?', tokens: ['du', 'wo', 'wohnst'], answer: 'Wo wohnst du', hint: 'Mot en W, verbe, sujet.' },
        { prompt: 'Viens-tu demain ?', tokens: ['morgen', 'kommst', 'du'], answer: 'Kommst du morgen', hint: 'Question oui/non : verbe en premier.' },
      ],
    },
  },
  'syntaxe/les-phrases-avec-verbe-de-modalite': {
    title: 'Modalverbe + infinitif',
    intro: 'Le verbe modal est conjugué; l’infinitif va à la fin.',
    level: '9H',
    lab: {
      title: 'Observe les deux verbes',
      intro: 'Le verbe rouge est conjugué.',
      options: [
        {
          label: 'Pouvoir',
          sentenceHtml: 'Ich <span class="mark-verb">kann</span> heute Fussball <span class="mark-verbal-tail">spielen</span>.',
          note: 'kann est conjugué; spielen reste à la fin.',
        },
        {
          label: 'Devoir',
          sentenceHtml: 'Du <span class="mark-verb">musst</span> dein Zimmer <span class="mark-verbal-tail">aufräumen</span>.',
          note: 'musst est en deuxième position; aufräumen reste à la fin.',
        },
      ],
    },
    gaps: {
      title: 'Complète le verbe modal',
      intro: 'Écris la forme conjuguée.',
      items: [
        { prompt: 'Je peux nager.', parts: ['Ich ', ' schwimmen.'], gaps: [{ answer: 'kann' }], hint: 'können avec ich.' },
        { prompt: 'Nous devons partir.', parts: ['Wir ', ' gehen.'], gaps: [{ answer: 'müssen', aliases: ['muessen'] }], hint: 'müssen avec wir.' },
        { prompt: 'Vous ne pouvez pas courir ici.', parts: ['Ihr ', ' hier nicht rennen.'], gaps: [{ answer: 'dürft', aliases: ['duerft'] }], hint: 'dürfen avec ihr.' },
      ],
    },
  },
  'syntaxe/les-phrases-au-passe-compose': {
    title: 'Phrase au passé composé',
    intro: 'L’auxiliaire est en deuxième position; le participe passé va à la fin.',
    level: '9H',
    lab: {
      title: 'Auxiliaire et participe',
      intro: 'Compare une phrase régulière et une phrase de déplacement.',
      options: [
        {
          label: 'Avec haben',
          sentenceHtml: 'Wir <span class="mark-verb">haben</span> das Museum <span class="mark-verbal-tail">besucht</span>.',
          note: 'besuchen forme le parfait avec haben.',
        },
        {
          label: 'Avec sein',
          sentenceHtml: 'Ich <span class="mark-verb">bin</span> nach Basel <span class="mark-verbal-tail">gefahren</span>.',
          note: 'fahren indique un déplacement : souvent sein.',
        },
      ],
    },
    choices: {
      title: 'Haben ou sein ?',
      intro: 'Choisis l’auxiliaire.',
      items: [
        { prompt: 'Visiter', sentence: 'Wir ___ den Zoo besucht.', choices: ['haben', 'sind'], answer: 'haben', hint: 'besuchen ne marque pas un déplacement du sujet.', feedback: 'besuchen se construit ici avec haben.' },
        { prompt: 'Aller', sentence: 'Ich ___ nach Hause gegangen.', choices: ['habe', 'bin'], answer: 'bin', hint: 'gehen marque un déplacement.', feedback: 'gehen forme le parfait avec sein.' },
        { prompt: 'Manger', sentence: 'Sie ___ Pommes gegessen.', choices: ['hat', 'ist'], answer: 'hat', hint: 'essen ne marque pas un déplacement.', feedback: 'essen se construit avec haben.' },
      ],
    },
  },
  'syntaxe/und-oder-aber-denn-also': {
    title: 'Connecteurs sans verbe final',
    intro: 'Ces connecteurs relient deux phrases sans envoyer le verbe à la fin.',
    level: '9H',
    choices: {
      title: 'Choisis le connecteur',
      intro: 'Observe le sens logique.',
      items: [
        { prompt: 'Opposition', sentence: 'Ich mag Mathe, ___ Deutsch ist auch interessant.', choices: ['aber', 'oder', 'denn'], answer: 'aber', hint: 'On nuance ou oppose deux idées.', feedback: 'aber signifie mais.' },
        { prompt: 'Cause', sentence: 'Ich bleibe zu Hause, ___ ich bin krank.', choices: ['denn', 'also', 'oder'], answer: 'denn', hint: 'La deuxième phrase donne la raison.', feedback: 'denn signifie car.' },
        { prompt: 'Conséquence', sentence: 'Ich bin krank, ___ bleibe ich zu Hause.', choices: ['also', 'aber', 'oder'], answer: 'also', hint: 'La deuxième phrase est la conséquence.', feedback: 'also signifie donc.' },
      ],
    },
  },
  'syntaxe/trotzdem-deshalb': {
    title: 'Connecteurs avec inversion',
    intro: 'Après trotzdem, deshalb ou also, le verbe arrive juste après le connecteur.',
    level: '10H',
    order: {
      title: 'Place le connecteur',
      intro: 'Construis la deuxième phrase.',
      items: [
        { prompt: 'Il pleut, pourtant nous jouons dehors.', tokens: ['spielen', 'wir', 'trotzdem', 'draussen'], answer: 'Trotzdem spielen wir draussen', hint: 'Après trotzdem, le verbe vient tout de suite.' },
        { prompt: 'Je suis fatigué, c’est pourquoi je dors.', tokens: ['deshalb', 'schlafe', 'ich'], answer: 'Deshalb schlafe ich', hint: 'deshalb prend la première position.' },
      ],
    },
  },
  'syntaxe/weil': {
    title: 'Subordonnée avec weil',
    intro: 'weil donne une raison et envoie le verbe conjugué à la fin.',
    level: '10H',
    lab: {
      title: 'Le verbe part à la fin',
      intro: 'Observe la différence entre denn et weil.',
      options: [
        {
          label: 'Avec denn',
          sentenceHtml: 'Ich bleibe zu Hause, denn ich <span class="mark-verb">bin</span> krank.',
          note: 'Avec denn, le verbe reste à sa place normale.',
        },
        {
          label: 'Avec weil',
          sentenceHtml: 'Ich bleibe zu Hause, weil ich krank <span class="mark-verb">bin</span>.',
          note: 'Avec weil, le verbe conjugué va à la fin.',
        },
      ],
    },
    gaps: {
      title: 'Complète la fin',
      intro: 'Écris le verbe à la fin de la subordonnée.',
      items: [
        { prompt: 'Je reste à la maison parce que je suis malade.', parts: ['Ich bleibe zu Hause, weil ich krank ', '.'], gaps: [{ answer: 'bin' }], hint: 'sein avec ich.' },
        { prompt: 'Elle aime le sport parce qu’elle joue au foot.', parts: ['Sie mag Sport, weil sie Fussball ', '.'], gaps: [{ answer: 'spielt' }], hint: 'spielen avec sie.' },
      ],
    },
  },
  'syntaxe/wenn': {
    title: 'Subordonnée avec wenn',
    intro: 'wenn sert à dire quand ou si; le verbe conjugué va à la fin.',
    level: '10H',
    choices: {
      title: 'Quand ou si ?',
      intro: 'Le sens dépend du contexte.',
      items: [
        { prompt: 'Condition', sentence: 'Wenn ich Zeit habe, komme ich mit.', choices: ['si', 'parce que', 'pour que'], answer: 'si', hint: 'La venue dépend du temps disponible.', feedback: 'Ici wenn signifie si.' },
        { prompt: 'Habitude', sentence: 'Wenn ich müde bin, höre ich Musik.', choices: ['quand', 'bien que', 'car'], answer: 'quand', hint: 'C’est une situation répétée.', feedback: 'Ici wenn signifie quand.' },
      ],
    },
    order: {
      title: 'Construis avec wenn',
      intro: 'La subordonnée commence par wenn.',
      items: [
        { prompt: 'Quand je suis triste, je parle avec mon amie.', tokens: ['wenn', 'traurig', 'ich', 'bin'], answer: 'Wenn ich traurig bin', hint: 'Le verbe est à la fin de la subordonnée.' },
      ],
    },
  },
  'syntaxe/dass': {
    title: 'Subordonnée avec dass',
    intro: 'dass introduit une idée rapportée; le verbe conjugué va à la fin.',
    level: '10H',
    lab: {
      title: 'Opinion + dass',
      intro: 'L’idée après dass devient une subordonnée.',
      options: [
        {
          label: 'Opinion',
          sentenceHtml: 'Ich finde, dass die Jacke schön <span class="mark-verb">ist</span>.',
          note: 'Le verbe ist se place à la fin.',
        },
        {
          label: 'Pensée',
          sentenceHtml: 'Ich glaube, dass wir morgen einen Test <span class="mark-verb">haben</span>.',
          note: 'Le verbe conjugué de la subordonnée est haben.',
        },
      ],
    },
    order: {
      title: 'Mets la subordonnée en ordre',
      intro: 'Clique les mots après dass.',
      items: [
        { prompt: 'Je pense que le film est intéressant.', tokens: ['interessant', 'der Film', 'ist'], answer: 'der Film interessant ist', hint: 'Dans la subordonnée, le verbe est à la fin.' },
        { prompt: 'Elle dit que nous venons demain.', tokens: ['morgen', 'wir', 'kommen'], answer: 'wir morgen kommen', hint: 'Le sujet vient après dass.' },
      ],
    },
  },
  'syntaxe/damit-wahrend-bevor-nachdem-als-obwohl': {
    title: 'Subordonnants avancés',
    intro: 'Ces mots donnent le sens; la mécanique reste la même : verbe à la fin.',
    level: '10H',
    sort: {
      title: 'Quel sens ?',
      intro: 'Classe le subordonnant.',
      categories: [
        { key: 'but', label: 'But' },
        { key: 'temps', label: 'Temps' },
        { key: 'opposition', label: 'Opposition' },
      ],
      items: [
        { label: 'damit', sentence: 'Ich spare, damit ich ein Fahrrad kaufen kann.', answer: 'but', feedback: 'damit signifie pour que.' },
        { label: 'bevor', sentence: 'Ich lerne, bevor ich spiele.', answer: 'temps', feedback: 'bevor situe une action avant une autre.' },
        { label: 'obwohl', sentence: 'Ich komme, obwohl ich müde bin.', answer: 'opposition', feedback: 'obwohl signifie bien que.' },
      ],
    },
    gaps: {
      title: 'Verbe final',
      intro: 'Complète le verbe à la fin.',
      items: [
        { prompt: 'Je fais du sport bien que je sois fatigué.', parts: ['Ich mache Sport, obwohl ich müde ', '.'], gaps: [{ answer: 'bin' }], hint: 'sein avec ich.' },
        { prompt: 'Nous économisons pour acheter un vélo.', parts: ['Wir sparen, damit wir ein Fahrrad kaufen ', '.'], gaps: [{ answer: 'können', aliases: ['koennen'] }], hint: 'Le modal conjugué va à la fin.' },
      ],
    },
  },
  'syntaxe/les-infinitives': {
    title: 'Infinitives avec zu',
    intro: 'zu se place juste avant l’infinitif simple, ou entre particule et verbe séparable.',
    level: '11H',
    choices: {
      title: 'Quelle construction ?',
      intro: 'Choisis la structure infinitive correcte.',
      items: [
        { prompt: 'Objectif', sentence: 'Ich lerne Deutsch, ___ in Berlin zu arbeiten.', choices: ['um', 'statt', 'ohne'], answer: 'um', hint: 'On indique un but.', feedback: 'But : um ... zu.' },
        { prompt: 'Remplacement', sentence: '___ zu spielen, mache ich Hausaufgaben.', choices: ['Um', 'Statt', 'Ohne'], answer: 'Statt', hint: 'On fait une chose à la place d’une autre.', feedback: 'Remplacement : statt ... zu.' },
        { prompt: 'Sans faire', sentence: 'Er geht, ___ zu warten.', choices: ['um', 'statt', 'ohne'], answer: 'ohne', hint: 'L’action n’a pas lieu.', feedback: 'Sans faire : ohne ... zu.' },
      ],
    },
    order: {
      title: 'Place zu',
      intro: 'Reconstruis le groupe infinitif.',
      items: [
        { prompt: 'ranger la chambre (avec zu)', tokens: ['das Zimmer', 'aufzuräumen'], answer: 'das Zimmer aufzuräumen', hint: 'Avec aufräumen, zu entre auf et räumen.' },
      ],
    },
  },
  'syntaxe/les-subordonnees-relatives': {
    title: 'Relatives',
    intro: 'Le pronom relatif reprend un nom et le verbe va à la fin.',
    level: '11H',
    lab: {
      title: 'Le nom repris',
      intro: 'Le pronom relatif garde le genre et le nombre du nom repris.',
      options: [
        {
          label: 'Masculin sujet',
          sentenceHtml: 'Der Junge, <span class="case-chip case-chip-nominative">der</span> Fussball spielt, ist nett.',
          note: 'Junge est masculin; der est sujet de la relative.',
        },
        {
          label: 'Féminin CVD',
          sentenceHtml: 'Die Jacke, <span class="case-chip case-chip-accusative">die</span> ich kaufe, ist rot.',
          note: 'Jacke est féminin; au féminin nominatif et accusatif, la forme est die.',
        },
      ],
    },
    choices: {
      title: 'Choisis le pronom relatif',
      intro: 'Regarde le nom repris et le rôle dans la relative.',
      items: [
        { prompt: 'Masculin sujet', sentence: 'Der Freund, ___ mir hilft, ist hilfsbereit.', choices: ['der', 'den', 'dem'], answer: 'der', hint: 'Freund fait l’action dans la relative.', feedback: 'Masculin nominatif : der.' },
        { prompt: 'Masculin CVD', sentence: 'Der Film, ___ ich sehe, ist spannend.', choices: ['der', 'den', 'dem'], answer: 'den', hint: 'Je vois le film.', feedback: 'Masculin accusatif : den.' },
        { prompt: 'Pluriel sujet', sentence: 'Die Kinder, ___ im Garten spielen, sind laut.', choices: ['die', 'den', 'der'], answer: 'die', hint: 'Les enfants font l’action.', feedback: 'Pluriel nominatif : die.' },
      ],
    },
  },
  'syntaxe/les-questions-indirectes': {
    title: 'Questions indirectes',
    intro: 'On garde le mot interrogatif et on met le verbe conjugué à la fin.',
    level: '10H',
    lab: {
      title: 'Question directe ou indirecte',
      intro: 'Observe la place du verbe.',
      options: [
        {
          label: 'Directe',
          sentenceHtml: 'Wo <span class="mark-verb">wohnst</span> du?',
          note: 'Dans la question directe, le verbe vient juste après le mot interrogatif.',
        },
        {
          label: 'Indirecte',
          sentenceHtml: 'Ich weiss nicht, wo du <span class="mark-verb">wohnst</span>.',
          note: 'Dans la question indirecte, le verbe va à la fin.',
        },
      ],
    },
    order: {
      title: 'Transforme en question indirecte',
      intro: 'Construis seulement la partie après la virgule.',
      items: [
        { prompt: 'Où habites-tu ?', tokens: ['du', 'wo', 'wohnst'], answer: 'wo du wohnst', hint: 'Mot interrogatif, sujet, verbe final.' },
        { prompt: 'Quand vient-il ?', tokens: ['er', 'wann', 'kommt'], answer: 'wann er kommt', hint: 'Le verbe vient à la fin.' },
      ],
    },
  },
  'conjugaison/present': {
    title: 'Présent',
    intro: 'Conjugue le verbe avec son sujet.',
    level: '9H',
    cards: {
      title: 'Terminaisons régulières',
      intro: 'Retourne les six cartes pour retrouver le modèle complet.',
      items: [
        { front: 'ich + spielen', back: 'ich spiele' },
        { front: 'du + lernen', back: 'du lernst' },
        { front: 'er/sie + wohnen', back: 'er/sie wohnt' },
        { front: 'wir + machen', back: 'wir machen' },
        { front: 'ihr + kaufen', back: 'ihr kauft' },
        { front: 'sie/Sie + kommen', back: 'sie/Sie kommen' },
      ],
    },
    choices: {
      title: 'Le radical change-t-il ?',
      intro: 'Observe surtout du et er / sie / es.',
      items: [
        {
          prompt: 'fahren avec du',
          sentence: 'Du ___ mit dem Bus.',
          choices: ['fahrst', 'fährst', 'fahrt'],
          answer: 'fährst',
          hint: 'a devient ä avec du.',
          feedback: 'fahren → du fährst : le radical change.',
        },
        {
          prompt: 'lesen avec er',
          sentence: 'Er ___ ein Buch.',
          choices: ['lest', 'liest', 'lesen'],
          answer: 'liest',
          hint: 'e devient ie avec er.',
          feedback: 'lesen → er liest : le radical change.',
        },
        {
          prompt: 'nehmen avec wir',
          sentence: 'Wir ___ den Zug.',
          choices: ['nehmen', 'nimmt', 'nehmt'],
          answer: 'nehmen',
          hint: 'Avec wir, on garde le radical de l’infinitif.',
          feedback: 'wir nehmen : le changement n’apparaît pas avec wir.',
        },
      ],
    },
    gaps: {
      title: 'Conjugue au présent',
      intro: 'Écris la forme correcte.',
      items: [
        { prompt: 'Anna apprend l’allemand.', parts: ['Anna ', ' Deutsch.'], gaps: [{ answer: 'lernt' }], hint: 'lernen avec Anna = sie.' },
        { prompt: 'Nous jouons au foot.', parts: ['Wir ', ' Fussball.'], gaps: [{ answer: 'spielen' }], hint: 'Avec wir, la forme ressemble à l’infinitif.' },
        { prompt: 'Tu prends le bus.', parts: ['Du ', ' den Bus.'], gaps: [{ answer: 'nimmst' }], hint: 'nehmen est irrégulier.' },
      ],
    },
  },
  'conjugaison/imperatif': {
    title: 'Impératif',
    intro: 'L’impératif sert à donner une consigne.',
    level: '9H',
    sort: {
      title: 'À qui s’adresse la consigne ?',
      intro: 'Classe la forme.',
      categories: [
        { key: 'du', label: 'du' },
        { key: 'ihr', label: 'ihr' },
        { key: 'wir', label: 'wir' },
        { key: 'sie', label: 'Sie' },
      ],
      items: [
        { label: 'Öffne das Buch!', sentence: 'Öffne das Buch!', answer: 'du', feedback: 'La forme sans -st s’adresse à du.' },
        { label: 'Macht die Übung!', sentence: 'Macht die Übung!', answer: 'ihr', feedback: 'La terminaison -t s’adresse à ihr.' },
        { label: 'Gehen wir!', sentence: 'Gehen wir ins Kino!', answer: 'wir', feedback: 'Avec wir, le verbe précède le pronom.' },
        { label: 'Hören Sie zu!', sentence: 'Hören Sie zu!', answer: 'sie', feedback: 'La forme avec Sie est polie.' },
      ],
    },
    gaps: {
      title: 'Écris la consigne',
      intro: 'Complète le verbe à l’impératif.',
      items: [
        { prompt: 'du : écouter', parts: ['', ' gut zu!'], gaps: [{ answer: 'Hör', aliases: ['Hoer'] }], hint: 'Avec du, on retire souvent -st.' },
        { prompt: 'du : prendre', parts: ['', ' den Bus!'], gaps: [{ answer: 'Nimm' }], hint: 'nehmen garde ici son changement e → i.' },
        { prompt: 'du : aller en voiture', parts: ['', ' vorsichtig!'], gaps: [{ answer: 'Fahr' }], hint: 'À l’impératif, fahren perd l’Umlaut de du fährst.' },
        { prompt: 'ihr : venir', parts: ['', ' bitte schnell!'], gaps: [{ answer: 'Kommt' }], hint: 'Avec ihr, garde la forme du présent.' },
      ],
    },
  },
  'conjugaison/passe-compose': {
    title: 'Passé composé',
    intro: 'Choisis l’auxiliaire et place le participe passé à la fin.',
    level: '9H',
    choices: {
      title: 'Auxiliaire',
      intro: 'Haben ou sein ?',
      items: [
        { prompt: 'Activité', sentence: 'Wir ___ im Park gespielt.', choices: ['haben', 'sind'], answer: 'haben', hint: 'spielen ne marque pas un déplacement.', feedback: 'spielen : haben.' },
        { prompt: 'Déplacement sans CVD', sentence: 'Sie ___ nach Zürich gefahren.', choices: ['hat', 'ist'], answer: 'ist', hint: 'Ici, fahren indique un changement de lieu et n’a pas de CVD.', feedback: 'Sie ist nach Zürich gefahren.' },
        { prompt: 'État', sentence: 'Ich ___ krank gewesen.', choices: ['habe', 'bin'], answer: 'bin', hint: 'sein au parfait prend sein.', feedback: 'gewesen se construit avec sein.' },
      ],
    },
    gaps: {
      title: 'Complète le participe',
      intro: 'Écris la forme finale.',
      items: [
        { prompt: 'Nous avons visité le musée.', parts: ['Wir haben das Museum ', '.'], gaps: [{ answer: 'besucht' }], hint: 'Le préfixe inséparable be- bloque ge- : besucht.' },
        { prompt: 'Je suis allé à l’école.', parts: ['Ich bin in die Schule ', '.'], gaps: [{ answer: 'gegangen' }], hint: 'gehen -> gegangen.' },
        { prompt: 'Il a apporté son livre.', parts: ['Er hat sein Buch ', '.'], gaps: [{ answer: 'gebracht' }], hint: 'bringen est un verbe mixte : gebracht.' },
        { prompt: 'Elle a étudié à Berne.', parts: ['Sie hat in Bern ', '.'], gaps: [{ answer: 'studiert' }], hint: 'Les verbes en -ieren ne prennent pas ge-.' },
      ],
    },
  },
  'conjugaison/preterit': {
    title: 'Prétérit',
    intro: 'Au secondaire, les formes les plus utiles sont souvent war, hatte et les modaux.',
    level: '9H',
    cards: {
      title: 'Formes fréquentes',
      intro: 'Retourne les cartes avant l’exercice.',
      items: [
        { front: 'ich + sein', back: 'ich war' },
        { front: 'wir + sein', back: 'wir waren' },
        { front: 'er + haben', back: 'er hatte' },
        { front: 'sie (singulier) + können', back: 'sie konnte' },
      ],
    },
    gaps: {
      title: 'Complète au prétérit',
      intro: 'Écris la forme correcte.',
      items: [
        { prompt: 'Hier, j’étais malade.', parts: ['Gestern ', ' ich krank.'], gaps: [{ answer: 'war' }], hint: 'sein avec ich.' },
        { prompt: 'Nous avions du temps.', parts: ['Wir ', ' Zeit.'], gaps: [{ answer: 'hatten' }], hint: 'haben avec wir.' },
        { prompt: 'Il pouvait venir.', parts: ['Er ', ' kommen.'], gaps: [{ answer: 'konnte' }], hint: 'können au prétérit avec er.' },
        { prompt: 'Elle fit ses devoirs.', parts: ['Sie ', ' ihre Hausaufgaben.'], gaps: [{ answer: 'machte' }], hint: 'machen est faible : radical + -te.' },
        { prompt: 'Nous allâmes au cinéma.', parts: ['Wir ', ' ins Kino.'], gaps: [{ answer: 'gingen' }], hint: 'gehen est fort : ging-.' },
      ],
    },
  },
  'conjugaison/futur': {
    title: 'Futur I',
    intro: 'werden est conjugué; l’infinitif va à la fin.',
    level: '11H',
    lab: {
      title: 'Présent ou Futur I ?',
      intro: 'Les deux formes peuvent parler de l’avenir.',
      options: [
        {
          label: 'Présent + date',
          sentenceHtml: 'Morgen <span class="mark-verb">reise</span> ich nach Berlin.',
          note: 'Morgen suffit à situer l’action : le présent est naturel.',
        },
        {
          label: 'Futur I',
          sentenceHtml: 'Ich <span class="mark-verb">werde</span> nach der Schule <span class="mark-verbal-tail">reisen</span>.',
          note: 'werden est conjugué ; reisen reste à l’infinitif final.',
        },
        {
          label: 'Prédiction',
          sentenceHtml: 'Es <span class="mark-verb">wird</span> morgen <span class="mark-verbal-tail">regnen</span>.',
          note: 'Le Futur I convient bien à une prévision.',
        },
      ],
    },
    gaps: {
      title: 'Complète le futur',
      intro: 'Écris werden ou l’infinitif final.',
      items: [
        { prompt: 'Je voyagerai en Allemagne.', parts: ['Ich ', ' nach Deutschland ', '.'], gaps: [{ answer: 'werde' }, { answer: 'reisen' }], hint: 'werden avec ich, infinitif à la fin.' },
        { prompt: 'Ils apprendront beaucoup.', parts: ['Sie ', ' viel ', '.'], gaps: [{ answer: 'werden' }, { answer: 'lernen' }], hint: 'werden avec sie pluriel.' },
        { prompt: 'Il pleuvra demain.', parts: ['Es ', ' morgen ', '.'], gaps: [{ answer: 'wird' }, { answer: 'regnen' }], hint: 'werden avec es, puis l’infinitif final.' },
      ],
    },
  },
  'conjugaison/verbes-de-modalite': {
    title: 'Verbes de modalité',
    intro: 'Les modaux changent le sens et la place de l’infinitif.',
    level: '9H',
    cards: {
      title: 'Sens des modaux',
      intro: 'Retourne la carte pour vérifier.',
      items: [
        { front: 'können', back: 'pouvoir / savoir faire' },
        { front: 'müssen', back: 'devoir / être obligé' },
        { front: 'dürfen', back: 'avoir le droit de' },
        { front: 'wollen', back: 'vouloir' },
        { front: 'sollen', back: 'devoir selon une consigne ou quelqu’un' },
        { front: 'mögen', back: 'aimer / apprécier' },
      ],
    },
    gaps: {
      title: 'Complète le modal',
      intro: 'Écris la forme conjuguée.',
      items: [
        { prompt: 'Je veux devenir médecin.', parts: ['Ich ', ' Ärztin werden.'], gaps: [{ answer: 'will' }], hint: 'wollen avec ich.' },
        { prompt: 'Vous devez écouter.', parts: ['Ihr ', ' zuhören.'], gaps: [{ answer: 'müsst', aliases: ['muesst'] }], hint: 'müssen avec ihr.' },
        { prompt: 'Peux-tu m’aider ?', parts: ['', ' du mir helfen?'], gaps: [{ answer: 'Kannst' }], hint: 'können avec du dans une question.' },
        { prompt: 'Dois-je appeler maman ?', parts: ['', ' ich Mama anrufen?'], gaps: [{ answer: 'Soll' }], hint: 'sollen sert à demander ce qui est attendu.' },
        { prompt: 'J’aimerais un thé.', parts: ['Ich ', ' einen Tee.'], gaps: [{ answer: 'möchte', aliases: ['moechte'] }], hint: 'möchte est la forme polie au Konjunktiv II de mögen.' },
      ],
    },
  },
  'conjugaison/les-verbes-reflexifs': {
    title: 'Verbes réflexifs',
    intro: 'Le pronom réfléchi renvoie au sujet.',
    level: '10H',
    lab: {
      title: 'Accusatif ou datif ?',
      intro: 'Observe le rôle du pronom, pas seulement le sujet.',
      options: [
        {
          label: 'Accusatif',
          sentenceHtml: 'Ich wasche <span class="case-chip case-chip-accusative">mich</span>.',
          note: 'Sans autre complément direct, le pronom réfléchi est généralement à l’accusatif.',
        },
        {
          label: 'Datif + CVD',
          sentenceHtml: 'Ich wasche <span class="case-chip case-chip-dative">mir</span> die Hände.',
          note: 'die Hände est déjà le CVD : le pronom réfléchi passe au datif.',
        },
        {
          label: 'Verbe + cas',
          sentenceHtml: 'Du interessierst <span class="case-chip case-chip-accusative">dich</span> für Musik.',
          note: 'Apprends le verbe avec sa construction : sich interessieren für + accusatif.',
        },
      ],
    },
    choices: {
      title: 'Choisis le pronom et son cas',
      intro: 'Regarde le sujet, puis cherche un autre complément direct.',
      items: [
        { prompt: 'ich', sentence: 'Ich freue ___ auf die Ferien.', choices: ['mich', 'mir', 'dich'], answer: 'mich', hint: 'Il n’y a pas d’autre CVD.', feedback: 'ich → mich à l’accusatif.' },
        { prompt: 'ich + die Zähne', sentence: 'Ich putze ___ die Zähne.', choices: ['mich', 'mir', 'sich'], answer: 'mir', hint: 'die Zähne est déjà le CVD.', feedback: 'Avec un autre CVD, ich → mir au datif.' },
        { prompt: 'du + einen Snack', sentence: 'Du kaufst ___ einen Snack.', choices: ['dich', 'dir', 'mir'], answer: 'dir', hint: 'einen Snack est déjà le CVD.', feedback: 'Avec un autre CVD, du → dir au datif.' },
      ],
    },
  },
  'conjugaison/konjunktiv-ii': {
    title: 'Konjunktiv II',
    intro: 'Le Konjunktiv II sert à formuler des souhaits, conseils ou hypothèses irréelles.',
    level: '11H',
    lab: {
      title: 'Souhait ou réalité ?',
      intro: 'Compare la forme réelle et la forme irréelle.',
      options: [
        {
          label: 'Réalité',
          sentenceHtml: 'Ich habe Zeit.',
          note: 'C’est une phrase réelle au présent.',
        },
        {
          label: 'Souhait',
          sentenceHtml: 'Ich <span class="mark-verb">hätte</span> gern mehr Zeit.',
          note: 'hätte exprime un souhait irréel ou poli.',
        },
        {
          label: 'Hypothèse',
          sentenceHtml: 'Wenn ich Zeit <span class="mark-verb">hätte</span>, würde ich reisen.',
          note: 'Dans la subordonnée avec wenn, hätte va à la fin.',
        },
      ],
    },
    gaps: {
      title: 'Complète la forme irréelle',
      intro: 'Écris la forme du Konjunktiv II.',
      items: [
        { prompt: 'J’aimerais avoir un chien.', parts: ['Ich ', ' gern einen Hund.'], gaps: [{ answer: 'hätte', aliases: ['haette'] }], hint: 'haben -> hätte.' },
        { prompt: 'Ce serait intéressant.', parts: ['Das ', ' interessant.'], gaps: [{ answer: 'wäre', aliases: ['waere'] }], hint: 'sein -> wäre.' },
        { prompt: 'Je voudrais voyager.', parts: ['Ich ', ' gern reisen.'], gaps: [{ answer: 'würde', aliases: ['wuerde'] }], hint: 'würde + infinitif.' },
        { prompt: 'Si j’avais eu le temps…', parts: ['Wenn ich Zeit ', ' hätte …'], gaps: [{ answer: 'gehabt' }], hint: 'Au passé : hätte + participe passé.' },
      ],
    },
  },
} satisfies Record<string, TheoryPracticePage>;

// Observations used next to the rule on pages without a dedicated theory workshop.
const extraObservations: Record<string, TheoryPracticePage['lab']> = {
  'grammaire/les-pronoms-personnels': {
    title: 'Remplace le groupe, garde son rôle', intro: 'Choisis la fonction du pronom.', options: [
      {label:'Sujet',sentenceHtml:'<span class="mark-subject">Der Junge → Er</span> spielt.',note:'Sujet, nominatif : der Junge devient er.'},
      {label:'CVD',sentenceHtml:'Ich sehe <span class="case-chip case-chip-accusative">den Jungen → ihn</span>.',note:'La personne vue est le CVD : accusatif, ihn.'},
      {label:'CVI',sentenceHtml:'Ich helfe <span class="case-chip case-chip-dative">dem Jungen → ihm</span>.',note:'helfen demande le datif : ihm.'},
    ],
  },
  'syntaxe/und-oder-aber-denn-also': {
    title:'Le connecteur ne prend pas de place',intro:'Compare une affirmation et une question.',options:[
      {label:'Affirmation',sentenceHtml:'Ich lese, aber <span class="mark-subject">du</span> <span class="mark-verb">spielst</span>.',note:'Après aber : sujet en 1, verbe en 2.'},
      {label:'Question',sentenceHtml:'Trinkst du Tee oder <span class="mark-verb">trinkst</span> <span class="mark-subject">du</span> Wasser?',note:'Après oder, la question oui/non garde son verbe en 1.'},
    ],
  },
  'syntaxe/trotzdem-deshalb': {
    title:'Le sens change, le verbe reste en deuxième place',intro:'Choisis une suite à « Il pleut ».',options:[
      {label:'Conséquence',sentenceHtml:'Es regnet, <strong>deshalb</strong> <span class="mark-verb">bleibe</span> <span class="mark-subject">ich</span> zu Hause.',note:'Je reste donc à la maison. deshalb occupe la première place.'},
      {label:'Malgré cela',sentenceHtml:'Es regnet, <strong>trotzdem</strong> <span class="mark-verb">gehe</span> <span class="mark-subject">ich</span> spazieren.',note:'Je me promène quand même. trotzdem est suivi du verbe, puis du sujet.'},
      {label:'Dans la phrase',sentenceHtml:'Es regnet, aber <span class="mark-subject">ich</span> <span class="mark-verb">gehe</span> <strong>trotzdem</strong> spazieren.',note:'trotzdem peut aussi se placer plus loin. Le verbe reste en deuxième position.'},
    ],
  },
  'syntaxe/wenn': {
    title:'Change le début de la phrase',intro:'La règle du verbe reste la même.',options:[
      {label:'Principale d’abord',sentenceHtml:'Ich <span class="mark-verb">komme</span>, wenn ich Zeit <span class="mark-verb">habe</span>.',note:'Le verbe de la subordonnée est à la fin.'},
      {label:'Wenn d’abord',sentenceHtml:'Wenn ich Zeit <span class="mark-verb">habe</span>, <span class="mark-verb">komme</span> <span class="mark-subject">ich</span>.',note:'La subordonnée prend une place entière. Le verbe komme suit la virgule.'},
      {label:'Deux verbes',sentenceHtml:'Du darfst kommen, wenn du die Aufgabe <span class="mark-verbal-tail">gemacht</span> <span class="mark-verb">hast</span>.',note:'Au passé composé : participe passé, puis auxiliaire conjugué à la fin.'},
    ],
  },
  'syntaxe/damit-wahrend-bevor-nachdem-als-obwohl': {
    title:'Un mot change le lien entre les idées',intro:'Observe le sens et le verbe rouge.',options:[
      {label:'But : damit',sentenceHtml:'Ich helfe dir, <strong>damit</strong> du fertig <span class="mark-verb">wirst</span>.',note:'Je t’aide pour que tu termines.'},
      {label:'Temps : bevor',sentenceHtml:'Ich lese, <strong>bevor</strong> ich ins Bett <span class="mark-verb">gehe</span>.',note:'Je lis avant d’aller au lit.'},
      {label:'Opposition : obwohl',sentenceHtml:'Ich komme, <strong>obwohl</strong> ich müde <span class="mark-verb">bin</span>.',note:'Je viens bien que je sois fatigué.'},
      {label:'Passé : als',sentenceHtml:'<strong>Als</strong> ich klein <span class="mark-verb">war</span>, wohnte ich in Bern.',note:'als décrit ici une période passée, pas une habitude qui se répète.'},
    ],
  },
  'syntaxe/les-infinitives': {
    title:'Choisis une intention',intro:'Le groupe infinitif arrive à la fin.',options:[
      {label:'Sans zu',sentenceHtml:'Ich gehe <span class="mark-verbal-tail">schwimmen</span>.',note:'Après gehen, l’infinitif est sans zu.'},
      {label:'Un but',sentenceHtml:'Ich lerne, <strong>um</strong> den Test <span class="mark-verbal-tail">zu bestehen</span>.',note:'um … zu = pour. La même personne apprend et passe le test.'},
      {label:'Sans faire',sentenceHtml:'Er geht, <strong>ohne</strong> <span class="mark-verbal-tail">zu warten</span>.',note:'ohne … zu = sans. Il part sans attendre.'},
      {label:'Particule séparable',sentenceHtml:'Ich versuche, mein Zimmer <span class="mark-verbal-tail">auf<strong>zu</strong>räumen</span>.',note:'zu se glisse entre auf et räumen, en un seul mot.'},
    ],
  },
};
for (const [key, lab] of Object.entries(extraObservations)) theoryPracticePages[key].lab = lab;
