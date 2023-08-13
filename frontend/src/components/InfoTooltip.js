import React from 'react';

function InfoToolTip({ isOpen, onClose, isSuccessInfoTooltipStatus, title }) {
  return (
    <section className={`popup  ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <div
          className={`popup__image ${
            isSuccessInfoTooltipStatus
              ? 'popup__image_type_success'
              : 'popup__image_type_fail'
          }`}
        />
        <p className="popup__notification">{title}</p>
      </div>
    </section>
  );
}

export default InfoToolTip;
