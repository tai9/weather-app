import { useMemo } from 'react';
import moment from 'moment';

import { useWeatherForecast } from '../hooks/useWeatherForecast';
import Card from './Card';
import ForecastItem from './ForecastItem';

const Forecast = () => {
  const { data } = useWeatherForecast();

  const groupByDay = (weatherData: WeatherItem[]) => {
    return weatherData.reduce((acc: Record<string, WeatherItem[]>, item: WeatherItem) => {
      const date = moment(item.dt_txt).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedData = useMemo(() => {
    return groupByDay(data?.list || []);
  }, [data]);

  const renderDate = (date: string) => {
    const dateFormat = moment(date);
    if (dateFormat.isSame(moment(), 'day')) {
      return 'Today';
    }
    return dateFormat.format('d MMMM');
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <h3 className="font-bold text-md">5-day Forecast (3 Hours)</h3>
      <Card className="w-full">
        {Object.keys(groupedData).map((date) => {
          return (
            <div className="flex items-start flex-col gap-4">
              <div className=" text-gray-500 font-medium">{renderDate(date)}</div>
              {groupedData[date].map((item) => (
                <ForecastItem data={item} />
              ))}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default Forecast;
