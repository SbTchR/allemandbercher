# Structure des pages « Exercices » - 9H

Document de cadrage pour les futures pages d'exercices d'`allemandbercher`, construites en suivant la progression de **Geni@l Klick 9H**.

## 1. But du document

Ce document ne décrit pas encore une implementation Astro. Il definit, pour chacun des huit chapitres de 9H:

- la progression pedagogique a conserver sur la page;
- les parties que l'eleve doit voir dans le meme ordre que dans la methode;
- les structures grammaticales, phrases-types, champs lexicaux et competences a travailler;
- les aides et exercices interactifs a prevoir plus tard;
- les references aux exercices du Kursbuch (KB) et de l'Arbeitsbuch (AB) qui justifient chaque partie.

L'objectif n'est pas de reproduire les pages de la methode, mais d'en proposer un **parcours numerique original**, plus explicite et plus autonome pour un eleve qui revise seul.

## 2. Sources et principes de fidelite

Sources consultees dans le dossier `Methode_Geni@lKlick`:

- `9H livres/9 Kursbuch.pdf`, pages 7-76;
- `9H livres/Arbeitsbuch.pdf`, pages 7-76;
- `9H livres/LHB 9H.pdf`, notamment le sommaire detaille et les objectifs par chapitre;
- `analysis/grammaire_genial_klick_9H_11H.md` et sa version JSON;
- les textes extraits correspondants dans `derived_text/`.

Les numeros de pages et d'exercices ci-dessous servent a retrouver la progression de la methode. Ils ne signifient pas qu'il faut copier les consignes, dialogues, textes, chansons, images, enregistrements ou mises en page des manuels.

Pour le futur site:

- creer des situations, phrases, mini-dialogues, plans, profils et textes **originaux**;
- reutiliser le vocabulaire et les patrons grammaticaux deja rencontres par les eleves;
- ne pas publier les PDF, scans ou audios de la methode sans autorisation;
- ne proposer un lien externe qu'apres verification de son adresse, de son fonctionnement et de son adequation pedagogique;
- privilegier un exercice interne lorsque le lien externe serait instable ou trop publicitaire;
- ne pas introduire une structure grammaticale avant son apparition dans la progression, sauf si la partie est explicitement une revision.

## 3. Architecture commune d'une page de chapitre

Chaque page doit suivre le meme squelette, meme si le nombre de parties varie selon le chapitre.

### 3.1 En-tete de chapitre

Afficher immediatement:

- le numero et le titre du chapitre;
- le theme de communication;
- les objectifs utiles formules en francais, sous la forme « Je peux ... »;
- un court rappel des prerequis si le chapitre reutilise une structure precedente;
- une barre ou une liste de progression reprenant les parties dans l'ordre du chapitre.

Exemple de formulation: « Dans ce chapitre, je vais apprendre a parler de ma ville, situer des lieux et donner un chemin simple. »

### 3.2 Structure interne de chaque partie

Chaque partie de la page doit etre une etape autonome et contenir, autant que possible, les elements suivants:

1. **Aide express**: le vocabulaire utile, les phrases-modeles necessaires, une regle courte ou un schema visuel. Le volume de l'aide depend de la difficulte de la partie; elle ne doit pas reprendre toute la grammaire allemande.
2. **Entrainement cible**: une activite interactive a correction immediate portant sur une seule difficulte principale: associer, classer, completer, remettre dans l'ordre, choisir, ecouter puis valider, ou corriger une erreur.
3. **Reutilisation**: une tâche de comprehension, de production orale ou de production ecrite guidee. L'eleve doit reutiliser le patron, pas seulement reconnaitre la bonne reponse.
4. **Aides progressives**: bouton ou niveau « indice », banque de mots, phrase a trous, modele audio ou exemple. Le corrige complet ne doit pas apparaitre automatiquement apres une erreur.

Les parties de comprehension orale et de production peuvent utiliser un audio original ou librement utilisable. Si aucun support audio fiable n'est disponible, l'activite doit rester faisable avec un texte court et une lecture a voix haute par l'eleve.

### 3.3 Fin de page

Terminer par une section courte **« Je fais le point »**:

- les items necessaires pour couvrir les objectifs du chapitre;
- un melange de reconnaissance et de production courte;
- une auto-evaluation simple: « Je sais le faire / Je dois encore m'entrainer »;
- des renvois internes vers les parties a reprendre;
- un corrigé detaille derriere une action explicite, si un corrigé est necessaire.

La page ne doit pas devenir un long cours. La theorie detaillee reste dans l'onglet « Theorie »; la page « Exercices » doit aider l'eleve a agir, verifier et reutiliser.

### 3.4 Renvois explicites vers les sources du site

Pour chaque partie, le document d'implementation devra conserver des indications separees:

- **Exercices KB lies**: les exercices du Kursbuch qui ont motive le contenu de la partie;
- **Renvoi theorie**: la page de theorie du site a proposer lorsque l'eleve a besoin d'une explication plus complete.

Les routes ci-dessous sont les pages actuellement presentes dans le site; les liens finaux devront continuer a passer par `withBase()` pour rester compatibles avec `/allemandbercher`.

| Page de theorie | Route interne a utiliser plus tard |
| --- | --- |
| Imperatif | `/theorie/conjugaison/imperatif/` |
| Present | `/theorie/conjugaison/present/` |
| Verbes de modalite | `/theorie/conjugaison/verbes-de-modalite/` |
| Präterit | `/theorie/conjugaison/preterit/` |
| Passe compose / Perfekt | `/theorie/conjugaison/passe-compose/` |
| Questions | `/theorie/syntaxe/les-questions/` |
| Place du verbe principal | `/theorie/syntaxe/la-place-du-verbe-principal/` |
| Phrases avec verbe de modalite | `/theorie/syntaxe/les-phrases-avec-verbe-de-modalite/` |
| Phrases au passe compose | `/theorie/syntaxe/les-phrases-au-passe-compose/` |
| Cas: theorie de base | `/theorie/grammaire/les-cas-theorie-de-base/` |
| Prepositions | `/theorie/grammaire/les-prepositions/` |
| Pronoms personnels | `/theorie/grammaire/les-pronoms-personnels/` |
| Pronoms possessifs | `/theorie/grammaire/les-pronoms-possessifs/` |

Lorsqu'une partie est principalement lexicale ou strategique, le renvoi theorie peut etre omis; il ne faut pas envoyer l'eleve vers une page generale sans utilite immediate.

### 3.5 Regle de niveau et d'accessibilite

- Une difficulte grammaticale principale par activite.
- Consignes en francais, exemples en allemand lorsque cela aide l'eleve.
- Phrases courtes et champs lexicaux du chapitre.
- Boutons et zones de reponse utilisables au clavier et sur mobile.
- Feedback immediat, descriptif et non culpabilisant.
- Possibilite de recommencer sans perdre la progression.
- La couleur ne doit jamais etre le seul indice: ajouter un mot, une icone ou une consigne.

## 4. Structure detaillee des huit pages 9H

## Chapitre 1 - Die neue Schule

### Objectif general de la page

