---
title: "Breach"
summary: "Des vagues de Hiveborn contre la montre, des Catalysts et l'arbre Genesis : fonctionnement de Breach, ce qu'elle rapporte, comment en tirer de la monnaie et quels builds la farment le mieux."
hub: "Monastère des Keepers of the Flame, au sud de l'Atlas"
pinnacle: "Xesht, We That Are One (Breach Splinters) ; les Breachlords Tul et Esh (Breachstones)"
rewards:
  - "Catalysts"
  - "Anneaux de Breach"
  - "Hiveblood et Wombgifts"
  - "Breach Splinters"
  - "Gemmes Lineage Support"
---

## Fonctionnement

Marchez sur une main de Breach dans une carte pour ouvrir une Breach instable : les Hiveborn affluent par vagues, et en tuer assez avant la fin du minuteur la stabilise. Un groupe de monstres rares, parfois les Marshals of Xesht, doit ensuite mourir pour la refermer, et lâche un gros tas de butin. Les **Hives** sont une variante où vous défendez Ailith pendant qu'elle referme la Breach (traversez d'abord les murs autour d'elle pour les briser). Le centre de la mécanique est le monastère des Keepers of the Flame, au sud de l'Atlas.

```flow
caption: "Déroulé d'une Breach"
steps:
  - title: "Ouvrir la main"
    text: "Marchez sur une main de Breach dans une carte : la Breach s'ouvre et un minuteur démarre."
  - title: "Tuer les vagues"
    text: "Les Hiveborn arrivent de tous les côtés. Tuez-en assez avant la fin du minuteur."
  - title: "Stabiliser"
    text: "La Breach se stabilise et un groupe de rares apparaît, parfois les Marshals de Xesht."
  - title: "Tuer les rares"
    text: "Les tuer referme la Breach et lâche une grosse pile de butin."
  - title: "Faire éclore à l'arbre Genesis"
    text: "Dépensez le Hiveblood en Wombgifts pour des bijoux ou de la monnaie."
```

## Ce qu'on y gagne

