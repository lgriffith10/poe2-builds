---
title: "Stratégie de craft : protéger les bons mods et lire les pourcentages"
summary: "Pourquoi le craft paraît aléatoire, comment s'assurer qu'un bon modificateur ne sera jamais retiré, et ce que veulent vraiment dire les pourcentages du simulateur de craft."
---

Ce guide fait suite aux [bases du craft](/guides/crafting-basics). Il répond à deux questions : *comment ne plus perdre les bonnes statistiques déjà obtenues ?* et *que signifient les pourcentages du [simulateur de craft](/craft) ?*

> **En bref.** Chaque monnaie **ajoute** un modificateur au hasard ou en **retire** un. Vous ne choisissez pas ce qui est ajouté, mais vous pouvez contrôler *où* il peut arriver et *ce qui* peut être retiré. Sécuriser une statistique, c'est s'assurer qu'aucune monnaie utilisée ne peut la toucher.

## L'idée clé : deux côtés

Chaque modificateur est un **préfixe** ou un **suffixe**, et un rare en porte au plus **3 de chaque**. Cette séparation est votre principal outil :

- Un omen peut forcer un Exalted Orb à n'ajouter **qu'un** préfixe ou **qu'un** suffixe.
- Un omen peut forcer un Chaos Orb ou un Orb of Annulment à ne retirer **qu'un** préfixe ou **qu'un** suffixe.
- Si un côté est plein, une monnaie qui ajoute un modificateur **ne peut** l'ajouter que de l'autre côté.

Donc quand tous vos bons modificateurs sont des suffixes, toute action qui ne touche que les préfixes est **sans danger** pour eux.

## Ce que chaque monnaie met en jeu

| Monnaie | Ajoute | Retire | Risque pour ce que vous avez |
| --- | --- | --- | --- |
| Transmutation, Augmentation, Regal, Exalted | 1 mod au hasard | rien | **Aucun.** Seul le nouveau mod est aléatoire |
| Greater Essence | 1 mod garanti | rien | **Aucun** |
| Profanation sur un objet avec une place libre | 1 mod, au choix parmi 3 | rien | **Aucun** |
| Chaos Orb | 1 mod au hasard | 1 mod au hasard | **Élevé** sans omen |
| Orb of Annulment | rien | 1 mod au hasard | **Élevé** sans omen |
| Perfect Essence | 1 mod garanti | 1 mod au hasard | **Moyen** (voir plus bas) |
| Profanation sur un objet plein | 1 mod, au choix parmi 3 | 1 mod au hasard | **Moyen** |
| Vaal Orb | — | peut relancer la moitié des mods | **Très élevé** : seulement sur un objet terminé |

> **Règle simple.** Utilisez d'abord les monnaies sans risque, tant que l'objet a des places libres. Ne passez au retrait que quand l'objet est plein et qu'un modificateur est clairement mauvais, et toujours avec un omen qui l'éloigne de votre bon côté.

## Quatre façons de sécuriser un modificateur

### 1. L'avoir avant toute action risquée

Le modificateur le plus difficile (vitesse de déplacement sur des bottes, un très bon jet de vie) doit déjà être sur la base de départ. Acheter un objet magique qui l'a coûte bien moins cher que de tenter de l'obtenir ensuite.

### 2. Le garantir avec une essence

Une **Greater Essence** transforme un objet magique en rare et ajoute un modificateur précis : aucun hasard. La limite : un objet ne porte **qu'un seul** modificateur fabriqué.

### 3. Ne retirer que du mauvais côté

Si le mauvais modificateur est un préfixe et que tous vos suffixes sont bons, utilisez un Chaos Orb ou un Orb of Annulment avec l'omen **Sinistral** (préfixes uniquement). Vos suffixes sont intouchables. Les omens **Dextral** font la même chose pour les suffixes.

L'**Omen of Whittling** va plus loin : le Chaos Orb retire le modificateur dont le **niveau requis est le plus bas**. Quand votre mauvais modificateur est un petit jet de bas niveau, c'est un retrait garanti.