Permettre a l'eleve de se presenter, de poser et comprendre des questions simples, de parler de sa nouvelle ecole et d'identifier les personnes qui y travaillent.

### Partie 1 - Les consignes de classe et l'imperatif `ihr`

- **Exercices KB lies (AB en appui)**: KB 2, p. 8; AB 3-4, p. 8.
- **Contenu**: phrases dites par l'enseignant ou l'enseignante: ouvrir le livre, regarder une image, parler, noter, faire une liste, venir au tableau. Revoir la transformation `ihr ergänzt -> Ergänzt!`, `ihr kreuzt an -> Kreuzt an!`.
- **Aide a afficher**: tableau tres court « `ihr` au present -> imperatif » et rappel que le sujet n'est pas ecrit dans la consigne. Ajouter les phrases utiles de classe: `Ich verstehe das nicht.`, `Können Sie das bitte wiederholen?`, `Wie kann man das auf Deutsch sagen?`.
- **Entrainement cible**: associer une consigne a une action ou transformer une forme `ihr` en consigne. Prevoir quelques phrases a ecouter puis a identifier.
- **Renvoi theorie**: Imperatif - `/theorie/conjugaison/imperatif/`.
- **Reutilisation**: mini-dialogue eleve-professeur avec les consignes originales utiles; l'eleve doit reconnaitre la consigne et agir ou la reformuler.
- **Point de vigilance**: ne pas melanger encore l'imperatif `du` du chapitre 2, sauf dans une comparaison volontaire en fin d'activite.

### Partie 2 - Se presenter et presenter une autre personne

- **Exercices KB lies (AB en appui)**: KB 3-5, p. 8-9; AB 5-6, p. 9.
- **Contenu**: nom, age, lieu de residence, famille, langues, hobbies, animal, matiere preferee. Introduire les phrases-types `Wie heisst du?`, `Wie alt bist du?`, `Wo wohnst du?`, `Welche Sprachen sprichst du?`, `Was sind deine Hobbys?`, `Hast du ein Haustier?`.
- **Aide a afficher**: fiche-modele en deux colonnes « question / reponse », puis modele de presentation: `Ich heisse ...`, `Ich bin ... Jahre alt.`, `Ich wohne in ...`, `Ich spreche ...`, `Meine Hobbys sind ...`. Pour presenter quelqu'un: `Das ist ...`, `Er/Sie kommt aus ...`, `Sein/Ihr Hobby ist ...`.
- **Entrainement cible**: cartes question-reponse, texte a trous de profil, puis transformation d'une fiche en phrases personnelles.
- **Renvoi theorie**: Present - `/theorie/conjugaison/present/`; pronoms possessifs si les formes `sein / ihr` doivent etre expliquees - `/theorie/grammaire/les-pronoms-possessifs/`.
- **Reutilisation**: profil d'un eleve fictif a lire ou ecouter, puis courte presentation orale guidee. Une banque de prenoms, villes, loisirs et langues permet de varier les donnees.
- **Point de vigilance**: les possessifs sont seulement actives ici; leur systematisation appartient au chapitre 3.

### Partie 3 - Les questions et la nouvelle ecole

- **Exercices KB lies (AB en appui)**: KB 6-7, p. 10-11; AB 7, p. 10.
- **Contenu**: distinguer `Ja-/Nein-Fragen` et `W-Fragen`; questions sur la classe, les horaires, les professeurs, les salles et les activites. Utiliser `Wer? Was? Wo? Wann? Wie? Wie viele? Welche?`.
- **Aide a afficher**: schema minimal de la place du verbe dans une question oui/non et de l'element interrogatif dans une W-Frage. Rappeler que l'on peut poser plusieurs questions sur le meme theme.
- **Entrainement cible**: classer des questions; associer une question a une reponse; remettre en ordre une question melangee; ecouter une courte histoire de premier jour et selectionner la bonne question.
- **Renvoi theorie**: Questions - `/theorie/syntaxe/les-questions/`.
- **Reutilisation**: mini-interview sur une ecole fictive avec les questions necessaires. L'eleve choisit ensuite les informations importantes pour produire une courte synthese.
- **Point de vigilance**: ne pas exiger une analyse abstraite de la position verbale; la priorite est l'interaction et la comprehension.

### Partie 4 - Situer les salles de l'ecole: `wo?`, `im`, `in der`, `neben`

