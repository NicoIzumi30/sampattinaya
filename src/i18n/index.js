import { useRouter } from 'next/router';
import en from './en.json';
import id from './id.json';

const messages = {
  en,
  id,
};

export const useTranslation = () => {
  const { locale } = useRouter();
  
  return {
    t: (key) => {
      const keys = key.split('.');
      let value = messages[locale || 'id'];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || key;
    },
    locale: locale || 'id',
  };
};

export default messages;
