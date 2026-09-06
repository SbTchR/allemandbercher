import type { TheoryPracticePage } from './theoryPractice';

export const advicePracticePages: Record<string, TheoryPracticePage> = {
  'conseils/comprehension-ecrite': {
    title: 'Lis seulement ce qui t’aide', intro: 'Repère l’indice avant de répondre.', level: 'Révision',
    choices: { title: 'Trouve l’information', intro: 'Un petit mot peut changer toute la réponse.', items: [
      { prompt: 'Quand Lina joue-t-elle au tennis ?', sentence: 'Am Montag lernt Lina. Am Dienstag spielt sie Tennis.', choices: ['Lundi', 'Mardi', 'Tous les jours'], answer: 'Mardi', hint: 'Cherche la phrase qui contient Tennis.', feedback: 'Am Dienstag = mardi. La première phrase parle d’une autre activité.' },
      { prompt: 'Que fait Tom ?', sentence: 'Tom möchte ins Kino gehen, aber er muss zu Hause bleiben.', choices: ['Il va au cinéma', 'Il reste à la maison', 'Il ne sait pas'], answer: 'Il reste à la maison', hint: 'Distingue ce qu’il souhaite et ce qu’il doit faire.', feedback: 'möchte = aimerait ; muss = doit. Le souhait ne se réalise pas ici.' },
      { prompt: 'Que remplace sie ?', sentence: 'Tom hat eine Katze. Sie schläft auf dem Sofa.', choices: ['Le canapé', 'La chatte', 'Plusieurs enfants'], answer: 'La chatte', hint: 'Quel nom féminin a été cité juste avant ?', feedback: 'Ici, sie reprend die Katze. Le contexte donne le sens.' },
    ]},
    gaps: { title: 'Décompose le mot', intro: 'Appuie-toi sur une partie connue.', items: [
      { prompt: 'Brief = lettre ; Freund = ami. Un Brieffreund est un…', parts: ['', '.'], gaps: [{answer:'correspondant', aliases:['un correspondant']}], hint:'C’est un ami avec qui tu échanges des lettres.' },
    ]},
  },
  'conseils/comprehension-orale': {
    title: 'Prépare ton écoute', intro: 'Choisis une stratégie, puis écoute le court message ci-dessus.', level:'Révision',
    choices: {title:'Écouter avec une mission',intro:'Repère ce que la consigne demande.',items:[
      {prompt:'Tu dois trouver l’heure du rendez-vous.',sentence:'À quoi vas-tu faire attention ?',choices:['Aux nombres et aux heures','À chaque mot inconnu','À la grammaire de toutes les phrases'],answer:'Aux nombres et aux heures',hint:'Tu cherches une information précise.',feedback:'C’est une écoute sélective : concentre-toi sur les horaires.'},
      {prompt:'Tu ne comprends pas un mot.',sentence:'L’enregistrement continue. Que fais-tu ?',choices:['Je continue à écouter','Je reste bloqué sur ce mot','Je laisse toutes les réponses vides'],answer:'Je continue à écouter',hint:'Les informations suivantes peuvent t’aider.',feedback:'Continue. Utilise le contexte et vérifie à la deuxième écoute.'},
      {prompt:'Après la première écoute…',sentence:'Il te manque deux réponses.',choices:['Je cible ces passages à la deuxième écoute','Je recommence toutes mes réponses','Je réponds au hasard'],answer:'Je cible ces passages à la deuxième écoute',hint:'Prépare une mission précise pour la suite.',feedback:'La deuxième écoute sert à compléter et à vérifier.'},
    ]},
  },
  'conseils/expression-orale': {
    title:'À toi de répondre',intro:'Lis les répliques à voix haute. Choisis celle qui fait avancer la conversation.',level:'Révision',
    choices:{title:'Répondre et relancer',intro:'Une réponse doit être liée à la question.',items:[
      {prompt:'Was machst du gern?',sentence:'Ton partenaire te demande ce que tu aimes faire.',choices:['Ich spiele gern Fussball. Und du?','Mein Zimmer ist blau.','Am Montag.'],answer:'Ich spiele gern Fussball. Und du?',hint:'Donne une activité, puis pose une question.',feedback:'Tu réponds et tu invites ton partenaire à parler.'},
      {prompt:'Tu n’as pas compris.',sentence:'Comment demander une répétition ?',choices:['Kannst du das bitte wiederholen?','Ich heisse Lina.','Das ist mein Bruder.'],answer:'Kannst du das bitte wiederholen?',hint:'wiederholen = répéter.',feedback:'Tu peux aussi dire : Langsamer, bitte. (Plus lentement, s’il te plaît.)'},
    ]},
    cards:{title:'Une minute pour parler',intro:'Lis la consigne, réponds à voix haute, puis retourne la carte pour voir une aide.',items:[
      {front:'Présente ton loisir : quoi, quand, avec qui ?',back:'Ich spiele gern Tennis. Am Mittwoch spiele ich mit meiner Freundin.'},
      {front:'Décris ta chambre en trois phrases.',back:'Mein Zimmer ist klein. Der Tisch steht am Fenster. Ich lese gern in meinem Zimmer.'},
      {front:'Propose une activité à ton partenaire.',back:'Möchtest du ins Kino gehen? Hast du am Samstag Zeit?'},
    ]},
  },
  'conseils/expression-ecrite': {
    title:'Enrichis puis relis',intro:'Travaille une difficulté à la fois.',level:'Révision',
    choices:{title:'Une idée de plus',intro:'Choisis la suite qui respecte le thème.',items:[
      {prompt:'Tu décris ta chambre.',sentence:'In meinem Zimmer steht ein Bücherregal.',choices:['Ich lese gern Comics.','Meine Tante arbeitet in Berlin.','Der Zug fährt um acht Uhr.'],answer:'Ich lese gern Comics.',hint:'Quel détail reste lié à la bibliothèque ?',feedback:'Tu ajoutes une information liée à ta chambre, sans partir hors sujet.'},
      {prompt:'Tu relis la place du verbe.',sentence:'Choisis la phrase correcte.',choices:['Heute spiele ich Tennis.','Heute ich spiele Tennis.','Heute ich Tennis spiele.'],answer:'Heute spiele ich Tennis.',hint:'Heute occupe la première place.',feedback:'Le verbe conjugué spiele vient en deuxième position.'},
    ]},
  },
  'conseils/vocabulaire': {
    title:'Cache, retrouve, écris',intro:'Essaie sans regarder la réponse. Reviens sur ces mots demain.',level:'Révision',
    cards:{title:'Les mots fréquents',intro:'Dis le mot allemand avant de retourner la carte.',items:[
      {front:'quelque chose',back:'etwas'}, {front:'quelqu’un',back:'jemand'}, {front:'personne (aucune personne)',back:'niemand'}, {front:'seulement',back:'nur'}, {front:'encore',back:'noch'}, {front:'peut-être',back:'vielleicht'},
    ]},
    gaps:{title:'Écris de mémoire',intro:'Écris en allemand, puis vérifie lettre par lettre.',items:[
      {prompt:'peut-être',parts:['',''],gaps:[{answer:'vielleicht'}],hint:'Le mot commence par viel-.'},
      {prompt:'souvent',parts:['',''],gaps:[{answer:'oft'}],hint:'Trois lettres, la première est o.'},
      {prompt:'devoir (obligation), à l’infinitif',parts:['',''],gaps:[{answer:'müssen',aliases:['muessen']}],hint:'Pense au ü et au double s.'},
    ]},
  },
};