- **Exercices KB lies (AB en appui)**: KB 7-8, p. 11; AB 8-9, p. 11.
- **Contenu**: salles et activites; `Wo lesen wir? - In der Bibliothek.`; `Der Computerraum ist im ersten Stock.`; `Die Bibliothek ist neben der Turnhalle.`. Travailler le datif localise comme un patron utile, sans presenter encore tout le systeme des Wechselpräpositionen.
- **Aide a afficher**: plan original d'une ecole; rappel `der/das -> im` et `die -> in der`; bloc de phrase `X ist neben ...`. Le mot `neben` est prioritaire dans cette partie.
- **Entrainement cible**: cliquer sur une salle a partir d'une description; completer `im / in der`; associer lieu et activite; corriger une localisation sur un plan.
- **Renvoi theorie**: Prepositions - `/theorie/grammaire/les-prepositions/`; cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`.
- **Reutilisation**: decrire oralement ou par une courte production une ecole fictive: une salle, son etage, une salle voisine et une activite.
- **Point de vigilance**: conserver `wo?` et la localisation statique. La distinction `wo? / wohin?` sera reprise et formalisee au chapitre 8.

### Partie 5 - Les metiers et les personnes de l'ecole

- **Exercices KB lies (AB en appui)**: KB 9-10, p. 12; AB 10-11, p. 12.
- **Contenu**: `der Lehrer / die Lehrerin`, `der Koch / die Köchin`, `die Direktorin`, `die Sekretärin`, `der Hauswart`, et les activites associees. Reprendre les questions `Wer? Wo? Was? Wann?` dans un interview.
- **Aide a afficher**: cartes metier / activite et phrases `Was machst du?`, `Was machen Sie?`, `Ich arbeite ...`, `Ich unterrichte ...`, `Ich repariere ...`.
- **Entrainement cible**: associer personne, metier et activite; reconstruire les questions d'un interview; ecouter une reponse et choisir la question correspondante.
- **Renvoi theorie**: Questions - `/theorie/syntaxe/les-questions/`, uniquement pour la construction des questions de l'interview.
- **Reutilisation**: mini-interview original d'un membre de l'ecole, puis courte presentation.
- **Extension facultative**: activite de dessin ou de mime inspiree du KB 11, p. 13, pour reviser le vocabulaire sans ajouter de grammaire.

### Bilan de la page

Verifier que l'eleve sait: donner ses informations personnelles, poser les questions simples necessaires, comprendre `im / in der`, situer une salle avec `neben`, et parler d'une personne de l'ecole. La page doit faire apparaitre les cinq parties ci-dessus dans cet ordre.

## Chapitre 2 - Meine Stadt

### Objectif general de la page

Nommer les lieux de la ville, comprendre une petite histoire en utilisant des strategies de lecture, dire ou se trouve quelque chose et donner un chemin simple.

### Partie 1 - Les lieux et les activites en ville

- **Exercices KB lies (AB en appui)**: KB 1-2, p. 15; AB 1-2, p. 15.
- **Contenu**: `die Bäckerei`, `der Kiosk`, `das Kino`, `der Bahnhof`, `das Krankenhaus`, `die Apotheke`, `der Sportplatz`, `der Supermarkt`, `die Bank`, `die Haltestelle`; activites associees: acheter, regarder un film, attendre, jouer, consulter un medecin.
- **Aide a afficher**: carte simple d'une ville fictive et patron `Im ... kann man ... / gibt es ...`.
- **Entrainement cible**: associer lieu, objet et activite; completer un lieu a partir d'une phrase; retrouver un lieu sur un plan.
- **Reutilisation**: decrire les lieux retenus d'une ville fictive avec une phrase par lieu.

### Partie 2 - Comprendre une histoire: `Freitag, der 13.`

- **Exercices KB lies (AB en appui)**: KB 3, p. 16-17; AB 3-9, p. 16-18.
- **Contenu**: strategie de comprehension par le titre, les questions `Wer? Wo? Wann? Was?`, les images et le contexte. Suivre une histoire en plusieurs etapes sans transformer l'activite en traduction mot a mot.
- **Aide a afficher**: fiche de lecture en quatre questions; rappel « je cherche d'abord les informations importantes »; zone pour noter les personnages, le lieu, le moment et le probleme.
- **Entrainement cible**: remettre des evenements dans l'ordre; associer une phrase a une partie de l'histoire; deduire le sens d'un mot a partir du contexte ou d'une image.
- **Reutilisation**: court texte original accompagne d'images, puis resume bref avec aide visuelle.
- **Point de vigilance**: cette partie travaille une competence de comprehension; ne pas la reduire a un exercice de prepositions.

### Partie 3 - Localiser: prepositions de lieu et datif

- **Exercices KB lies (AB en appui)**: KB 4-6, p. 18-19; AB 10-14, p. 18-19.
- **Contenu**: `vor`, `hinter`, `neben`, `zwischen`, `in`, `auf`, `an`, `unter`, `über` avec `wo?`; `vor dem Supermarkt`, `auf der Bank`, `im Kaufhaus`, `über der Apotheke`. Revoir `im / am` quand ils apparaissent dans les patrons.
- **Aide a afficher**: plan ou objets de classe; tableau tres court `der / das -> dem`, `die -> der`; aucun paradigme complet inutile a ce stade.
- **Entrainement cible**: positionner des objets a partir d'une phrase; choisir la bonne preposition; completer l'article au datif; corriger une phrase fausse sur le plan.
- **Renvoi theorie**: Prepositions - `/theorie/grammaire/les-prepositions/`; cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`.
- **Reutilisation**: jeu de description a deux roles: un eleve decrit, l'autre place ou montre le lieu.
- **Point de vigilance**: traiter ici le datif comme localisation `wo?`; garder la formalisation des changements de lieu pour le chapitre 8.

### Partie 4 - Donner un chemin: imperatif `du`

- **Exercices KB lies (AB en appui)**: KB 7, p. 20; AB 15-17, p. 20-21.
- **Contenu**: `Geh geradeaus.`, `Geh nach links/rechts.`, `Bieg links ab.`, `Fahr weiter.`, `Warte!`; vocabulaire `die Kreuzung`, `die Ampel`, `geradeaus`, `links`, `rechts`.
- **Aide a afficher**: schema d'itineraire avec fleches et sequence `Geh zuerst ... Dann ... An der Kreuzung ...`.
- **Entrainement cible**: suivre un chemin et choisir la destination; remettre des etapes dans l'ordre; transformer `du gehst / du fährst / du biegst ab` en imperatif.
- **Renvoi theorie**: Imperatif - `/theorie/conjugaison/imperatif/`.
- **Reutilisation**: donner un chemin original en suivant les etapes utiles sur un plan fictif; option audio pour verifier la comprehension.
- **Point de vigilance**: distinguer le langage d'orientation des prepositions de destination du chapitre 5.

### Partie 5 - Presenter son lieu de vie

- **Exercices KB lies (AB en appui)**: KB 8-9, p. 21; AB 18, p. 21-22.
- **Contenu**: dire ou l'on habite, ce qu'il y a, ce que l'on peut y faire et donner un avis simple. Structurer une presentation avec une mindmap.
- **Aide a afficher**: canevas `Ich wohne in ...`, `... ist gross/klein`, `In ... gibt es ...`, `Hier kann man ...`; checklist « lieu, endroits retenus, activite, avis ».
- **Entrainement cible**: completer une mindmap; associer phrases et lieux; ecouter une courte presentation et relever les informations utiles.
- **Reutilisation**: presentation orale ou texte de longueur adaptee au niveau de l'eleve sur une ville reelle ou inventee.
- **Lien externe eventuel**: seulement un outil de carte ou un exercice autocorrige dont l'adresse et le contenu auront ete verifies au moment de l'implementation.

### Bilan de la page

Le parcours doit aller du lexique vers la comprehension, puis vers la localisation, le chemin et enfin la presentation personnelle. L'eleve doit pouvoir montrer un lieu, expliquer un itineraire et decrire son quartier sans devoir connaitre les Wechselpräpositionen au complet.

## Chapitre 3 - Meine Familie

### Objectif general de la page

Parler de sa famille et de son logement, utiliser les possessifs, conjuguer quelques verbes irreguliers frequents et decrire une journee simple.

### Partie 1 - La famille et l'arbre genealogique

- **Exercices KB lies (AB en appui)**: KB 1-3, p. 23-24; AB 1-3, p. 23-24.
- **Contenu**: `die Eltern`, `die Geschwister`, `der Bruder`, `die Schwester`, `der Onkel`, `die Tante`, `der Cousin`, `die Cousine`, `die Grosseltern`; comprendre et construire un arbre familial.
- **Aide a afficher**: arbre original avec legendes et patrons `Das ist ...`, `... ist der Bruder von ...`, `... ist die Tante von ...`.
- **Entrainement cible**: reconstruire un arbre a partir de phrases; associer le mot allemand a la relation; repondre a `Wer ist ...?`.
- **Reutilisation**: arbre d'une famille fictive a presenter avec les phrases necessaires; l'eleve peut choisir une famille reelle ou imaginaire.

### Partie 2 - Les possessifs `mein`, `dein`, `sein`, `ihr`, `unser`, `euer`

- **Exercices KB lies (AB en appui)**: KB 4-5, p. 25; AB 4, p. 24-25.
- **Contenu**: possessif + nom dans des phrases sur la famille: `mein Vater`, `meine Schwester`, `sein Bruder`, `ihre Oma`, `unser Beruf`, `euer Onkel`.
- **Aide a afficher**: partir du possesseur, puis regarder le genre ou le pluriel du nom; montrer le contraste `mein Bruder / meine Schwester / meine Geschwister`. La regle doit rester visuelle et courte.
- **Entrainement cible**: choisir le bon possessif dans un arbre ou une photo; completer un texte; classer les noms `m / nt / f / pl`.
- **Renvoi theorie**: Pronoms possessifs - `/theorie/grammaire/les-pronoms-possessifs/`.
- **Reutilisation**: decrire une photo de famille fictive en reutilisant les possessifs necessaires.
- **Point de vigilance**: ne pas ouvrir ici toute la declinaison des possessifs dans les cas; le chapitre vise surtout les formes nominatives liees au contexte.

