import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

import { useCallback, useState } from 'react';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const APIkey = '111568af522f0bd9b2bdbdbdb63e55bc';

  const prepareData = (data) => {
    setWeatherData({
      name: data.name,
      icon: data.weather[0].icon,
      alt: data.weather[0].description,
    });
  };

  const handleCityChange = useCallback((city) => {
    setError(false);
    setLoading(true);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.cod === 200) {
          prepareData(data);
          setLoading(false);
        } else {
          setError(data.message);
          setLoading(false);
        }


      });
  }, [])

  return (
    <section>
      <PickCity onSubmit={handleCityChange} />
      {error && <ErrorBox>{error}</ErrorBox>}
      {(weatherData && !loading && !error) && <WeatherSummary data={weatherData} />}
      {(loading && !error) && <Loader />}
    </section>
  )
};

export default WeatherBox;