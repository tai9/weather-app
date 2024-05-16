import { useCallback, useMemo, useState } from 'react';
import Autosuggest from 'react-autosuggest';

import { useCountries } from '../hooks/useCountries';
import { Country } from '../types/country';
import { Coordinates } from '../types/weather';

type Props = {
  handleSearch: (coord?: Coordinates) => void;
};

const SearchInput = ({ handleSearch }: Props) => {
  const countries = useCountries();

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const findCountry = useCallback(
    (search: string) => {
      const cca2 = search.split(', ')[1];
      const country = countries.data?.find((x) => x.cca2 === cca2);
      return country;
    },
    [countries.data]
  );

  const isError = useMemo(() => {
    const country = findCountry(value);
    return !country && suggestions.length === 0 && !!value;
  }, [value, suggestions, findCountry]);

  const onSearch = () => {
    if (!value) {
      handleSearch(undefined);
      return;
    }
    const country = findCountry(value);
    if (country) {
      const [lat, lon] = country.latlng;
      handleSearch({ lat, lon });
    }
  };

  const onChange = (_: unknown, { newValue }: any) => {
    setValue(newValue);
  };
  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(() => getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : countries?.data?.filter((lang) => lang.name.common.toLowerCase().slice(0, inputLength) === inputValue) || [];
  };

  const getSuggestionValue = (suggestion: Country) => `${suggestion.name.common}, ${suggestion.cca2}`;

  const renderSuggestion = (suggestion: Country) => (
    <div className="p-3  bg-white w-full border border-1 shadow-md flex gap-4 cursor-pointer">
      <img width={32} src={suggestion.flags.svg} alt="" />
      <span>
        {suggestion.name.common}, {suggestion.cca2}
      </span>
    </div>
  );
  return (
    <div className=" relative h-[40px] mb-2">
      <div className="flex gap-4 justify-between absolute w-full">
        <div className="flex flex-col w-full items-start">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: 'Search location',
              value,
              onChange: onChange,
            }}
            theme={{
              container: 'w-full relative',
              input: 'p-2 bg-white w-full rounded-md focus:outline-none',
            }}
          />
          {isError && <p className="text-red-400">Invalid country or city</p>}
        </div>

        <button
          onClick={onSearch}
          disabled={isError || !value}
          className="relative disabled:bg-slate-300 max-h-[40px] bg-blue-500 text-white rounded-md py-2 px-4 font-bold"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
