# Document de Conception pour l'Épreuve Finale - Développement d'une Application Android


## Objectifs du Projet

L'objectif de cette épreuve est de concevoir et de développer une application mobile native pour la plateforme Android, en respectant les spécifications techniques et fonctionnelles fournies. Ce projet sera réalisé en équipe de 3 personnes sur une période de quatre semaines, avec des séances de travail supervisées en laboratoire et des travaux à réaliser en dehors des heures de cours.

---

## Structure du Projet

Le projet se compose de plusieurs composants techniques que l'équipe devra implémenter. Ce document de conception détaille les exigences spécifiques et fournit les lignes directrices.

---

### 1. Architecture de l'Application

**Technologies obligatoires :**
- **React-Native, Expo et expo-router** pour le développement de l'application native.
- **Axios** pour la communication entre le front-end et le back-end.
- **Express.js** pour la gestion du serveur (API REST).
- **MySQL** pour la base de données.
- **JavaScript** : L’utilisation de TypeScript est interdite.
- **NativeWind** : Les styles doivent être écrits comme en classe, en utilisant NativeWind pour les styles constants et la propriété `style` pour les autres styles.

---

### 2. Composants principaux

#### 2.1 Base de données
L'application devra intégrer une base de données MySQL pour stocker les informations pertinentes. La base de données sera créée à l’aide d’un fichier **.sql**, qui comprendra la création de la base et des tables ainsi que l’insertion des données initiales. Les identifiants pour la connexion à la base de données seront : 
- Utilisateur : **root**
- Mot de passe : **abc-123**

#### 2.2 Authentification des Comptes Utilisateurs
L'application devra implémenter un système d'authentification pour garantir la sécurité des données et un accès personnalisé. Les fonctionnalités minimales à implémenter sont :
- **Connexion** par email et mot de passe.
- **Inscription** d'un nouvel utilisateur avec un formulaire de saisie des données personnelles.
- **Gestion de session** pour maintenir l'état de l'utilisateur connecté durant la navigation.
- **Récupération de mot de passe**, permettant minimalement à l'utilisateur de contacter le support en cas d'oubli.

#### 2.3 Activités de Sélection de Profils
Les utilisateurs devront pouvoir sélectionner des profils d'autres utilisateurs ou des éléments à afficher dans une liste (par exemple : profils d'utilisateurs, produits, événements). Cette fonctionnalité inclut :
- **Liste déroulante** ou **vignettes** affichant les profils disponibles.
- Option de **filtrage** des profils selon des critères (par exemple, par intérêt, par popularité, etc.).
- Lorsqu'un profil/produit est sélectionné, l'utilisateur peut accéder à des informations détaillées sur celui-ci.

#### 2.4 Affichage de Résumé et Détails
Les informations doivent être présentées sous forme résumée puis détaillée :
- **Affichage résumé** : vue condensée des informations clés (nom, image, etc.).
- **Affichage détaillé** : vue détaillée, avec des informations complètes sur l’élément sélectionné (description, images supplémentaires, etc.).

#### 2.5 Ajout d'Éléments
Les utilisateurs doivent pouvoir ajouter de nouveaux éléments à la base de données via un formulaire d'entrée. Cette fonctionnalité comprendra :
- Un formulaire permettant de saisir des informations (ex. : titre, description, image, etc.).
- Validation des données saisies avant leur envoi à la base de données.
- Options pour modifier ou supprimer des éléments existants.

---

### 3. API Côté Serveur (REST)

Un serveur back-end sera responsable de la gestion des requêtes vers la base de données via une API REST.

Le back-end sera conçu pour gérer les requêtes en toute sécurité, et les données sensibles doivent être protégées, notamment via des mécanismes de **hashage des mots de passe** et des **tokens d'authentification (JWT)**.

---

### 4. Choix des Algorithmes et Structures de Données

Les algorithmes et structures de données utilisés doivent permettre une utilisation fluide de l'application.

---

### 5. Interface Utilisateur (UI) et Design

L'interface de l'application doit être claire, ergonomique et intuitive. Voici quelques éléments à inclure :
- **Page de connexion/inscription** : un formulaire simple et accessible.
- **Liste des profils/produits/événements** : vue avec vignettes ou cartes cliquables.
- **Pages de détail** : une présentation propre des informations détaillées.
- **Formulaires d’ajout** : champs clairs et validés avant soumission.

---

