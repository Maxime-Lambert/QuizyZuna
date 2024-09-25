# Quel est ce projet ?  
  
QuizyZuna est une application web statique en **React**. Le site propose de passer des quiz de culture générale en QCM. Les questions proviennent de l'API **QuizyZunaAPI** (<https://github.com/Maxime-Lambert/QuizyZunaAPI>).
  
Par la suite, le site proposera aux utilisateurs de créer leurs propres quiz et les personnaliser pour pouvoir les faire jouer à leurs amis ou à un public.  
  
Le nom vient de la fusion entre le mot Quiz et le mot Kizuna qui signifie “les liens entre les gens” en japonais.  
  
# Sommaire  
  
- [Quel est ce projet ?](#Quel-est-ce-projet-?)  
- [Sommaire](#sommaire)  
- [Technologies Utilisées](#Technologies-Utilisées)  
- [Objectif](#objectif)  
- [État du projet](#État-Du-Projet)
- [Comment lancer le projet en local ?](#Comment-lancer-le-projet-en-local-?)  
- [Comment essayer l'API sur Azure ?](#Comment-essayer-l'API-sur-Azure-?)  
- [Continuous Deployment](#continuous-deployment)  
- [Licence](#licence)  

# Technologies utilisées  
  
- Typescript
- React
- Redux
- MUI
  
# Objectif

L'objectif de ce projet est de mener mon projet de site web à son terme en concevant le front qui viendra se couple à l'**API** déjà réalisée. Je souhaitais me former à l'un des trois frameworks de front les plus populaires et j'ai fini par choisir **React**.

# État du projet  
  
Le site permet de régler les quiz, de jouer en solo et d'analyser ses résultats à la fin. Cela correspond à l'idée d'une première version tel que je me l'étais défini. Il y a cependant beaucoup d'améliorations à apporter, en priorité :

- Clean Code (Découper les composants en plus petits éléments réutilisables principalement)
- Testing
- Internationalisation
- Adaptation Mobile
- Ajout des pages classiques (à propos, contact, conditions générales, 404)
- Afficher les tags des questions (difficultés, thèmes)

Et des ajouts par la suite :

- Possibilité de jouer en multi avec des salles privés (et du chat)
- Meilleur tri des thèmes (+ tri par dates)
- Création de quiz personnalisés  
- Import de fichiers

# Comment lancer le projet en local ?  
  
Pour commencer, suivez ses étapes :  
  
1. Installer **Node** 18  
2. Cloner la solution  
3. Se placer dans le répertoire local de la solution et entrez la commande suivante dans un terminal  

```  
> npm start 
```  

5. Naviguer sur [http://localhost:3000](http://localhost:3000) lorsque la commande est finie d'être exécutée. Attention cependant, l'application est faite pour fonctionner avec un l'API déployée à l'aide de Docker et il n'y a pas de questions de base.

# Continuous Deployment  
  
L'application est déployée automatiquement sur **Azure Static Web Apps** à l'adresse

```
https://brave-coast-0cc72c303.5.azurestaticapps.net/
```

# Licence

Ce projet est sous licence MIT.
