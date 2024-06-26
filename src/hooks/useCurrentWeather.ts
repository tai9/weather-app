import { useQuery } from '@tanstack/react-query';

import axiosClient from '../configs/axiosClient';
import { Coordinates, WeatherData } from '../types/weather';

export const useCurrentWeather = (coord: Coordinates) => {
  const query = useQuery({
    queryKey: ['current-weather', coord],
    queryFn: async () => {
      const res = await axiosClient.get<WeatherData>(`/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric`);
      return res.data;
    },
  });
  return query;
};