### Partie 3 - Les pieces et les activites a la maison

- **Exercices KB lies (AB en appui)**: KB 6, p. 26; AB 5, p. 26.
- **Contenu**: `das Wohnzimmer`, `die Küche`, `das Bad`, `der Keller`, `die Garage`, `mein Zimmer`, `der Garten`; patrons `Im Keller ...`, `In der Küche ...`, `In meinem Zimmer ...`.
- **Aide a afficher**: plan original d'une maison et rappel de `im / in der`; connecteurs d'ordre `zuerst`, `dann`, `danach`, `zum Schluss`.
- **Entrainement cible**: associer piece et activite; remettre un parcours dans l'ordre; choisir `im / in der / in meinem`.
- **Renvoi theorie**: Prepositions - `/theorie/grammaire/les-prepositions/`, en rappel du chapitre 1.
- **Reutilisation**: decrire les pieces retenues et ce qu'on y fait; variante mime pour faire deviner l'activite.

### Partie 4 - Les verbes irreguliers au present

- **Exercices KB lies (AB en appui)**: KB 7-8, p. 27; AB 6-7, p. 27.
- **Contenu**: `fahren`, `essen`, `sehen`, `lesen`, `sprechen`, `treffen`, `schlafen`; changements `a-ä`, `e-i`, `e-ie` surtout a la deuxieme et troisieme personne du singulier; pluriel regulier.
- **Aide a afficher**: trois mini-tableaux par famille de changement, avec une phrase-modele pour `du` et `er/sie`.
- **Entrainement cible**: choisir la bonne forme; completions par pronom; transformation `ich -> du -> er/sie`; ecoute de formes proches.
- **Renvoi theorie**: Present - `/theorie/conjugaison/present/`.
- **Reutilisation**: mini-interview sur les habitudes et les loisirs, puis courte production sur une personne de la famille.
- **Point de vigilance**: ne pas faire memoriser une liste abstraite; chaque verbe doit etre lie a une phrase courte et un contexte.

### Partie 5 - Les metiers, formes masculine et feminine

- **Exercices KB lies (AB en appui)**: KB 9-11, p. 28; AB 8-10, p. 28.
- **Contenu**: `der Bäcker / die Bäckerin`, `der Arzt / die Ärztin`, `der Lehrer / die Lehrerin`, `der Mechaniker / die Mechanikerin`, `der Verkäufer / die Verkäuferin`, `der Frisör / die Frisörin`, `der Sekretär / die Sekretärin`, `der Hausmann / die Hausfrau`.
- **Aide a afficher**: carte « metier + action »; rappel de la terminaison feminine lorsque le mot la suit regulierement, sans imposer une theorie complete de formation des noms.
- **Entrainement cible**: associer metier et action; retrouver la forme manquante; jouer un metier a partir d'une phrase.
- **Reutilisation**: parler d'un metier dans sa famille ou inventer un membre de famille: `Er/Sie ist ... von Beruf. Er/Sie kann ...`.

### Partie 6 - Decrire une routine du matin

- **Exercices KB lies (AB en appui)**: KB 12, p. 29; AB 11, p. 29-30.
- **Contenu**: comprendre et raconter une suite d'actions: se reveiller, se lever, se laver, manger, s'habiller, prendre le bus; utiliser `zuerst`, `dann`, `danach`, `zum Schluss`.
- **Aide a afficher**: frise d'images, banque de verbes et modele de phrase.
- **Entrainement cible**: remettre des actions dans l'ordre; associer image et verbe; completer une routine avec le bon sujet et la bonne forme.
- **Renvoi theorie**: Present - `/theorie/conjugaison/present/`; ce renvoi doit rester secondaire par rapport au vocabulaire et a la chronologie.
- **Reutilisation**: ecrire puis enregistrer ou lire une routine originale dont la longueur suit la complexite du modele.

### Bilan de la page

Le fil doit rester: famille -> possessifs -> maison -> verbes irreguliers -> metiers -> journee. Le projet final peut reprendre l'idee d'une presentation familiale, mais avec des donnees et une production originales.

## Chapitre 4 - Alles Gute!

### Objectif general de la page

Souhaiter quelque chose, parler d'un anniversaire et d'une invitation, dire ou l'on etait et ce que l'on avait, puis exprimer ce que l'on peut, doit ou ne doit pas faire.

### Partie 1 - Souhaits et situations

- **Exercices KB lies (AB en appui)**: KB 1, p. 31; AB 1, p. 31.
- **Contenu**: `Herzlichen Glückwunsch!`, `Frohe Weihnachten!`, `Frohe Ostern!`, `Viel Glück!`, `Gute Besserung!`, `Gute Reise!`, `Guten Appetit!`.
- **Aide a afficher**: cartes situation -> formule; une explication en francais de l'usage, sans traduction exhaustive.
- **Entrainement cible**: choisir la formule adaptee a une situation; ecouter un mini-dialogue et selectionner le souhait entendu.
- **Reutilisation**: produire les messages de souhaits necessaires dans des situations originales.

### Partie 2 - Anniversaire, mois, saisons et dates

- **Exercices KB lies (AB en appui)**: KB 2-3, p. 32; AB 2-4, p. 32.
- **Contenu**: mois, saisons, `im Sommer`, `im Januar`, dates avec `am`; habitudes d'anniversaire dans l'espace germanophone.
- **Aide a afficher**: calendrier interactif; distinction visuelle `im + mois/saison` et `am + date`.
- **Entrainement cible**: remettre les mois dans l'ordre; associer date et saison; repondre a `Wann hast du Geburtstag?`.
- **Reutilisation**: remplir un calendrier fictif puis poser les questions utiles a un partenaire ou a un personnage.
- **Point de vigilance**: travailler d'abord les dates utiles a la communication; ne pas transformer la partie en apprentissage exhaustif des nombres ordinaux.

### Partie 3 - Invitation et reponse

- **Exercices KB lies (AB en appui)**: KB 4-5, p. 33; AB 5-6, p. 33-34.
- **Contenu**: qui invite, quand, ou, qui vient; accepter, refuser, remercier, proposer de venir plus tard; formes courtes de SMS et de message.
- **Aide a afficher**: squelette `Liebe ...`, date/heure, lieu, `Kommst du?`, puis `Danke für die Einladung`, `Ich komme gern`, `Ich kann leider nicht`, `Viele Grüsse`.
- **Entrainement cible**: remettre une invitation dans l'ordre; associer reponse et invitation; completer un dialogue court.
- **Reutilisation**: creer une invitation originale puis ecrire une reponse positive ou negative.

### Partie 4 - Dire ou l'on etait et ce qui s'est passe: `war` / `hatte`

