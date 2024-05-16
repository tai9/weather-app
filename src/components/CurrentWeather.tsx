import moment from 'moment';

import { useCurrentWeather } from '../hooks/useCurrentWeather';
import Card from './Card';

const CurrentWeather = () => {
  const { data } = useCurrentWeather();
  return (
    <Card>
      <div>{moment().format('MMMM d, YYYY')}</div>
      <div className="flex items-center gap-8 px-8 ">
        <div>
          <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt="" />
        </div>
        <div>
          <div className=" text-4xl font-medium">{data?.main.temp}&deg;C</div>
          <div className=" capitalize">{data?.weather[0].description}</div>
        </div>
      </div>
      <div className="flex w-full justify-evenly gap-6">
        <div>
          <div className=" text-gray-500 text-sm font-medium">Humidity</div>
          <div className=" font-bold">
            {data?.main.humidity} <span className=" text-xs">%</span>
          </div>
        </div>
        <div>
          <div className=" text-gray-500 text-sm font-medium">Winds</div>
          <div className=" font-bold">
            {data?.wind.speed} <span className=" text-xs">m/s</span>
          </div>
        </div>
        <div>
          <div className=" text-gray-500 text-sm font-medium">Visibility</div>
          <div className=" font-bold">
            {data ? data?.visibility / 1000 : '-'} <span className=" text-xs">km</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