```items
flow: true
cards:
  - base: Sleek Boots
    rarity: rare
    step: "Avant : un préfixe faible"
    mods: [30% increased Movement Speed, +131 to maximum Life, +18 to maximum Mana, +38% to Fire Resistance, +33% to Cold Resistance, +23 to Dexterity]
    bad: [2]
    note: "Le jet de mana est de niveau 6, bien en dessous des autres : Whittling le choisira."
  - base: Sleek Boots
    rarity: rare
    step: "Chaos Orb + Omen of Whittling"
    mods: [30% increased Movement Speed, +131 to maximum Life, 31% increased Evasion Rating, +38% to Fire Resistance, +33% to Cold Resistance, +23 to Dexterity]
    mark: [2]
    note: "Le mana part à coup sûr. Les suffixes étaient pleins : le nouveau mod devait être un préfixe."
```

### 4. Utiliser la règle des côtés avec les Perfect Essences

Une **Perfect Essence** retire un modificateur et ajoute le sien. Sur un objet plein, le modificateur retiré doit venir du **même côté** que celui de l'essence, puisque c'est la seule façon de faire de la place. Sur des bottes avec trois excellents suffixes, une essence de vitesse de déplacement (un préfixe) ne peut retirer qu'un préfixe.

## La profanation : sûre ou pas ?

La profanation ajoute un modificateur caché, révélé au Well of Souls sous la forme d'un **choix entre trois**. Sur un objet avec une place libre, elle ne retire rien : c'est l'une des façons les plus sûres de finir un rare. Sur un objet **plein**, elle retire d'abord un modificateur au hasard : ne le faites que si l'objet vaut la peine d'être sauvé. Un objet ne peut avoir qu'un seul modificateur profané.

## Lire les pourcentages du simulateur

Chaque suggestion du [simulateur](/craft) affiche deux nombres :

- **Chance d'ajouter un modificateur voulu** : sur 800 essais simulés de cette action, combien de fois l'objet a fini avec un modificateur voulu de plus.
- **Risque d'en perdre un déjà présent** : combien de fois l'action a retiré un modificateur voulu que l'objet avait déjà. Un Chaos Orb sur six modificateurs dont deux voulus a un risque de 2 sur 6 (33 %) ; avec le bon omen, il peut tomber à 0 %.

### D'où viennent les chiffres

Pour une action qui ajoute un modificateur, la chance vaut simplement :

> **(paliers possibles des modificateurs voulus) ÷ (tous les paliers possibles)**

« Possible » veut dire : autorisé sur cette base, au niveau d'objet ou en dessous, pas dans un groupe déjà présent sur l'objet, d'un côté qui a une place libre, et au niveau minimum de la monnaie ou au-dessus (44 pour Greater, 70 pour Perfect).

Exemple avec des Sleek Boots magiques (niveau d'objet 82) qui ont déjà vitesse de déplacement et résistance au feu, en visant vie ou résistance au froid avec une Regal Orb :

| Monnaie | Paliers possibles | Paliers vie ou froid | Chance |
| --- | --- | --- | --- |
| Regal Orb | 115 | 17 | ≈ 15 % |
| Greater Regal Orb | 51 | 7 | ≈ 14 % |
| Perfect Regal Orb | 12 | 2 | ≈ 17 % |

Les orbes Greater et Perfect changent à peine la chance d'obtenir **quel** modificateur ; elles changent **sa qualité** quand il tombe. Utilisez-les quand la valeur du jet compte.

### Pourquoi ce sont des estimations

Le jeu donne à chaque palier de modificateur un **poids** caché : les paliers courants sortent bien plus souvent que les meilleurs. Ces poids ne sont pas publics, donc le simulateur compte chaque palier possible comme également probable. Deux conséquences :

- La vraie chance d'un **meilleur palier** est plus faible qu'affiché.
- Les modificateurs qui ont beaucoup de paliers (la vie en a neuf sur des bottes) paraissent un peu plus probables qu'en réalité.

Servez-vous des pourcentages pour **comparer** les actions (une essence garantie bat une regal à 15 %, un risque de 0 % bat un risque de 33 %), pas comme des promesses exactes.

## La checklist avant chaque clic

1. **Que peut retirer cette monnaie ?** Si la réponse inclut un modificateur voulu, ajoutez un omen ou changez de monnaie.
2. **Où peut arriver le nouveau modificateur ?** Comptez les préfixes et suffixes libres.
3. **Existe-t-il une option garantie ?** Une essence ou un choix de profanation bat un tirage au hasard.
4. **L'objet vaut-il la monnaie ?** Sur une base bon marché, il est souvent plus rapide d'acheter un meilleur objet de départ que d'en réparer un mauvais.
