import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  elementId: string;
}

const Portal: React.FC<PortalProps> = ({ children, elementId }) => {
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.getElementById(elementId);
    if (!modalRoot) {
      console.error(`Element with id ${elementId} not found`);
      return;
    }

    const currentEl = el.current;
    modalRoot.appendChild(currentEl);

    return () => {
      modalRoot.removeChild(currentEl);
    };
  }, [elementId]);

  return createPortal(children, el.current);
};

export default Portal;
