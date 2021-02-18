import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

type Props = {
  isOpen: boolean;
  title: React.ReactNode;
  body: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel: React.ReactNode;
  cancelLabel: React.ReactNode;
  isLoading?: boolean;
};

export const ConfirmModal = observer((props: Props) => {
  const { body, title, isOpen, onCancel, cancelLabel, confirmLabel, isLoading, onConfirm } = props;

  return (
    <Modal show={isOpen} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{body}</Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" disabled={isLoading} onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="danger" disabled={isLoading} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