### 6. Organisation du Code et Bonnes Pratiques

Le code de l'application doit suivre les bonnes pratiques de développement :
- **Séparation** : Chaque partie de code doit avoir sa place. Suivre les structures vues en classe (par exemple : `app/components/contexts/`, etc.).
- **Lisibilité** : Utiliser des noms de variables et de fonctions explicites, commenter le code de manière adéquate.
- **Gestion des erreurs** : Mettre en place un système pour repérer et gérer les erreurs (par exemple : erreurs de connexion, erreurs de validation de données).
- **Gestion de version** : Utiliser un système de contrôle de version (Git, GitHub) pour assurer un suivi du travail en équipe.

---

### 7. Empaquetage et Déploiement de l'Application

- **Format .apk** : L'application doit être empaquetée sous le format `.apk` afin de pouvoir être distribuée et installée sur des appareils Android.
- **Test de l’application** : Effectuer des tests rigoureux pour s'assurer que l'application fonctionne correctement sur différents appareils Android. Les tests d'intégration ne sont pas exigés, seuls les tests unitaires sont nécessaires.

---

### 8. Contraintes

Chaque étudiant devra réaliser 2 composantes du projet seul :
- 1 animation.
- 1 utilisation de données (du front-end jusqu'au back-end).

Au total, chaque étudiant aura donc 3 animations et 3 requêtes à réaliser, chacune devant être de nature différente.

Le projet doit également inclure :
- L'utilisation d'une fonctionnalité native de l'appareil (appareil photo, micro, etc.).
- L'intégration d'une API externe comme Google Maps ou la géolocalisation.
- Avoir au moins 2 contextes. L'un pour le thème (minimum 2 thèmes différents) et l'autre pour la raison de votre choix (doit être une raison valide).

Le code présenté en classe peut être utilisé, mais il est impératif de personnaliser le style de l'application. Il est important de faire ces ajustements pour éviter toute déduction de points (en cas de doute, vous pouvez me consulter).

---

### 9. Critères d'Évaluation

Les critères d'évaluation pour ce projet sont les suivants :
- **Respect des consignes** : Conformité aux exigences fonctionnelles et techniques décrites dans ce document.
- **Implémentation de la base de données** : Choix appropriés pour le stockage des données et leur implantation dans un serveur.
- **Qualité du code** : Organisation logique, lisibilité, et bonnes pratiques de développement.
- **Cohésion** : Efficacité et couplage entre les différentes parties de l'application. Choix appropriés des éléments graphiques.
- **Tests et validation** : Identification des erreurs, corrections, et fonctionnement global.
- **Emballage de l'application** : Préparation et distribution correcte de l'APK.

---

## Remise

- `makeBD.sql` : Script pour la création de la base de données.
- **Base de données** : La base de données devra être déployée sur le container attribué à votre équipe.
- `README.md` : Permet à un utilisateur moyen de configurer votre projet à partir d'un nouveau container comme celui dont chaque équipe disposera au début du projet. Il doit aussi contenir une description de la réalisation du projet ainsi qu'un manuel d'utilisation de l'application.
- `README_Nom.md` : Décrire le travail personnel effectué sur le projet (à remettre individuellement sur Léa).
- **Code source de l'application** : Sur GitHub. Vous devrez m'inviter dès la formation de l'équipe à joindre votre projet comme collaborateur. N'oubliez pas de ne pas commit node_modules.
- **Code source du backend** : Sur GitHub. Vous devrez m'inviter dès la formation de l'équipe à joindre votre projet comme collaborateur. N'oubliez pas de ne pas commit node_modules.
- **Document sur le travail en équipe** : À remettre individuellement (sera distribué vers la 3e semaine du projet).
- **L’application en format .apk** : À télécharger sur le container de l’équipe.
- **Rencontre de suivi** : L'équipe devra réserver avec moi une rencontre de suivi de projet dans la semaine du 9 décembre. Un plan de réalisation du projet sera exigé et noté. Ce plan doit contenir pour chaque élément du projet : Une description, un responsable, une estimation de temps requis et la date de réalisation.

*Utilisez chacun votre propre compte GitHub et assurez-vous que je sache que ce compte vous appartient en mettant, par exemple : "MFournier88:Maxime Fournier" en haut de votre README pour chaque membre de l'équipe et ce, dès le début du projet.*

**Date de remise** : 23 décembre - Joyeux Noël !