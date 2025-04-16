import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

//---------- styles ----------

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

const Container = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  min-height: 200px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transform: ${({ $isVisible }) =>
    $isVisible ? 'translateY(0)' : 'translateY(-20px)'};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 0.3s ease;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h2`
  font-size: 20px;
  color: ${({ $isError }) => ($isError ? '#e53935' : '#1565c0')};
`

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

const ModalBody = styled.div`
  padding: 20px 0;
  font-size: 14px;
  color: black;
`

//---------- composant principal ----------

export default function Modal({
  isOpen,
  onClose,
  title,
  text,
  isError = false,
  escapeClose = true,
  clickClose = true
}) {
  const [isVisible, setIsVisible] = useState(false)
  const overlayRef = useRef()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !escapeClose) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, escapeClose, onClose])

  const handleClickOutside = (e) => {
    if (clickClose && e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return ReactDOM.createPortal(
    React.createElement(
      Overlay,
      { ref: overlayRef, onClick: handleClickOutside, $isVisible: isVisible },
      React.createElement(
        Container,
        { $isVisible: isVisible },
        React.createElement(
          Header,
          null,
          React.createElement(
            Title,
            { $isError: isError },
            title
          ),
          React.createElement(
            CloseButton,
            { onClick: onClose },
            '×'
          )
        ),
        React.createElement(
          ModalBody,
          null,
          text
        )
      )
    ),
    document.getElementById('portal')
  )
}