- **Exercices KB lies (AB en appui)**: KB 6-9, p. 34-35; AB 7-9, p. 34-35.
- **Contenu**: `Ich war ...`, `Ich hatte ...`, `Wo warst du?`, `Was war los?`, etat de sante ou probleme: `Fieber`, `Kopfweh`, `Bauchweh`, `Unfall`.
- **Aide a afficher**: opposition simple `war = lieu/etat` et `hatte = chose ou symptome`; tableau de formes frequentes `ich/du/er-sie/wir`.
- **Entrainement cible**: choisir `war` ou `hatte`; remettre une conversation dans l'ordre; ecouter une courte histoire et relever le lieu et le probleme.
- **Renvoi theorie**: Präterit de `sein` et `haben` - `/theorie/conjugaison/preterit/`.
- **Reutilisation**: raconter une journee fictive ou repondre a un message `Wie war dein Wochenende?`, avec une longueur adaptee a l'aisance de l'eleve.
- **Point de vigilance**: garder une narration courte; le Perfekt systematique est introduit au chapitre 6.

### Partie 5 - `dürfen`, `müssen` et la structure de phrase

- **Exercices KB lies (AB en appui)**: KB 10-11, p. 36; AB 10-11, p. 36.
- **Contenu**: permission, obligation et absence d'obligation: `Ich darf ...`, `Ich muss ...`, `Ich muss nicht ...`; verbe modal en position 2 et infinitif en fin de phrase.
- **Aide a afficher**: schema en deux couleurs `Sujet + modal conjugue + ... + infinitif`; tableau minimal des formes au present.
- **Entrainement cible**: associer situation et modal; replacer le verbe a la bonne place; distinguer `nicht dürfen` et `nicht müssen` dans une situation explicite.
- **Renvoi theorie**: Verbes de modalite - `/theorie/conjugaison/verbes-de-modalite/`; phrases avec verbe de modalite - `/theorie/syntaxe/les-phrases-avec-verbe-de-modalite/`.
- **Reutilisation**: comparer une fete et une journee d'ecole avec les phrases necessaires; variante « que peux-tu faire pendant les vacances? ».
- **Point de vigilance**: toujours donner le sens en contexte: « interdit » n'est pas « pas necessaire ».

### Partie 6 - Interview et projet d'anniversaire

- **Exercices KB lies (AB en appui)**: KB 12-13, p. 37; AB 12-13, p. 37-38.
- **Contenu**: poser des questions sur une fete: `Wer? Wann? Wo? Was?`; prendre des notes et presenter une fete ideale.
- **Aide a afficher**: grille `Qui / quand / ou / activites / manger-boire / cadeaux`.
- **Entrainement cible**: ecouter ou lire une interview originale et remplir la grille; transformer des notes en phrases.
- **Renvoi theorie**: Questions - `/theorie/syntaxe/les-questions/`, pour construire les questions de l'interview.
- **Reutilisation**: planifier une fete imaginaire et la presenter dans un texte ou un mini-dialogue d'une longueur adaptee.

### Bilan de la page

Les six parties doivent former une progression communicative: reconnaitre la situation, dater, inviter, raconter un petit probleme, exprimer permission/obligation, puis organiser une fete.

## Chapitre 5 - Wir fahren weg!

### Objectif general de la page

Parler de destinations, comprendre et organiser un voyage, commander a manger, ecrire une carte postale et discuter une proposition.

### Partie 1 - Villes et points cardinaux dans l'espace germanophone

- **Exercices KB lies (AB en appui)**: KB 1, p. 45; AB 1-2, p. 45-46.
- **Contenu**: villes et lieux de D-A-CH; `im Norden/Süden/Osten/Westen`, `in der Mitte von ...`; `Wo liegt ...?`.
- **Aide a afficher**: carte simplifiee originale avec boussole et les villes necessaires; phrases `Hamburg liegt im Norden von Deutschland.`.
- **Entrainement cible**: situer une ville; associer ville et pays; completer le point cardinal; ecouter une question-reponse.
- **Reutilisation**: produire les localisations utiles a partir d'une carte fictive ou reelle simplifiee.

### Partie 2 - Destination, transport et souhait: `wohin?`

- **Exercices KB lies (AB en appui)**: KB 2, p. 46; AB 3, p. 46.
- **Contenu**: `nach Hamburg`, `in die Schweiz`, `in die Berge`, `an den See`, `ans Meer`; `mit dem Auto`, `mit dem Zug`; `Ich möchte ...`.
- **Aide a afficher**: carte de decision tres courte: ville/pays sans article -> `nach`; pays ou lieu avec article -> `in die`; eau/montagnes -> `an den / ans / in die`; transport -> `mit + datif`.
- **Entrainement cible**: classer les destinations; choisir `nach / in die / an den / ans`; completer le moyen de transport avec `dem`; distinguer `wo?` de `wohin?`.
- **Renvoi theorie**: Prepositions - `/theorie/grammaire/les-prepositions/`; cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`.
- **Reutilisation**: planifier un depart avec destination, transport et activite.
- **Point de vigilance**: ne pas presenter ici tout le systeme des prepositions mixtes; l'objectif est la destination et les patrons frequents.

### Partie 3 - Auberge de jeunesse: comprendre et reserver

- **Exercices KB lies (AB en appui)**: KB 3-5, p. 47; AB 4-5, p. 47.
- **Contenu**: informations pratiques, prix, dates, nombre de personnes, activites, carte de membre; questions `Wann? Wie viel? Kann man ...? Muss man ...?`.
- **Aide a afficher**: fiche d'hebergement avec icones et un modele de reservation.
- **Entrainement cible**: reperer une information dans une fiche; associer question et reponse; completer un appel de reservation.
- **Reutilisation**: dialogue original de reservation avec les informations indispensables a la situation.
- **Lien externe eventuel**: une page publique peut servir de support uniquement si elle est stable, lisible et sans donnees personnelles; sinon creer une fiche interne fictive.

### Partie 4 - Commander: `möchten`, `nehmen` et l'accusatif

- **Exercices KB lies (AB en appui)**: KB 6-7, p. 48; AB 6-7, p. 48-49.
- **Contenu**: aliments, boissons et contenants; `Ich möchte ...`, `Ich nehme ...`, `Ich hätte gern ...`, `Was kostet das?`; `ein -> einen` pour le masculin a l'accusatif.
- **Aide a afficher**: menu original avec pictogrammes; rappel `einen Salat`, `ein Eis`, `eine Cola`, `zwei Portionen Pommes`.
- **Entrainement cible**: constituer une commande; choisir `ein/eine/einen`; calculer un prix simple; associer commande et reponse.
- **Renvoi theorie**: Cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`; pronoms personnels uniquement si une variante de dialogue les introduit - `/theorie/grammaire/les-pronoms-personnels/`.
- **Reutilisation**: mini-dialogue vendeur-client a jouer ou a enregistrer.

### Partie 5 - Carte postale et texte variable

