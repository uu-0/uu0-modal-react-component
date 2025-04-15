import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

//---------- styles ----------

//fond semi-transparent qui recouvre toute la fenêtre
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
`

//bloc principal de la modale
const Container = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transform: ${({ $isVisible }) =>
    $isVisible ? 'translateY(0)' : 'translateY(-20px)'};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 0.3s ease;
`

//en-tête de la modale
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

//titre de la modale (personnalisation couleur si erreur)
const Title = styled.h2`
  font-size: 22px;
  color: ${({ $isError }) => ($isError ? '#e53935' : '#1565c0')};
`

//bouton close de la modale
const CloseButton = styled.button`
  margin-top: -15px;
  background: none;
  border: none;
  color: #1565c0;
  font-size: 40px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #ff4f01;
  }
`
//contenu de la modale
const ModalBody = styled.div`
  padding: 20px 0;
  font-size: 17px;
  color: black;
`


//---------- composant principal ----------

export default function Modal({
  isOpen,         //affichage conditionnel
  onClose,        //fonction pour fermer la modale
  title,          //titre personnalisé
  text,           //contenu personnalisé
  isError= false, //gère le type de modale (succès, erreur)
  escapeClose = true, //autorisation fermeture escape
  clickClose = true   //autorisation fermeture en cliquant en dehors
}) {
  const [isVisible, setIsVisible] = useState(false) //animations
  const overlayRef = useRef() //référence persistante pour l'élément 'Overlay'

  //animation de la modale
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' //empêche scroll arrière-plan
      setTimeout(() => setIsVisible(true), 10) //déclenche les transitions
    } else {
      setIsVisible(false)
      document.body.style.overflow = '' //réactive scroll
    }
  }, [isOpen])

  //fermeture de la modale avec touche 'escape'
  useEffect(() => {
    if (!isOpen || !escapeClose) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, escapeClose, onClose])

  //fermeture de la modale sur l’overlay
  const handleClickOutside = (e) => {
    if (clickClose && e.target === overlayRef.current) {
      onClose()
    }
  }

  //si la modale est fermée, ne pas l'afficher
  if (!isOpen) return null

  //rendu via 'Portal' pour sortir du DOM normal
  return ReactDOM.createPortal(
    <Overlay
      ref={overlayRef}
      onClick={handleClickOutside}
      $isVisible={isVisible}
    >
      <Container $isVisible={isVisible}>
        <Header>
          <Title $isError={isError}>{title}</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <ModalBody>{text}</ModalBody>
      </Container>
    </Overlay>,
    document.getElementById('portal') //élément DOM cible du portal
  )
}
