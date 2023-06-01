import React from 'react';
import { observer } from 'mobx-react-lite';
import { ConfirmModal } from './confirm-modal';
import { useTranslate } from '../../store/use-translate';
import { HasId } from '../../model/hydra';

export interface StoreWithRemoveModal<Model> {
  isRemoveModalOpen: boolean;
  isRemoving: boolean;
  removeModel: () => void;
  askRemove: (model: Model) => void;
  closeRemoveModel: () => void;
}

type Props<Model> = {
  store: StoreWithRemoveModal<Model>;
};

export const ConfirmModalConnected = observer(<Model extends HasId>(props: Props<Model>) => {
  const { store } = props;
  const t = useTranslate();

  return (
    <ConfirmModal
      isOpen={store.isRemoveModalOpen}
      title={t('riveradmin.delete.ask')}
      body={t('riveradmin.delete.confirm')}
      cancelLabel={t('riveradmin.delete.cancel')}
      confirmLabel={t('riveradmin.delete.confirm-label')}
      onCancel={() => store.closeRemoveModel()}
      onConfirm={() => store.removeModel()}
      isLoading={store.isRemoving}
    />
  );
});