- **Exercices KB lies (AB en appui)**: KB 8-10, p. 49; AB 8-9, p. 49-50.
- **Contenu**: formule d'ouverture et de fin, lieu, meteo, activites, impressions; patron `Grüsse aus ...`, `Das Wetter ist ...`, `Hier kann man ...`, `Viele Grüsse`.
- **Aide a afficher**: carte postale a zones identifiees; surligner les elements variables: ville, meteo, lieu, activite, avis.
- **Entrainement cible**: remettre une carte dans l'ordre; completer les elements variables; associer une carte a une destination.
- **Reutilisation**: ecrire une carte postale originale dont la longueur est adaptee au modele et au niveau de l'eleve.

### Partie 6 - Donner une raison et discuter une proposition

- **Exercices KB lies (AB en appui)**: KB 11-15, p. 50-51; AB 10-13, p. 50-51.
- **Contenu**: `Ich fahre ...`, `Ich möchte ...`, `Da kann man ...`, `Das finde ich gut/nicht gut`, `Ich möchte lieber ...`, `Einverstanden!`; arguments simples pour choisir une sortie.
- **Aide a afficher**: quatre etiquettes: proposition, refus, nouvelle proposition, accord. Fournir des phrases courtes et des raisons basees sur une activite ou une preference.
- **Entrainement cible**: classer les repliques; completer un dialogue; selectionner la proposition commune a partir de deux avis.
- **Reutilisation**: discussion guidee pour choisir une destination de classe et justifier le choix avec les arguments utiles.
- **Point de vigilance**: ne pas imposer `weil` comme objectif de 9H; travailler les raisons sous forme de patrons communicatifs accessibles.

### Bilan de la page

La page doit suivre le mouvement « situer une ville -> choisir une destination -> organiser l'hebergement -> commander -> ecrire -> negocier une sortie ». Les activites de production doivent rester tres guidees.

## Chapitre 6 - Klassenfahrt nach Basel

### Objectif general de la page

Demander des informations pendant un voyage, comprendre les regles et le programme d'une excursion, raconter ce qui s'est passe et utiliser le Perfekt regulier.

### Partie 1 - Programme, regles et informations pratiques

- **Exercices KB lies (AB en appui)**: KB 1-3, p. 53-54; AB 1-4, p. 53-54.
- **Contenu**: depart, rendez-vous, cout, hebergement, regles; `dürfen`, `nicht dürfen`, `müssen`; questions sur l'hostel.
- **Aide a afficher**: fiche de voyage originale avec calendrier, prix et regles; rappel du contraste permission/interdiction/obligation du chapitre 4.
- **Entrainement cible**: retrouver une information; distinguer ce qui est permis ou obligatoire; associer question et detail de l'hebergement.
- **Renvoi theorie**: Verbes de modalite - `/theorie/conjugaison/verbes-de-modalite/`; phrases avec verbe de modalite - `/theorie/syntaxe/les-phrases-avec-verbe-de-modalite/`.
- **Reutilisation**: expliquer les regles pertinentes a un camarade qui prepare son sac.

### Partie 2 - Comprendre les lieux et les activites a Bale

- **Exercices KB lies (AB en appui)**: KB 4-6, p. 55; AB 5, p. 55.
- **Contenu**: Münster, Dreiländerbrücke, St. Jakob-Park, Augusta Raurica et activites; comprendre un podcast ou un court texte informatif.
- **Aide a afficher**: carte ou galerie originale avec les lieux pertinents et une phrase informative par lieu.
- **Entrainement cible**: vrai/faux justifie; associer lieu et activite; relever une information dans un audio ou un texte.
- **Reutilisation**: choisir les lieux pertinents et dire ce qu'on veut y faire avec `Ich möchte ...`.

### Partie 3 - Construire le Perfekt regulier avec `haben`

- **Exercices KB lies (AB en appui)**: KB 7-10, p. 56-57; AB 6-9, p. 56-57.
- **Contenu**: `machen - gemacht`, `kochen - gekocht`, `feiern - gefeiert`, `aufräumen - aufgeräumt`, verbes separables, verbes en `-ieren`, prefixes `be-/er-`.
- **Aide a afficher**: phrase en deux parties `haben + Partizip II`, puis trois familles visuelles: `ge ... t`, verbe separable, pas de `ge` pour `-ieren` et certains prefixes.
- **Entrainement cible**: associer infinitif et participe; classer les participes; completer une phrase au Perfekt; identifier le verbe auxiliaire.
- **Renvoi theorie**: Passe compose / Perfekt - `/theorie/conjugaison/passe-compose/`; phrases au passe compose - `/theorie/syntaxe/les-phrases-au-passe-compose/`.
- **Reutilisation**: raconter une journee de voyage en reutilisant les actions regulieres pertinentes.
- **Point de vigilance**: l'eleve doit d'abord memoriser quelques verbes utiles en contexte, pas appliquer une regle a des verbes inconnus sans aide.

### Partie 4 - Place des elements dans la phrase au Perfekt

- **Exercices KB lies (AB en appui)**: KB 9-11, p. 57-58; AB 9-10, p. 57-58.
- **Contenu**: auxiliaire en position 2, participe en fin de phrase; marqueurs `zuerst`, `dann`, `danach`, `zuletzt`; apprentissage par etapes « avec aide puis sans aide ».
- **Aide a afficher**: phrase coloree avec emplacement fixe de `haben/ist` et du participe; frise temporelle.
- **Entrainement cible**: remettre une phrase dans l'ordre; deplacer le participe; completer d'abord avec banque de mots puis sans banque.
- **Renvoi theorie**: Phrases au passe compose - `/theorie/syntaxe/les-phrases-au-passe-compose/`; place du verbe principal - `/theorie/syntaxe/la-place-du-verbe-principal/`.
- **Reutilisation**: produire un mini-recit a partir d'une serie d'images.

### Partie 5 - Pronoms personnels a l'accusatif

