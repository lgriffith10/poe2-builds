---
title: "Vaal Temple"
summary: "Des Energized Crystals, un plateau de temple à planifier et des salles qui s'améliorent entre elles : fonctionnement du Vaal Temple (Incursion), ce que donnent ses salles, comment en profiter et quels builds s'en sortent."
hub: "La cité de Lira Vaal, au nord de l'Atlas"
pinnacle: "Atziri, la Reine Rouge"
rewards:
  - "Bonus des salles"
  - "Double corruption"
  - "Soul Cores"
  - "Récompenses des coffres-forts"
  - "Médaillons"
---

## Fonctionnement

Tuez les monstres corrompus dans les cercles vaal qui apparaissent dans les cartes pour récupérer des Energized Crystals ; six ouvrent un portail vers les ruines vaal. La cité de Lira Vaal, au nord de l'Atlas, a des balises garanties et donne des points d'Atlas Fate of the Vaal. Dans la console du temple, vous placez six salles par run sur un plateau de 80 cases et vous les reliez. Les salles s'améliorent entre elles quand elles sont posées à côté du bon voisin (maintenez ALT sur une salle pour voir lequel), jusqu'au palier 3 : plus le palier est haut, plus la salle est dure et rapporte. Après chaque run, une partie du temple se **déstabilise** et disparaît, beaucoup plus après avoir tué l'Architecte ou Atziri.

```flow
caption: "Déroulé d'un passage au temple"
steps:
  - title: "Récolter les cristaux"
    text: "Tuez les monstres corrompus des cercles vaal ; six Energized Crystals ouvrent le portail."
  - title: "Placer six salles"
    text: "Sur le plateau de 80 cases, placez et reliez six salles par passage."
  - title: "Améliorer par voisinage"
    text: "Une salle à côté du bon voisin monte de rang, jusqu'au rang 3 (maintenez ALT pour voir lesquelles)."
  - title: "Parcourir le temple"
    text: "Les rangs élevés sont plus durs et rapportent plus ; les bonus s'additionnent sur tout le temple."
  - title: "Survivre à la déstabilisation"
    text: "Une partie du temple disparaît après chaque passage ; verrouillez les salles clés avec le médaillon de Juatalotli."
```

## Ce qu'on y gagne

- Les **bonus de salle** s'additionnent sur tout le temple : les Alchemy Labs et Smithies augmentent la rareté des objets, les Garrisons et Commanders ajoutent et renforcent des monstres, les Synthflesh Labs augmentent l'expérience. Un Flesh Surgeon de palier 3 remplace l'un de vos membres par un membre mécanique : un modificateur en plus jusqu'à votre mort.
- Le **craft vaal** dans les meilleures salles : corrompre une seconde fois un objet déjà corrompu, des Soul Cores anciens sur les Vaal Constructs, et des affixes spéciaux sur les uniques vaal corrompus.
- Les **salles restreintes**, débloquées en battant l'Architecte, sont des chambres fortes à usage unique : de la monnaie (Kishara's Vault), une gemme Lineage (Vault of Reverence), une rune, des Precursor Tablets, un unique, ou un établi qui détruit un objet et rend sa rune sertie. La Royal Access Chamber ouvre la voie vers Atziri.
- Les **médaillons** façonnent le plateau : celui de Juatalotli protège une salle de la déstabilisation (le plus important), celui de Quipolatl améliore une salle, d'autres relancent ou ajoutent des salles.

## Gagner de la monnaie

- Construisez une longue chaîne de salles (un « serpent ») autour des salles de rareté et de monstres, et verrouillez son extrémité avec un médaillon de Juatalotli pour que toute la chaîne survive à la déstabilisation.
- Placez tôt l'Architecte à un bon endroit, puis évitez-le, ainsi qu'Atziri, tant que le temple grandit : tous deux en effacent de grandes parties.
- Vendez ce que donnent les chambres fortes : gemmes Lineage, uniques, Tablets et Soul Cores.
- La double corruption est un pari : utilisez-la sur des objets que vous pouvez perdre, ou sur des uniques bon marché qui prennent de la valeur avec le bon résultat.

```loot
caption: "Le butin du temple, de la salle à la monnaie"
items:
  - item: "Coffres-forts"
    use: "Coffres à usage unique : monnaie, Lineage Supports, uniques, Tablets, runes"
    sell: "Vendez ce que vous n'utilisez pas"
    value: high
  - item: "Artisanat vaal"
    use: "Double corruption, Soul Cores anciennes, affixes des uniques vaal"
    sell: "Pariez sur des objets qu'on peut perdre ou des uniques bon marché"
    value: medium
  - item: "Soul Cores"
    use: "À sertir pour des modificateurs puissants"
    sell: "Vendez les plus chères"
    value: medium
  - item: "Médaillons"
    use: "Verrouiller, améliorer, relancer ou ajouter des salles"
    sell: "Gardez ceux de Juatalotli : ils protègent votre chaîne"
    value: low
```

## Stratégie de farm et arbre atlas

Le temple rapporte quand une longue chaîne de salles améliorées survit d'un run à l'autre. Les premiers nœuds vont donc aux Medallions, puisque celui de Juatalotli verrouille les salles, et à la puissance des salles, jusqu'aux salles de tier 4. Prenez ensuite le coffre d'Atziri et la duplication de la monnaie du temple, puis les salles restreintes. Les nœuds de balises ne changent que les Vaal Beacons de vos cartes : prenez-les en dernier, ou plus tôt si vous récoltez beaucoup de cristaux en carte.

Lire l'arbre : les numéros donnent l'ordre de prise des notables au fil de vos points, et le chemin doré marque les petits nœuds à prendre en route. Survolez un nœud pour son effet exact ; les keystones (cercles en pointillés) imposent de choisir une option, donnée par la flèche dans la liste. Cet ordre est notre propre lecture de l'arbre, construite autour de la stratégie ci-dessus.

```atlas
tree: Incursion
order:
  - node: Stolen Authority
    note: "35 % de Medallions en plus."
  - node: The Lost Architect
    note: "Les monstres uniques du temple peuvent lâcher le Medallion de Zantipi."
  - Training and Preparation
  - Power Relays
  - Efficient Arteries
  - Xipocado's Machinations
  - node: Transcendent Progress
    note: "Les salles peuvent monter au tier 4."
  - Bloodrite Vestments
  - node: Riches of the Empire
    note: "La monnaie du temple peut être dupliquée."
  - node: Atziri's Assets
    choice: Temple Currency
    note: "Ou un Medallion tant que vous construisez votre plateau."
  - Protected Treasures
  - Expanded Designs
  - Secrets of the Ancients
  - Royal Prerogative
  - Offerings to the Queen
  - Military Reinforcements
  - Patrolling Legions
  - Loyal Gatekeepers
```

## Les builds qui s'y prêtent

Elle convient aux builds solides qui tuent à la fois les packs et les boss : les salles améliorées renforcent les monstres partout, et l'Architecte et Atziri sont de vrais combats de boss. C'est aussi la mécanique qui demande le plus de planification.
