---
title: "Expedition"
summary: "Explosifs, Remnants et Logbooks : fonctionnement d'Expedition, ce que valent le butin de Runeforging et les récompenses des Remnants, comment en profiter et quels builds survivent aux Remnants dangereux."
hub: "Les Ruins of Kingsmarch, sur la côte au sud-est du départ de l'Atlas"
pinnacle: "The Aberration, au Shattered Triskelion (après les boss d'Expedition)"
rewards:
  - "Runes et Verisium"
  - "Logbooks et Sagas"
  - "Monnaie des Remnants"
  - "+1 point passif (une fois)"
---

## Fonctionnement

Posez une ligne d'explosifs (le bouton à gauche de la barre de compétences), puis actionnez le détonateur. Tout ce qui est dans le rayon de l'explosion est déterré : des **monstres runiques** (drapeaux rouges), des **Remnants** (rochers flottants) et des coffres. Un Remnant a de trois à dix runes ; chaque rune ajoute une vague de monstres, et plus il y a de runes, meilleur est le butin proposé. Cliquez d'abord sur un Remnant pour choisir sa récompense. Les modificateurs des Remnants rendent les monstres bien plus dangereux : lisez-les.

Les Ruins of Kingsmarch, sur la côte au sud-est du départ de l'Atlas, mènent à l'océan. Les **Logbooks** révèlent de nouvelles îles ; les Grand Expeditions (palier 6+, bords dentelés) sont un immense site de fouilles avec quinze explosifs, sans monstres tant que vous ne les déterrez pas, et parfois des Mysterious Chests remplis d'un seul type de récompense. Les boss (Medved, Vorana, Uhtred, Olroth, et Styrn dans un tombeau caché) mènent au Shattered Triskelion et au combat ultime contre The Aberration.

```flow
caption: "Déroulé d'une Expedition"
steps:
  - title: "Poser les explosifs"
    text: "Tracez une ligne d'explosifs avec le bouton à gauche de la barre de compétences, à travers Remnants et coffres."
  - title: "Choisir les récompenses des Remnants"
    text: "Cliquez d'abord chaque Remnant : il propose une récompense et ajoute des modificateurs runiques."
  - title: "Faire exploser"
    text: "Tout ce qui est dans le rayon est déterré : monstres runiques, Remnants et coffres."
  - title: "Tuer ce qui sort"
    text: "Chaque rune d'un Remnant ajoute une vague de monstres, renforcés par ses modificateurs."
  - title: "Naviguer plus loin"
    text: "Les Logbooks révèlent des îles et des Grand Expeditions, en route vers les boss."
```

## Ce qu'on y gagne

Des runes, du Verisium, des Alloys et des Fluxes pour le Runeforging et la Ward, des gemmes de compétence kalguuranes, des Sagas (elles forcent l'apparition d'un boss donné dans votre prochain Logbook) et des Crests. Les Remnants peuvent aussi proposer de la monnaie (jusqu'à dix Orbes Divins d'un coup) ou, une seule fois, un bonus permanent pour le personnage : **+1 point de passif**, +10 d'Esprit ou +5 % aux résistances élémentaires. Expedition est le seul contenu d'endgame qui peut donner un point de passif en plus.

## Gagner de la monnaie

- Choisissez la monnaie sur les Remnants quand rien de mieux n'est proposé, et privilégiez les Remnants à beaucoup de runes et à runes violettes pré-serties.
- Vendez Logbooks, Sagas, Alloys, Fluxes et Verisium en lot.
- Dans une Grand Expedition sans bon Remnant, faites sauter un explosif près du départ et passez à la suite : elle ne vaut pas le temps passé.
- Les coffres rares et les monstres runiques des cartes normales donnent aussi des Logbooks : déterrez-les en chemin.

```loot
caption: "Le butin d'Expedition, du drop à la monnaie"
items:
  - item: "Récompenses des Remnants"
    use: "Monnaie (jusqu'à dix Divine Orbs) ou bonus permanent comme +1 point passif"
    sell: "Prenez la monnaie quand rien de mieux n'apparaît ; préférez beaucoup de runes"
    value: high
  - item: "Runes, Verisium, Alloys, Fluxes"
    use: "Runeforging et Ward"
    sell: "Vente en gros"
    value: medium
  - item: "Logbooks et Sagas"
    use: "Révéler des îles ; forcer un boss précis"
    sell: "Vente en gros, ou à faire vous-même"
    value: medium
  - item: "Gemmes de compétence kalguuranes"
    use: "Compétences propres à Expedition"
    sell: "Vendez celles que vous n'utilisez pas"
    value: low
```

## Stratégie de farm et arbre atlas

L'argent d'Expedition vient des Remnants : en avoir plus, avec plus de modificateurs runiques, et plus de butin par modificateur. Prenez d'abord Expanding Territory pour le Remnant supplémentaire, puis Gaining Traction et Calculated Investment, qui transforment chaque modificateur en butin plus abondant et meilleur. Les Logbooks viennent ensuite, puis les nœuds d'explosifs et de Grand Expedition. Double or Nothing fait monter les enjeux : ne prenez son modificateur supplémentaire que si votre build survit aux Remnants dangereux. Cultivate the Sea, un choix de biome pour les cartes océan, est laissé de côté. En carte, faites les cartes Ocean et les Grand Expeditions, et déterrez chaque monstre runique en chemin : ils lâchent des Logbooks.

Lire l'arbre : les numéros donnent l'ordre de prise des notables au fil de vos points, et le chemin doré marque les petits nœuds à prendre en route. Survolez un nœud pour son effet exact ; les keystones (cercles en pointillés) imposent de choisir une option, donnée par la flèche dans la liste. Cet ordre est notre propre lecture de l'arbre, construite autour de la stratégie ci-dessus.

```atlas
tree: Expedition
order:
  - node: Expanding Territory
    choice: 10% chance for an additional Verisium Remnant Encounter
  - node: Gaining Traction
    note: "Chaque Remnant terminé dans la zone augmente la rareté des monstres de 50 %."
  - node: Calculated Investment
    choice: 1% increased Quantity of Items per Runic Modifier
  - node: Steady Development
    choice: Remnant
  - node: Sown Seeds
    note: "Plus de Logbooks sur les monstres runiques."
  - Face the Past
  - node: Strategic Advantage
    choice: Explosives only wait for 50% of Monsters to be slain
    note: "Des runs plus rapides."
  - node: The Quest Continues
    note: "Les Grand Expeditions ont jusqu'à trois modificateurs et un niveau de zone de plus."
  - node: Double or Nothing
    choice: 25% chance to add an additional Runic Modifier
    note: "Plus de danger, plus de butin. Prenez l'option qui n'ajoute aucun modificateur runique si les Remnants vous tuent déjà."
  - node: Feeling Lucky?
    note: "Farrow vend du Liquid Verisium."
  - Buried Ambition
```

## Les builds qui s'y prêtent

Elle convient aux builds aux défenses solides et aux bons dégâts sur les rares : les meilleures récompenses viennent avec les Remnants les plus dangereux. Les builds qui adorent les gros packs peuvent tout laisser se déterrer, puis tout nettoyer d'un coup.
