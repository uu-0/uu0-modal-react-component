# Modal React Component

![GitHub](https://img.shields.io/github/repo-size/uu-0/react-modal-uu0)

lien du package sur npm [react-modal-components-uu0](https://www.npmjs.com/package/react-modal-component-uu0) 

## Description
Ce package fournit un composant de modale en React. La modale permet d'afficher un contenu modal avec des options de personnalisation, telles que le titre, le texte, et le comportement de fermeture. Ce composant utilise `ReactDOM.createPortal` pour rendre la modale en dehors du flux DOM normal.

### Fonctionnalités
- **Affichage conditionnel via la prop `isOpen`** : Le composant affiche la modale uniquement lorsque la prop `isOpen` est vraie. Sinon, elle reste cachée.
- **Overlay foncé en fond** : Un fond semi-transparent est ajouté derrière la modale pour la distinguer du reste de l'interface utilisateur.
- **Contenu centré à l'écran** : La modale est automatiquement centrée sur l'écran.
- **Titre personnalisable via la prop `title`** : Le titre de la modale peut être personnalisé selon les besoins.
- **Contenu personnalisable via la prop `text`** : Le contenu à afficher dans la modale peut être ajusté.
- **Bouton de fermeture (`&times;`) avec la fonction `onClose`** : Un bouton de fermeture est présent pour permettre à l'utilisateur de fermer la modale.
- **Rendu via `ReactDOM.createPortal`** : Utilisation de `ReactDOM.createPortal` pour rendre la modale dans un conteneur DOM spécifique en dehors du flux DOM normal.
- **Fermeture au clic sur l'overlay** : La modale se ferme lorsque l'utilisateur clique sur l'overlay.
- **Fermeture via la touche Escape** : Si la prop `escapeClose` est activée, la modale se ferme lorsque l'utilisateur appuie sur la touche "Escape".
- **Animation d’apparition et disparition** : La modale s'affiche et se cache avec une animation fluide grâce aux propriétés CSS `opacity` et `transform`.
- **Blocage du scroll arrière-plan** : Lorsque la modale est ouverte, le défilement de la page est désactivé afin d'éviter que l'utilisateur ne puisse interagir avec le contenu en arrière-plan.

### Détails des props

- **`isOpen`** (booléen) :  
  Cette prop détermine si la modale doit être visible ou non. Lorsque `isOpen` est `true`, la modale est affichée. Si elle est `false`, la modale est cachée.

- **`onClose`** (fonction) :  
  Cette fonction est appelée lorsque la modale doit être fermée, que ce soit par un clic sur le bouton de fermeture ou un clic sur l'overlay. C'est une prop obligatoire pour gérer l'état de fermeture de la modale.

- **`title`** (chaîne de caractères) :  
  Cette prop définit le titre qui apparaît en haut de la modale. Elle est personnalisable.

- **`text`** (chaîne de caractères ou JSX) :  
  Cette prop définit le contenu de la modale. Elle peut être une chaîne de caractères simple ou du JSX pour un contenu plus complexe.

- **`escapeClose`** (booléen, valeur par défaut : `true`) :  
  Si activée (`true`), la modale se fermera lorsque l'utilisateur appuie sur la touche Escape. Si désactivée (`false`), cette fonctionnalité est désactivée.

- **`clickClose`** (booléen, valeur par défaut : `true`) :  
  Si activée (`true`), la modale se fermera lorsque l'utilisateur clique sur l'overlay (l'arrière-plan semi-transparent). Si désactivée (`false`), cette fonctionnalité est désactivée.

- **`isError`** (booléen, valeur par défaut : `false`) :
  Cette prop permet de personnaliser l'apparence du titre de la modale. Si isError est true, le titre sera affiché en rouge pour indiquer une erreur. Sinon, il sera en bleu par défaut.

## Utilisation

### Installation
Installe le composant en utilisant `yarn` ou `npm` :
```bash
yarn add react-modal-uu0
# ou
npm install react-modal-uu0
```
### Exemple d'utilisation
Voici un exemple d'utilisation du composant Modal dans un projet React.

dans app.js
```jsx
import React, { useState } from 'react'
import Modal from 'react-modal-uu0'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  //fonction pour ouvrir la modale
  function openModal(){
    setIsModalOpen(true)
  }
  

  //fonction pour fermer la modale
  function closeModal(){
    setIsModalOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>ouvrir la modale</button>
      
      <Modal
        isOpen={isModalOpen}  //affiche la modale si true
        onClose={closeModal}  //fonction pour fermer la modale
        title="titre personnalisé"  //titre de la modale
        text="contenu personnalisé de la modale."  //contenu affiché dans la modale
        escapeClose={true}  //permet la fermeture via la touche Escape
        clickClose={true}   //permet la fermeture en cliquant sur l'overlay
      />
    </div>
  )
}

export default App
```
dans index.html
```html
<body>
    <div id="portal"></div>
</body>
```

### Fonctionnalités non ajoutées
Certaines fonctionnalités jQuery du plugin original n'ont pas été converties en raison de la spécification du projet qui demande de se concentrer uniquement sur les aspects UI du plugin.

1. **Chargement de contenu AJAX** :
   - **Pourquoi non converti ?** : Le chargement de contenu AJAX fait référence à la récupération de données depuis un serveur, ce qui relève de la logique de gestion des données. Cette fonctionnalité est donc laissée de côté pour cette conversion.

2. **Stack de modales multiples (modals.push)** :
   - **Pourquoi non converti ?** : La gestion de plusieurs modales empilées n'est pas incluse par défaut. Ce comportement peut être ajouté si nécessaire, mais il n'est pas requis pour un cas d'utilisation de base. En React, la gestion d'un tel comportement se fait généralement au niveau de l'état global ou d'un gestionnaire de modales. Cette fonctionnalité est donc non incluse pour garder le composant simple et réutilisable.

3. **Événements personnalisés (modal:open, modal:close, etc.)** :
   - **Pourquoi non converti ?** : En React, les événements sont gérés de manière déclarative via des props et des callbacks (comme `onClose`). L'utilisation d'événements personnalisés comme `modal:open` et `modal:close` n'est pas nécessaire, car React privilégie l'approche unidirectionnelle des données et les callbacks. Cela simplifie l'intégration et le contrôle de la modale dans les composants parents.

4. **Ajout automatique de bouton Close** :
   - **Pourquoi non converti ?** : En React, l'approche consiste à expliciter les composants. Le bouton de fermeture est ici un composant séparé, ce qui permet de mieux contrôler son comportement, son style et son placement. La modale n'ajoute donc pas un bouton de fermeture automatiquement comme en jQuery. Cela permet à l'utilisateur de personnaliser la modale selon ses besoins spécifiques.