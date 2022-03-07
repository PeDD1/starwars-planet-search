import { useEffect, useState } from 'react';

const useFilters = (defaultValue, newValue, typeNewValue) => {
  const [filter, setFilter] = useState(defaultValue);

  useEffect(() => {
    setFilter({ ...filter, [typeNewValue]: newValue });
  }, [typeNewValue, newValue]);

  return filter;
};

export default useFilters;
