import { useQuery } from '@tanstack/react-query';

import axiosClient from '../configs/axiosClient';

export const useCurrentWeather = () => {
  const query = useQuery({
    queryKey: ['current-weather'],
    queryFn: async () => {
      const res = await axiosClient.get<WeatherData>(`/weather?lat=1.352083&lon=103.819839&units=metric`);
      return res.data;
    },
  });
  return query;
};
