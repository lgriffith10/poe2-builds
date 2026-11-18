---
title: "Abyss"
summary: "Fissures, Abyssal Pits et os de désacralisation : fonctionnement d'Abyss, à quoi sert son butin, comment en profiter et quels builds vident les hordes et tuent les rares abyssaux."
hub: "Le Well of Souls, à l'est de l'Atlas, et les fissures qui en partent"
pinnacle: "Les boss Lightless, puis le Vessel of Kulemak"
rewards:
  - "Os de désacralisation"
  - "Omens d'Abyss"
  - "Abyssal Troves"
  - "Dark Domains"
---

## Fonctionnement

Des fissures vertes dans une carte mènent à un grand Abyssal Pit. Tuez des monstres près des fissures pour les refermer ; chacune fait apparaître des monstres abyssaux selon ce que vous avez tué (normaux, magiques, rares qui gardent leurs modificateurs et peuvent gagner des modificateurs abyssaux mortels, Rogue Exiles qui deviennent Lichborn, boss qui invoquent une énorme créature). Une fois toutes les fissures refermées, le puits s'ouvre ; videz-le et un **Abyssal Trove** surgit avec beaucoup de butin. Sur l'Atlas, des failles partent du Well of Souls à l'est : ces cartes donnent des points d'Atlas Abyss et se terminent par des Abyssal Depths avec l'un des boss Lightless.

```flow
caption: "Déroulé d'un Abyss"
steps:
  - title: "Refermer les fissures"
    text: "Tuez des monstres près des fissures vertes ; chaque fissure fermée fait apparaître des monstres abyssaux."
  - title: "Affronter les abyssaux"
    text: "Les rares gardent leurs modificateurs et peuvent gagner des modificateurs abyssaux mortels ; les exilés deviennent Lichborn."
  - title: "Ouvrir le puits"
    text: "Une fois toutes les fissures fermées, l'Abyssal Pit s'ouvre. Videz-le."
  - title: "Piller le Trove"
    text: "Un Abyssal Trove surgit avec une grande quantité de butin."
  - title: "Suivre les fissures"
    text: "Les puits scellés peuvent révéler des Dark Domains ; les fissures du Well of Souls mènent aux Lightless."
```

## Ce qu'on y gagne