- Les **Catalyseurs** augmentent la qualité des anneaux et amulettes, ce qui renforce leurs modificateurs du type correspondant : catalyser un anneau de vie donne plus de vie. Les anneaux Breach montent jusqu'à 40 % de qualité au lieu de 20 %. Ce patch ajoute aussi des Catalyseurs de joyaux (Ruby pour le feu, Quartz pour les sorts, Tourmaline pour les attributs, Mephrite pour la défense).
- **Hiveblood et Wombgifts** se dépensent à l'**arbre Genesis** : le Hiveblood fait éclore les Wombgifts en anneaux, amulettes, ceintures ou monnaie. Les points de l'arbre orientent ce qui éclot : le type de modificateur (sbires, sorts…), un niveau minimum de modificateur, ou le type de base, y compris des bases introuvables ailleurs (Lament, Portent et Absent) avec des implicites comme des résistances élémentaires maximales ou un pourcentage de vie maximale sur les anneaux.
- Les **Breach Splinters** ouvrent le Realmgate vers le boss ultime Xesht, qui peut lâcher [[Skin of the Loyal]], [[Xoph's Blood]], [[Choir of the Storm]], [[The Pandemonius]], [[Hand of Wisdom and Action]] et [[Beyond Reach]]. Les **Breachstones**, qu'on fait éclore à l'arbre Genesis, révèlent sur l'Atlas un Breach Domain avec les Breachlords Tul et Esh dans sa forteresse.
- Des **gemmes de soutien Lineage** comme [[Xoph's Pyre]], [[Tul's Stillness]] et [[Esh's Radiance]].

## Gagner de la monnaie

- Vendez les Catalyseurs en lot sur le Currency Exchange : chaque Breach en donne plusieurs et les crafteurs en ont toujours besoin.
- Les Breach Splinters et Breachstones se vendent aux joueurs qui farment les boss. Si vous n'affrontez pas Xesht, vendez-les au fur et à mesure.
- Utilisez l'arbre Genesis pour viser les bijoux recherchés (anneaux de sbires ou de sorts, bases exclusives) et vendez les bons tirages. Catalyser un bon anneau avant de le mettre en vente augmente son prix.
- Les gemmes Lineage et les uniques de Xesht sont les gros lots.

```loot
caption: "Le butin de Breach, du drop à la monnaie"
items:
  - item: "Catalysts"
    use: "Qualité des anneaux et amulettes ; 40 % sur les anneaux de Breach"
    sell: "Vente en gros au Currency Exchange"
    value: medium
  - item: "Hiveblood et Wombgifts"
    use: "Faire éclore bijoux ou monnaie à l'arbre Genesis"
    sell: "Les Lavish Wombgifts donnent de la monnaie ; vendez les bons bijoux"
    value: medium
  - item: "Breach Splinters et Breachstones"
    use: "Ouvrir le Realmgate de Xesht et les domaines des Breachlords"
    sell: "À vendre aux tueurs de boss si vous ne les affrontez pas"
    value: medium
  - item: "Lineage Supports et uniques de Xesht"
    use: "Gemmes et uniques qui définissent un build"
    sell: "Les gros lots : vente sur le site d'échange"
    value: high
```

## Stratégie de farm et arbre atlas

Breach rapporte surtout par ses rares : prenez d'abord les nœuds qui ajoutent des rares et gardent les Breaches ouvertes plus longtemps. Faites ensuite de l'arbre Genesis une source de monnaie : réglez Breeding Program sur les Lavish Wombgifts, qui donnent de la monnaie à l'éclosion, et mettez les points Genesis supplémentaires dans la matrice Currency. Les nœuds de Vruun viennent après, pour le jackpot des Lineage Supports. Gardez les nœuds de Hive pour la fin, sauf si vous jouez sbires ou totems : ils se plaisent à défendre Ailith depuis une position fixe.

Lire l'arbre : les numéros donnent l'ordre de prise des notables au fil de vos points, et le chemin doré marque les petits nœuds à prendre en route. Survolez un nœud pour son effet exact ; les keystones (cercles en pointillés) imposent de choisir une option, donnée par la flèche dans la liste. Cet ordre est notre propre lecture de l'arbre, construite autour de la stratégie ci-dessus.

```atlas
tree: Breach
order:
  - node: Breeding Program
    choice: Lavish Wombgifts
    note: "Les Lavish Wombgifts donnent de la monnaie. Si vous craftez des bijoux, prenez plutôt les Signet (anneaux), Ornate (amulettes) ou Banded (ceintures)."
  - node: Moment of Risk
    note: "Deux rares de plus par Breach, et les Wombgifts peuvent tomber un niveau plus haut."
  - node: Shape the Chains
    choice: 15% increased Pack Size
    note: "Pour les builds de nettoyage. Ceux qui font fondre les rares peuvent prendre l'autre option : des rares plus coriaces et plus rentables, dans des packs plus petits."
  - node: Reality Wound
    note: "Dix secondes de plus pour tuer avant que la Breach ne se referme."
  - Diverse Control
  - node: Growing Wealth
    note: "Cinq points de plus dans la matrice Currency, qui va avec les Lavish Wombgifts."
  - node: Frantic Invasion
    note: "Vruun, Marshal of Xesht, apparaît deux fois plus souvent."
  - node: Study the Chains
    note: "Vruun lâche plus souvent des Lineage Supports : le jackpot."
  - Flesh Flower
  - Essence Transference
  - Exquisite Design
  - Swelling Hives
  - Provoke the Swarm
  - node: Sole Purpose
    choice: 50% increased number of skills created
    note: "Plus de compétences d'Ailith, c'est plus de monstres à tuer. Prenez l'option de dégâts si les Hives vous posent problème."
  - Reactive Hiveseeding
  - node: Tear Open the Rift
    choice: Add a Modifier to one revealed Map
    note: "L'autre option coûte une Breachstone de plus à chaque fois."
```

## Les builds qui s'y prêtent

Elle convient aux builds au nettoyage rapide et large, capables de suivre des essaims qui arrivent de tous les côtés. Les builds de sbires et de totems brillent dans les Hives, où l'on combat depuis un point fixe.
