---
title: "Delirium"
summary: "Un brouillard à suivre, des Distilled Emotions et le Simulacrum : fonctionnement de Delirium, à quoi sert son butin, comment en profiter et quels builds suivent le rythme."
hub: "Le Withered Willow et les cartes autour"
pinnacle: "Tang'Mazu, via le Simulacrum et Raven's Reflection"
rewards:
  - "Distilled Emotions"
  - "Simulacrum Splinters"
  - "Amulettes instillées"
  - "Uniques de Tang'Mazu"
---

## Fonctionnement

Traversez le miroir au début de la carte : un brouillard se répand et avance à travers elle. Il ajoute des monstres de Delirium et rend chaque monstre plus résistant et plus rentable à mesure qu'on s'éloigne du miroir. Suivez le rythme : passer plus de quatre secondes hors du brouillard met fin à la rencontre. Les Fracturing Mirrors sur le chemin libèrent des packs supplémentaires, et la barre de progression montre ce qu'il reste avant le boss : des rares en plus, les boss uniques Kosis et Omniphobia, et le Loathsome Mire, une zone annexe qui se termine par une amulette portant deux notables infusés.

La quête commence au Withered Willow. Chaque carte autour compte dès que vous tuez son boss sous l'effet du miroir, donne un point d'Atlas Delirium et augmente le délire de la zone. À 100 %, un **Simulacrum** apparaît : des vagues de monstres de plus en plus durs, chacune avec des modificateurs négatifs aléatoires, et Kosis au sommet. Il donne le Raven's Reflection, qui ouvre le combat ultime contre Tang'Mazu.

```flow
caption: "Déroulé d'une carte Delirium"
steps:
  - title: "Traverser le miroir"
    text: "Le brouillard part du miroir et avance à travers la carte."
  - title: "Rester dans le brouillard"
    text: "Les monstres sont plus durs et plus rentables à mesure qu'on avance. Plus de quatre secondes dehors et c'est fini."
  - title: "Briser les Fracturing Mirrors"
    text: "Ils libèrent des packs en plus et remplissent la barre de progression."
  - title: "Atteindre les récompenses"
    text: "Rares en plus, Kosis ou Omniphobia, le Loathsome Mire, puis le boss de carte sous l'effet du miroir."
  - title: "Monter à 100 %"
    text: "Chaque carte augmente le délire de la zone ; à 100 % un Simulacrum apparaît."
```

## Ce qu'on y gagne

- Les **Distilled Emotions** se dépensent au Withered Willow. Sur une amulette, une combinaison d'émotions infuse un notable passif, souvent inaccessible à votre classe ou qui économise plusieurs points. Sur un joyau, elles remplacent un modificateur par un modificateur garanti. Sur une Waystone, elles ajoutent des modificateurs : trois [[Liquid Paranoia]] ajoutent environ 36 % de monstres rares, et ce sont les rares qui lâchent l'essentiel de la monnaie. Trois émotions identiques se combinent en une du palier supérieur au Reforging Bench.
- Des **Simulacrum Splinters** (avec le bon passif d'Atlas) : 300 forment un Simulacrum.
- Tang'Mazu lâche [[Veilpiercer]], [[Sadist's Mercy]], [[The Auspex]], [[Horror's Flight]], The Raven's Flock et [[Split Personality]].

## Gagner de la monnaie

- Vendez les émotions sur le Currency Exchange ; combinez-en trois en une du palier supérieur quand elle vaut plus que les trois séparément. Le passif d'Atlas « You can't scare me anymore! » permet d'obtenir des émotions Potent, qui valent cher.
- Vendez fragments et Simulacrums aux joueurs qui les farment, ou faites-les vous-même si votre build tient les dernières vagues.
- Regardez les amulettes du Loathsome Mire : deux bons notables sur une même amulette se vendent bien.
- Mettez vos propres Paranoia sur vos Waystones : plus de rares, c'est plus de monnaie par carte.

```loot
caption: "Le butin de Delirium, du drop à la monnaie"
items:
  - item: "Distilled Emotions"
    use: "Instiller des notables sur les amulettes, des modificateurs sur joyaux et Waystones"
    sell: "Vente au Currency Exchange ; combinez-en trois si le palier suivant vaut plus"
    value: high
  - item: "Liquid Paranoia"
    use: "Trois sur une Waystone ajoutent environ 36 % de rares"
    sell: "Gardez les vôtres : plus de rares, plus de monnaie par carte"
    value: medium
  - item: "Simulacrum Splinters"
    use: "300 forment un Simulacrum"
    sell: "À vendre à ceux qui le farment, ou à faire vous-même"
    value: medium
  - item: "Amulettes du Loathsome Mire"
    use: "Amulettes avec deux notables instillés"
    sell: "Deux bons notables se vendent bien"
    value: medium
```

## Stratégie de farm et arbre atlas

Les priorités de Maxroll : « You can't scare me anymore! » pour les émotions Potent, « Is this about me... or you? » pour les Simulacrum Splinters, « I see your true nature now! » pour un Map Boss de plus et davantage de Grand Mirrors, et Recurring Nightmares réglé sur la propagation régulière. Son planner les atteint en passant par les nœuds intermédiaires, puis complète le reste. En carte, propagez vite le brouillard : quand un Grand Mirror apparaît, cherchez « Grand Mirror » sur l'Atlas et lancez cette carte. Montez la zone à 100 % de délire, faites le Simulacrum, puis recommencez. Mettez trois Liquid Paranoia sur vos meilleures Waystones pour avoir plus de rares.

Lire l'arbre : les numéros donnent l'ordre de prise des notables au fil de vos points, et le chemin doré marque les petits nœuds à prendre en route. Survolez un nœud pour son effet exact ; les keystones (cercles en pointillés) imposent de choisir une option, donnée par la flèche dans la liste.

```atlas
tree: Delirium
order:
  - node: You can't just wake up from this one.
    note: "Le brouillard dure 30 % plus longtemps, et les Simulacrums proposent un choix bonus entre les vagues."
  - Come on! Face me!
  - node: You can't scare me anymore!
    note: "Les monstres uniques peuvent lâcher des émotions Potent, qui valent cher."
  - There's nowhere to hide...
  - You thought you were free?
  - node: Is this about me... or you?
    note: "Les monstres de Delirium des cartes de niveau 75+ lâchent des Simulacrum Splinters."
  - node: Recurring Nightmares
    choice: Delirium Fog spreads to +4 additional Maps
    note: "L'option régulière. L'autre ajoute plutôt 30 % de délire aux cartes embrumées."
  - The mirrors... the mirrors!
  - node: I see your true nature now!
    note: "Un boss de plus dans l'arène du Map Boss, ou un Grand Mirror garanti."
  - Is that the best you've got?!
  - I know your childhood fears...
  - Get out of my head!
  - These demons are all your own...
  - Are you sure you want to do that?
  - I'm not alone anymore!
```

## Les builds qui s'y prêtent

Elle convient aux builds rapides au bon nettoyage, qui suivent le brouillard, avec assez de défenses pour les dernières vagues du Simulacrum. Les builds lents ou canalisés peinent.