- Les **os** ([[Gnawed Jawbone]], [[Ancient Jawbone]] et les versions côte et clavicule) **désacralisent** un objet : ils ajoutent un modificateur caché que vous révélez au Well of Souls en choisissant parmi trois. C'est un moyen contrôlé d'ajouter un modificateur fort à un objet presque terminé.
- Les **Omens de l'Abyss** orientent la désacralisation : [[Omen of Abyssal Echoes]] relance les trois choix, [[Omen of Light]] retire un modificateur désacralisé pour réessayer, [[Omen of Sinistral Necromancy]] et [[Omen of Dextral Necromancy]] forcent un préfixe ou un suffixe, et les Omens de faction forcent les modificateurs que seule la désacralisation peut ajouter.
- Refermer un puits peut révéler un **Dark Domain** : une Abyssal City où chaque rare porte des modificateurs abyssaux, avec des gemmes Lineage exclusives comme [[Kurgal's Leash]], des Omens of Abyssal Echoes et des objets à sertir. D'autres domaines abritent les Abyssal Commanders, qui lâchent des uniques comme [[Darkness Enthroned]] et [[Undying Hate]], et la Kulemak's Invitation pour le combat ultime contre le Vessel of Kulemak.

## Gagner de la monnaie

- Vendez les os en lot : quiconque crafte de l'équipement d'endgame en a besoin.
- Vendez les Omens, surtout les Omens of Abyssal Echoes : les joueurs en utilisent sur chaque désacralisation coûteuse.
- Désacralisez vous-même de bonnes bases et vendez le résultat quand vous obtenez un modificateur fort.
- Les exilés Lichborn lâchent le joyau recherché Heart of the Well ; la Kulemak's Invitation se vend aux chasseurs de boss.

```loot
caption: "Le butin d'Abyss, du drop à la monnaie"
items:
  - item: "Os (mâchoires, côtes, clavicules)"
    use: "Désacraliser un objet : révéler un modificateur caché parmi trois au Well of Souls"
    sell: "Vente en gros : tous les crafteurs d'endgame en ont besoin"
    value: high
  - item: "Omens d'Abyss"
    use: "Orienter la désacralisation (relancer les choix, forcer préfixe ou suffixe)"
    sell: "Les Omens of Abyssal Echoes se vendent à chaque désacralisation chère"
    value: high
  - item: "Récompenses des Dark Domains"
    use: "Lineage Supports, objets à sertir, uniques des Commanders"
    sell: "Vendez les Lineage Supports et les uniques"
    value: high
  - item: "Drops des Lichborn et Kulemak's Invitation"
    use: "Joyaux Heart of the Well ; le combat pinnacle"
    sell: "À vendre aux acheteurs de joyaux et aux tueurs de boss"
    value: medium
```

## Stratégie de farm et arbre atlas

Abyss rapporte par le volume et par les rares aux modificateurs abyssaux. Commencez par les nœuds de puits (plus de puits par Abyss), puis Lord of the Pit pour des Abyss supplémentaires et Sprawling Rupture pour plus de monstres. Unholy Influence et Armaments of Evil rendent les rares abyssaux plus mortels et plus rentables : prenez-les quand votre build les encaisse. La branche de Rotting Bones oriente le butin : os Ancient, Omens et coffres de monnaie d'Ulaman. Les nœuds d'Abyssal Depths et d'Overrun viennent en dernier. En carte, suivez d'abord les failles qui partent du Well of Souls, puisque ces cartes rapportent vos points Abyss.

Lire l'arbre : les numéros donnent l'ordre de prise des notables au fil de vos points, et le chemin doré marque les petits nœuds à prendre en route. Survolez un nœud pour son effet exact ; les keystones (cercles en pointillés) imposent de choisir une option, donnée par la flèche dans la liste. Cet ordre est notre propre lecture de l'arbre, construite autour de la stratégie ci-dessus.

```atlas
tree: Abyss
order:
  - node: From Below
    note: "Un puits de plus par Abyss."
  - node: Dark Depths
    note: "Des chances d'avoir deux à quatre puits en plus."
  - node: Ghastly Relics
    note: "Les grands coffres abyssaux deviennent des Abyssal Strongboxes."
  - node: Lord of the Pit
    choice: Abysses have a 20% chance to contain an additional Abyss
    note: "L'option qui renforce les monstres abyssaux à chaque puits fermé convient aux builds qui tuent tout."
  - node: Sprawling Rupture
    note: "25 % de monstres en plus."
  - node: Unholy Influence
    note: "Deux fois plus de modificateurs abyssaux et Lichborn : plus de danger, meilleur butin."
  - Armaments of Evil
  - node: Strange Aversions
    note: "Des coffres par faction : Ulaman peut avoir des coffres de monnaie."
  - node: Rotting Bones
    note: "Plus d'os Ancient, ceux qui valent cher."
  - node: Vile Treasures
    choice: Omens
    note: "Les Omens of Abyssal Echoes se vendent à chaque désacralisation coûteuse. Les Lineage Supports sont l'option jackpot."
  - node: Balance of Power
    choice: Ulaman
    note: "Avec Strange Aversions, les Abyss d'Ulaman peuvent contenir des coffres de monnaie."
  - Abyssal Ire
  - Close to the Surface
  - Stir the Swarm
  - Endless War
  - Dark Bloodlines
  - Shadow of Undeath
  - Blessing of the Source
```

## Les builds qui s'y prêtent

Elle convient aux builds au nettoyage rapide qui tuent aussi vite les rares : les puits sont des hordes de monstres, mais l'argent est dans les rares à modificateurs abyssaux.
