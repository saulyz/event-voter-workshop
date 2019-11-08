import React from 'react';
import './PageBox.css';

export default function PageBox({ children }) {
  return (
    <div className="page-box">
      <div className="page-box__content">{children}</div>
    </div>
  );
}
