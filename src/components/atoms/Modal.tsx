'use client';
import React, { useId } from 'react';

export default function Modal({
  open,
  onClose,
  title,         
  children
}:{
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const titleId = useId();

  if (!open) return null;

  const onOverlayClick = () => onClose();
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className="modal-overlay"
      onClick={onOverlayClick}
      style={{
        position:'fixed', inset:0,
        background:'rgba(0,0,0,.35)',
        display:'grid', placeItems:'center', padding:'16px'
      }}
    >
      <div
        className="modal-card"
        onClick={stop}
        style={{
          background:'var(--card)',
          color:'var(--text)',
          border:'1px solid var(--border)',
          borderRadius:'16px',
          width:'min(520px, 100%)',
          boxShadow:'0 20px 60px rgba(15,23,42,.15)'
        }}
      >
        {title && (
          <div style={{padding:'14px 16px 8px', borderBottom:'1px solid var(--border)'}}>
            <h3 id={titleId} style={{margin:0, fontSize:'1.1rem'}}>{title}</h3>
          </div>
        )}

        <div style={{padding:'14px 16px'}}>
          {children}
        </div>
      </div>
    </div>
  );
}
