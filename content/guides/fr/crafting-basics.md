---
title: "Les bases du craft : fabriquer ses propres améliorations"
summary: "Lire un objet comme un crafteur, choisir la bonne base, puis utiliser essences, omens, profanation et fluxes pour fabriquer des améliorations sans jeter sa monnaie par les fenêtres."
---

Le craft de Path of Exile 2 ressemble d'abord à un jeu de hasard. Il devient bien plus prévisible une fois que vous savez trois choses : ce qu'un objet *peut* obtenir, de quelle base partir, et quelles monnaies retirent le hasard.

> **En bref.** Partez d'un objet blanc ou magique qui a déjà le modificateur le plus difficile à obtenir, utilisez une Greater Essence pour en garantir un autre, et gardez omens et profanation pour finir l'objet. Ne corrompez jamais un objet inachevé.

## Lire un objet comme un crafteur

- **Les modificateurs** (« mods ») sont les statistiques des objets magiques et rares. Les objets magiques en ont jusqu'à 2, les rares jusqu'à 6.
- **Préfixes et suffixes.** Chaque mod est l'un ou l'autre. Un objet magique en a au plus un de chaque, un rare au plus trois de chaque. Si un rare a déjà trois préfixes, aucune monnaie ne peut lui en ajouter un autre.
- **Le niveau d'objet** (pas le niveau requis) détermine les paliers de mods possibles. Il suffit du niveau du meilleur palier visé, et les niveaux plus bas coûtent bien moins cher à l'échange.
- **Le type de base** fixe les défenses et les attributs requis. Les modificateurs implicites viennent avec la base et peuvent la rendre spéciale (certaines arbalètes tirent une grenade de plus, par exemple).
- **Mod fabriqué.** Tout ce qui garantit un mod précis (une essence, par exemple) ajoute un mod *fabriqué*, et un objet ne peut en porter **qu'un seul**.

Pour voir tous les mods possibles d'un objet, s'ils sont préfixe ou suffixe et le niveau d'objet requis par palier, utilisez **PoE2DB**. Pour simuler un craft et voir vos chances, utilisez **Craft of Exile**, ou essayez notre [simulateur de craft](/craft) : choisissez les modificateurs voulus et il classe les prochaines étapes.

## Étape 1 : trouver la bonne base

La plupart des bons crafts partent d'un objet **blanc ou magique** : une page blanche que vous maîtrisez.

- Ramassez les bases dont votre build a besoin (faites-les mettre en avant par votre filtre de butin).
- Ou achetez-les : sur le site d'échange, choisissez la catégorie, la rareté **Magic**, le niveau d'objet voulu, et le ou les deux mods que vous voulez déjà dessus.
- Commencez par le mod le plus difficile. Pour des bottes, c'est la vitesse de déplacement : une paire magique avec 30 % de vitesse et une bonne résistance est souvent bon marché.
- Un type de base un peu moins bon (moins de défense, moins d'exigences) est souvent bien moins cher et presque aussi bon.

## Étape 2 : ajouter des modificateurs avec contrôle

| Outil | Ce qu'il fait | Quand l'utiliser |
| --- | --- | --- |
| **Greater Essence** | Transforme un objet magique en rare et garantit un mod précis | Votre base magique a deux bons mods : verrouillez-en un troisième |
| **Perfect Essence** | Sur un rare, retire un mod et en ajoute un garanti | Remplacer un mauvais mod sur un objet par ailleurs excellent |
| **Orbes Greater / Perfect** | Exalted, Chaos et autres avec un palier minimum plus élevé | Quand vous en avez les moyens, pour de meilleurs résultats par tentative |
| **Omens** | Changent le fonctionnement de la prochaine monnaie : choisir préfixe ou suffixe, ajouter deux mods au lieu d'un, choisir ce qu'un Chaos Orb retire | Finir un objet dont un côté (préfixes ou suffixes) est plein |
| **Profanation** (Abyss) | Ajoute un mod caché que vous révélez au Well of Souls en choisissant parmi trois options. Sur un rare plein (6 mods), il remplace un mod au hasard | Finir un objet, ou sauver un presque-réussi |
| **Fluxes** | Changent la résistance d'un objet vers un autre élément | L'objet est parfait mais a la mauvaise résistance |

> **Astuce d'échange.** Pensez aux fluxes en achetant : un objet avec la « mauvaise » résistance est souvent bien moins cher, et un flux le corrige.

## Étape 3 : finir, et seulement ensuite corrompre

Ajoutez qualité, châsses et runes une fois les mods terminés. Un **Vaal Orb** corrompt l'objet pour toujours : il peut ajouter une châsse ou un enchantement, modifier les valeurs des mods, relancer la moitié des mods (ce qui ruine généralement l'objet), ou ne rien faire. Ne corrompez qu'un objet que vous êtes prêt à perdre, ou un objet terminé sur lequel vous voulez tenter votre chance.

## Un premier craft simple : des bottes

```items
flow: true
cards:
  - base: Sleek Boots
    rarity: magic
    step: "1. Base magique"
    mods: [30% increased Movement Speed, +38% to Fire Resistance]
  - base: Sleek Boots
    rarity: rare
    step: "2. Greater Essence of the Body"
    mods: [30% increased Movement Speed, +131 to maximum Life, +38% to Fire Resistance]
    mark: [1]
  - base: Sleek Boots
    rarity: rare
    step: "3. Omen Dextral + Exalted Orb"
    mods: [30% increased Movement Speed, +131 to maximum Life, +38% to Fire Resistance, +33% to Cold Resistance]
    mark: [3]
  - base: Sleek Boots
    rarity: rare
    step: "4. Profanation"
    mods: [30% increased Movement Speed, +131 to maximum Life, +38% to Fire Resistance, +33% to Cold Resistance, +23 to Dexterity]
    mark: [4]
    note: "Deux emplacements libres pour plus de résistances ou d'évasion."
```


1. Achetez des bottes magiques avec vitesse de déplacement et une résistance, au niveau d'objet voulu.
2. Utilisez une Greater Essence pour un troisième mod voulu (de la vie, par exemple) : les bottes deviennent rares.
3. Regardez ce qui reste. S'il reste un suffixe libre, utilisez un omen qui force le prochain Exalted Orb à ajouter un suffixe, puis exaltez.
4. Il manque une résistance ? Profanez et choisissez la meilleure des trois options.
5. Mauvais élément ? Un flux et c'est réglé.

## Erreurs fréquentes

- Partir d'un rare aléatoire plein de mods inutiles.
- Acheter le niveau d'objet le plus haut alors qu'un plus bas permet déjà le palier voulu.
- Utiliser deux essences sur le même objet : un seul mod fabriqué peut rester.
- Corrompre avant que l'objet soit terminé.
- Profaner un objet plein sans vérifier : la profanation remplace un de vos mods au hasard. Un objet ne peut avoir qu'un seul mod profané.
- Dépenser de la monnaie sur de l'équipement de campagne remplacé quelques niveaux plus tard.