- **Exercices KB lies (AB en appui)**: KB 12, p. 58; AB 11-13, p. 58-59.
- **Contenu**: `mich`, `dich`, `ihn`, `sie`, `es`, `uns`, `euch`, `sie`; liens avec `sehen`, `finden`, `lieben`, `fragen`, `anrufen`, `verstehen`.
- **Aide a afficher**: tableau minimal nominatif -> accusatif et exemples lies au voyage: `Ich sehe ihn.`, `Wir besuchen sie.`, `Ich verstehe dich.`.
- **Entrainement cible**: remplacer un groupe nominal par un pronom; choisir le pronom a partir du genre et du nombre; corriger une phrase.
- **Renvoi theorie**: Pronoms personnels - `/theorie/grammaire/les-pronoms-personnels/`; cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`.
- **Reutilisation**: dialogue de voyage avec bagages, personnes et lieux a retrouver.

### Partie 6 - Demander de l'aide pendant le voyage et faire un quiz

- **Exercices KB lies (AB en appui)**: KB 13-14, p. 59; AB 14, p. 59-60.
- **Contenu**: `Wo ist ...?`, `Wie komme ich zum/zur ...?`, `Wie viel kostet ...?`, `Wann fährt ...?`, `Kann ich ...?`; `zum Bahnhof`, `zur Polizei`.
- **Aide a afficher**: carte de phrases de survie et schema `zu dem -> zum`, `zu der -> zur`.
- **Entrainement cible**: associer situation et question; trouver la reponse; suivre un itineraire; construire une question a partir d'une image.
- **Renvoi theorie**: Questions - `/theorie/syntaxe/les-questions/`; cas de base - `/theorie/grammaire/les-cas-theorie-de-base/` pour `zum / zur`.
- **Reutilisation**: mini-jeu de role gare/hostel/musee, puis quiz original sur une ville.

### Bilan de la page

Le Perfekt doit etre installe progressivement: comprendre le voyage, produire les participes, placer les elements, remplacer des noms par des pronoms, puis reutiliser le tout dans une situation de voyage.

## Chapitre 7 - Freunde haben - Freunde finden

### Objectif general de la page

Parler d'amitie, raconter des activites passees, decrire un ami, comprendre des conseils et faire des compliments avec les pronoms au datif.

### Partie 1 - Parler de l'amitie et des rencontres

- **Exercices KB lies (AB en appui)**: KB 1-2, p. 61-62; AB 1-2, p. 61-62.
- **Contenu**: lieux de rencontre, activites communes, `Mein bester Freund / Meine beste Freundin ...`, `Wir ... zusammen`, `Ich habe ihn/sie ... kennengelernt`.
- **Aide a afficher**: profil d'ami avec cases « qui, ou, quand, activites communes ».
- **Entrainement cible**: reconstruire un profil; associer lieu et activite; relever les informations importantes d'un message.
- **Reutilisation**: ecrire un portrait bref sur un ami reel ou fictif.

### Partie 2 - Raconter ce qui s'est passe: Perfekt irregulier

- **Exercices KB lies (AB en appui)**: KB 3-6, p. 63-64; AB 2-7, p. 62-64.
- **Contenu**: `essen - gegessen`, `sehen - gesehen`, `schreiben - geschrieben`, `anrufen - angerufen`, `gehen - gegangen`, `fahren - gefahren`, `kommen - gekommen`, `bleiben - geblieben`, `sein - gewesen`; choix `haben / sein`.
- **Aide a afficher**: deux repertoires a memoriser: actions le plus souvent avec `haben`, mouvements et quelques formes frequentes avec `sein`; une fiche infinitif / auxiliaire / participe.
- **Entrainement cible**: classer les formes; choisir l'auxiliaire; completer une histoire; remettre des actions dans l'ordre.
- **Renvoi theorie**: Passe compose / Perfekt - `/theorie/conjugaison/passe-compose/`; phrases au passe compose - `/theorie/syntaxe/les-phrases-au-passe-compose/`.
- **Reutilisation**: raconter une journee entre amis en reutilisant notamment un verbe avec `sein`.
- **Point de vigilance**: presenter les cas frequents et les apprendre comme des unites; ne pas faire croire qu'une regle unique resout tous les auxiliaires.

### Partie 3 - Qualites et description d'un ami

- **Exercices KB lies (AB en appui)**: KB 8-11, p. 65; AB 7-9, p. 64-65.
- **Contenu**: `ehrlich`, `lustig`, `mutig`, `pünktlich`, `sportlich`, `geduldig`, `sympathisch`, et les contraires avec `un-` ou une autre forme.
- **Aide a afficher**: cartes de paires `ehrlich - unehrlich`, `pünktlich - unpünktlich`, etc.; rappel `Er/Sie ist ...` et `Ich mag ihn/sie, weil ...` seulement si la phrase reste a un niveau deja maitrise.
- **Entrainement cible**: associer les contraires; choisir une qualite a partir d'une situation; lire une petite statistique et relever les informations utiles.
- **Reutilisation**: decrire un ami avec les qualites pertinentes et un exemple concret.

### Partie 4 - Comprendre un forum et donner un conseil

- **Exercices KB lies (AB en appui)**: KB 12, p. 66; AB 10-11, p. 66-67.
- **Contenu**: probleme d'un nouvel eleve, conseils pour rencontrer des amis, `Du musst ...`, `Du kannst ...`, `Geh doch ...`, faire un compliment, aider quelqu'un, faire du sport.
- **Aide a afficher**: fiche « probleme -> idee -> conseil »; strategies de lecture: identifier le probleme, le conseil et la personne qui le donne.
- **Entrainement cible**: associer un conseil a un probleme; relever les mots importants; choisir le conseil le plus adapte; remettre une reponse de forum dans l'ordre.
- **Reutilisation**: ecrire une reponse courte et bienveillante a un personnage.
- **Point de vigilance**: le site doit traiter les situations relationnelles avec un ton respectueux et sans faire porter a l'eleve la responsabilite d'un probleme sensible.

### Partie 5 - Pronoms au datif, verbes en chunks et compliments

- **Exercices KB lies (AB en appui)**: KB 13-14, p. 67; AB 12-14, p. 66-68.
- **Contenu**: `mir`, `dir`, `ihm`, `ihr`, `uns`, `euch`, `ihnen`, `Ihnen`; `schmecken`, `gefallen`, `helfen`, `stehen`, `geben`, `leihen`; phrases `Wie geht es dir?`, `Die Jacke steht dir gut.`, `Wie schmeckt dir ...?`.
- **Aide a afficher**: apprendre chaque verbe avec sa question et une phrase: `Wem hilft ...?`, `Wie gefällt dir ...?`, `Wie schmeckt dir ...?`; tableau bref des pronoms.
- **Entrainement cible**: completer le pronom; associer verbe et structure; distinguer accusatif et datif dans des mini-dialogues; remettre une replique de compliment.
- **Renvoi theorie**: Pronoms personnels - `/theorie/grammaire/les-pronoms-personnels/`; cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`.
- **Reutilisation**: produire un compliment adapte a un personnage, puis mini-projet de compliments originaux.
- **Point de vigilance**: ne pas enseigner le datif comme un tableau isole: le lier a des chunks et a une situation sociale.

### Bilan de la page

Le parcours doit aller de l'amitie vers le recit, puis la description, le conseil et enfin l'interaction avec le datif. La partie Perfekt doit reutiliser les strategies installees au chapitre 6.

## Chapitre 8 - Bei uns zu Hause

### Objectif general de la page

Decrire son logement et sa chambre, dire ou se trouve un objet, dire ou on le place et distinguer clairement `wo?` et `wohin?`.

### Partie 1 - Lieu prefere et maniere d'habiter

- **Exercices KB lies (AB en appui)**: KB 1, p. 69; AB 1-2, p. 69.
- **Contenu**: `mein Lieblingsplatz`, maison/appartement, ville/campagne, `Da kann ich ...`, raisons simples et ambiance.
- **Aide a afficher**: fiche `Wo? / Wie? / Was mache ich da? / Warum gefällt es mir?`.
- **Entrainement cible**: associer description et lieu; relever les informations d'un court texte; completer une presentation.
- **Reutilisation**: decrire un lieu prefere avec une longueur adaptee aux modeles proposes.

### Partie 2 - Meubles et objets de la chambre

