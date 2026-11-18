---
title: "Ritual"
summary: "Des autels qui ressuscitent chaque monstre du cercle, le Tribute, les Omens et le King in the Mist : fonctionnement de Ritual, quoi acheter, comment en profiter et quels builds tiennent le mieux le cercle."
hub: "Caer Tarth et les cartes autour"
pinnacle: "Le King in the Mist, puis The Bodach"
rewards:
  - "Tribute"
  - "Omens"
  - "Uniques"
  - "Récompenses du Rite of the Nameless"
---

## Fonctionnement

Une carte Ritual contient trois ou quatre sites de Ritual. Videz les monstres dans un cercle, puis activez l'autel : le cercle se ferme et chaque monstre mort à l'intérieur revient. Tuez-les à nouveau pour gagner du **Tribute**. Le Tribute ne passe pas à la carte suivante : dépensez-le avant de partir.

```flow
caption: "Déroulé d'un site de Ritual"
steps:
  - title: "Vider le cercle"
    text: "Tuez les monstres dans l'un des trois ou quatre cercles de Ritual de la carte."
  - title: "Activer l'autel"
    text: "Le cercle se ferme et chaque monstre mort à l'intérieur revient."
  - title: "Les retuer"
    text: "Chaque monstre ressuscité rapporte du Tribute. Certains autels ajoutent des boss."
  - title: "Dépenser le Tribute"
    text: "Achetez Omens et uniques, différez, relancez ou offrez le reste au King avant de quitter la carte."
```

## Ce qu'on y gagne

Le Tribute achète des récompenses sur la page du Ritual, composée d'uniques et d'**Omens**. Les Omens restent dans votre inventaire et modifient la prochaine utilisation d'une monnaie de craft : [[Omen of Greater Exaltation]] fait ajouter deux modificateurs au prochain Orbe Exalté, [[Omen of Dextral Annulment]] fait retirer uniquement un suffixe au prochain Orb of Annulment. C'est avec eux que se craftent les objets chers.

Le Tribute se dépense de quatre façons : prendre un objet, le **différer** (payer un peu pour le réserver ; il revient moins cher dans un Ritual suivant), **relancer** la page, ou **offrir** le reste au King in the Mist. Remplir sa jauge donne An Audience with the King : trouvez le Crux of Nothingness sur l'Atlas pour l'affronter. Sa tête lance le **Rite of the Nameless** à Caer Tarth : une chaîne de cartes avec des Rituals garantis où vous choisissez une récompense par carte, monnaie comprise (des Orbes Divins, voire un [[Mageblood]] avec le bon passif d'Atlas). Chaque carte de la chaîne donne un Call of the Shadows ; cinq d'entre eux ouvrent le combat contre le boss ultime, The Bodach.

## Gagner de la monnaie

- Prenez toujours les Omens qui valent cher : [[Omen of Sinistral Annulment]], [[Omen of Dextral Annulment]], [[Omen of Sinistral Erasure]], [[Omen of Dextral Erasure]], [[Omen of Whittling]] et [[Omen of Chance]].
- Ignorez les objets bon marché sur les premières pages et relancez pour en voir davantage. Gardez 1 000 à 1 500 Tribute après votre dernière relance pour pouvoir différer un objet rare s'il apparaît.
- Ne prenez que les uniques que vous utiliserez ou vendrez : le reste du Tribute vaut plus en offrandes au King.
- An Audience with the King, la tête du King et les Call of the Shadows se vendent si vous ne voulez pas combattre.
- Le Ritual profite du nombre de monstres dans la carte : taille des packs sur les Waystones et les Tablets, Distilled Emotions, et Delirium, dont les monstres (boss compris) sont aussi ressuscités par les autels.

```loot
caption: "Le butin de Ritual, du Tribute à la monnaie"
items:
  - item: "Omens"
    use: "Modifient la prochaine utilisation d'une monnaie d'artisanat"
    sell: "Prenez toujours les chers (Annulment, Erasure, Whittling, Chance) et vendez-les"
    value: high
  - item: "Uniques de la page Ritual"
    use: "Équipement, parfois des uniques recherchés"
    sell: "Ne prenez que ce que vous utilisez ou vendez ; offrez le reste"
    value: medium
  - item: "Jauge du King : Audience, Head, Call of the Shadows"
    use: "Affronter le King, lancer le Rite of the Nameless, atteindre The Bodach"
    sell: "À vendre si vous ne voulez pas ces combats"
    value: medium
  - item: "Choix du Rite of the Nameless"
    use: "Une récompense choisie par carte, monnaie comprise"
    sell: "Prenez des Divine Orbs, ou Mageblood avec Hour of the Nameless"
    value: high
```

## Stratégie de farm et arbre atlas

Voici l'ordre de Maxroll. Commencez par les nœuds qui rendent les monstres ressuscités plus souvent magiques ou rares et qui ajoutent un boss à certains autels. Prenez ensuite la jauge du King et les nœuds du Rite of the Nameless : Hour of the Nameless permet au Rite de proposer un [[Mageblood]]. Viennent ensuite Traveller's Woe et Spreading Darkness, qui orientent les uniques, puis les nœuds de Tribute et de relance en dernier. Maxroll laisse Royal Lenience de côté. En carte, ajoutez de la taille de pack partout où vous le pouvez (Waystones, tablettes, Distilled Emotions) et lancez Delirium en parallèle, puisque les autels ressuscitent tout ce qui est mort dans le cercle.

Lire l'arbre : les numéros donnent l'ordre de prise des notables au fil de vos points, et le chemin doré marque les petits nœuds à prendre en route. Survolez un nœud pour son effet exact ; les keystones (cercles en pointillés) imposent de choisir une option, donnée par la flèche dans la liste.

```atlas
tree: Ritual
order:
  - node: Reborn in Shadow
    note: "Les monstres ressuscités sont plus souvent magiques et rares."
  - node: Bring Forth the Unseen
    note: "15 % des autels invoquent un boss de plus."
  - node: Royal Tithe
    note: "La jauge du King se remplit plus vite."
  - node: Hour of the Nameless
    note: "Le Rite of the Nameless peut proposer des uniques de valeur comme Mageblood."
  - Ongoing Chants
  - Umbral Gathering
  - node: Traveller's Woe
    choice: Tainted
    note: "Avec Spreading Darkness, les Rituals Tainted favorisent ceintures, charmes et flacons : le choix de Maxroll pour chasser Headhunter et Mageblood."
  - Spreading Darkness
  - node: Mysterious Rites
    note: "Les Queen's Rituals : plus d'Omens et une Idole spéciale."
  - From the Mists
  - node: Invigorated Sacrifices
    choice: 10% increased number of Favours
    note: "Plus d'objets au choix. Quand vous avez trop d'objets reportés à payer, passez à une option qui réduit la pénalité de Tribute."
  - Tempting Offers
  - Prayer and Pledge
  - Patient Devotion
  - Magnanimous Offerings
  - Between Two Worlds
  - Ancient Enmities
```

## Les builds qui s'y prêtent

Elle convient aux builds à gros dégâts de zone qui ont les défenses pour tenir leur position : le cercle vous enferme. Les sbires, les totems et les compétences canalisées y sont à leur aise, car rester immobile ne coûte rien.
