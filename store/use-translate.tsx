import { useRiverAdminStore } from './use-riveradmin-store';

export const useTranslate = () => {
  const { translator } = useRiverAdminStore();

  return translator.translate;
};