- **Exercices KB lies (AB en appui)**: KB 2, p. 70; AB 3, p. 70.
- **Contenu**: `das Bett`, `das Regal`, `der Schrank`, `die Lampe`, `der Teppich`, `die Wand`, `die Decke`, `der Boden`, `der Schreibtisch`, `der Sessel`, `der Papierkorb`, `die Garderobe`.
- **Aide a afficher**: chambre interactive originale avec articles visibles et banque de mots; distinction `stehen`, `liegen`, `hängen` pour les objets en position.
- **Entrainement cible**: nommer un objet; choisir l'article; associer objet et verbe de position; retrouver un objet sur l'image.
- **Renvoi theorie**: Prepositions - `/theorie/grammaire/les-prepositions/`, en lien avec les exemples de localisation.
- **Reutilisation**: produire une description a partir d'une chambre fictive.

### Partie 3 - Dire ou se trouve un objet: `wo?` + datif

- **Exercices KB lies (AB en appui)**: KB 3-6, p. 70-72; AB 4-6, p. 71.
- **Contenu**: `an`, `auf`, `in`, `hinter`, `neben`, `vor`, `über`, `unter`, `zwischen`; articles au datif, pluriel `den`; questions `Wo ist ...?`.
- **Aide a afficher**: plan de chambre et tableau des articles seulement pour les combinaisons utilisees; exemple `Das Bild hängt an der Wand.`.
- **Entrainement cible**: choisir preposition + article; placer un objet; repondre a une question `Wo?`; corriger une description de chambre.
- **Renvoi theorie**: Prepositions - `/theorie/grammaire/les-prepositions/`; cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`.
- **Reutilisation**: jeu de description en deux roles avec une image connue d'un seul eleve.

### Partie 4 - Dire ou l'on place un objet: `wohin?` + accusatif

- **Exercices KB lies (AB en appui)**: KB 7, p. 73; AB 8-10, p. 73.
- **Contenu**: opposition statique / mouvement avec `liegen/legen`, `stehen/stellen`, `hängen/hängen`; `auf den Tisch`, `in den Schrank`, `an die Wand`, `in die Küche`.
- **Aide a afficher**: fleche pour le mouvement et point fixe pour la position; paire contrastive `Das Buch liegt auf dem Tisch. / Ich lege das Buch auf den Tisch.`.
- **Entrainement cible**: classer `wo? / wohin?`; choisir le verbe; choisir datif ou accusatif; transformer une phrase de position en phrase de placement.
- **Renvoi theorie**: Prepositions - `/theorie/grammaire/les-prepositions/`; cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`.
- **Reutilisation**: scenario « ranger la chambre » avec une suite d'ordres originaux, puis verification de l'etat final.
- **Point de vigilance**: faire manipuler la difference de sens avant de demander le nom grammatical du cas.

### Partie 5 - Decrire son logement et donner des conseils

- **Exercices KB lies (AB en appui)**: KB 9-10, p. 74; AB 11, p. 74-75.
- **Contenu**: `das Hochhaus`, `die Wohnung`, `der Altbau`, `das Reihenhaus`, `der Bauernhof`; aspects positifs et negatifs; ordre et rangement; mindmap.
- **Aide a afficher**: canevas `Ich wohne ...`, `Meine Wohnung ist ...`, `Positiv ist ...`, `Leider ...`; carte de conseils `System / Spass / feste Zeit`.
- **Entrainement cible**: associer texte et type de logement; relever positif/negatif; organiser une mindmap; choisir un conseil adapte a un probleme de rangement.
- **Reutilisation**: presenter un logement reel ou imaginaire avec une image, une mindmap ou un texte de longueur adaptee.

### Partie 6 - Regarder par la fenetre et produire une courte description

- **Exercices KB lies (AB en appui)**: KB 11, p. 75; AB 12, p. 75-76.
- **Contenu**: elements visibles depuis une fenetre; `Ich sehe ...` avec l'accusatif; description d'un environnement urbain ou rural; petit texte poetique original.
- **Aide a afficher**: grille `Je vois / Je ne vois pas / Ou? / Quelle ambiance?`; rappel `Ich sehe einen Mann / eine Blume / ein Haus`.
- **Entrainement cible**: ecouter ou lire une description et choisir la bonne vue; associer groupes nominaux et formes de l'accusatif; memoriser une image et restituer les elements retenus.
- **Renvoi theorie**: Cas de base - `/theorie/grammaire/les-cas-theorie-de-base/`; pronoms personnels si la description reutilise `ihn / sie / es` - `/theorie/grammaire/les-pronoms-personnels/`.
- **Reutilisation**: ecrire un texte original « Blick aus meinem Fenster » dont la longueur depend du modele et du niveau de l'eleve.
- **Point de vigilance**: ne pas reproduire le poeme du manuel; travailler la competence de description avec un contenu nouveau.

### Bilan de la page

La distinction `wo? / wohin?` doit etre le point culminant de la page. Les parties precedentes installent le lexique et la description avant la manipulation grammaticale, puis la production finale reutilise le logement et la vue depuis la fenetre.

## 5. Elements a mutualiser plus tard dans le site

Ces elements peuvent etre communs aux huit pages sans constituer une nouvelle architecture lourde:

- composant d'aide « A retenir » avec exemple, indice et corrige explicite;
- exercice d'association question/reponse;
- exercice de classement en deux colonnes;
- texte a trous a correction par item;
- mini-dialogue a remettre dans l'ordre;
- activite d'ecoute avec transcription masquee puis affichee sur demande;
- production guidee avec banque de mots et modele;
- bloc « mots a revoir » limite a 8-12 mots directement utiles;
- bouton « Refaire cette partie » et retour a la partie ciblee;
- bilan `Je peux ...` commun a la page.

Les interactions doivent rester locales a la page ou a la partie qui les utilise. Il ne faut pas transformer tout le site en tableau de bord ni charger du JavaScript global pour une seule activite.

## 6. Priorites pour une implementation ulterieure

Si les huit pages ne peuvent pas etre implementees en une seule fois, conserver en priorite:

1. l'en-tete et la carte de progression;
2. l'aide express de chaque partie;
3. un exercice autocorrige par partie;
4. une production guidee pour les parties communicatives majeures;
5. le bilan final et les renvois vers la theorie.

Les liens externes, les audios, les images et les variantes avancees peuvent venir ensuite, apres verification de leur licence, de leur stabilite et de leur utilite reelle.

## 7. Verification avant implementation

Pour chaque page, verifier que:

- les parties apparaissent dans l'ordre du chapitre Geni@l Klick;
- la grammaire de la partie correspond bien au niveau et au moment de la progression;
- les exemples sont originaux et ne recopient pas les manuels;
- chaque exercice a une consigne claire, un feedback et un indice;
- la production demandee est faisable sans vocabulaire non prepare;
- les erreurs ne devoilent pas automatiquement tout le corrige;
- le parcours fonctionne au clavier et sur mobile;
- le rendu respecte les couleurs, composants et conventions existants d'`allemandbercher`;
- les liens et ressources fonctionnent avec le sous-chemin de production `/allemandbercher`.
