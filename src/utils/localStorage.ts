export const loadSearchHistory = (): string[] => {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  };
  
  export const saveSearchHistory = (history: string[]) => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  };
  