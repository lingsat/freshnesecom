import React, { FC } from "react";

import { EBtnStyle } from "@/common/types/button";
import Button from "@CommonComponents/Button/Button";

import "./Modal.scss";

interface ModalProps {
  text: string;
  confirmBtnText: string;
  onModalConfirm: () => void;
  onModalCancel: () => void;
}

const Modal: FC<ModalProps> = ({
  text,
  confirmBtnText,
  onModalConfirm,
  onModalCancel,
}) => {
  const handleModalPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="modal" onClick={onModalCancel}>
      <div className="modal__block" onClick={handleModalPropagation}>
        <p>{text}</p>
        <div className="modal__buttons">
          <Button
            text={confirmBtnText}
            style={EBtnStyle.SMALL}
            onCLick={onModalConfirm}
          />
          <Button
            text="Cancel"
            style={EBtnStyle.SMALL}
            onCLick={onModalCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
