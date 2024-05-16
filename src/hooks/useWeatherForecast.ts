import { useQuery } from '@tanstack/react-query';

import axiosClient from '../configs/axiosClient';

export const useWeatherForecast = () => {
  const query = useQuery({
    queryKey: ['weather-forecast'],
    queryFn: async () => {
      const res = await axiosClient.get<ForecaseData>(`/forecast?lat=1.352083&lon=103.819839&units=metric`);
      return res.data;
    },
  });
  return query;
};
