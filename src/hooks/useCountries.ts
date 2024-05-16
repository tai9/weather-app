import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Country } from '../types/country';

export const useCountries = () => {
  const query = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const url = 'https://restcountries.com/v3.1';

      const res = await axios.get<Country[]>(`${url}/all?fields=name,flags,latlng,cca2`);
      return res.data;
    },
  });
  return query;
};
