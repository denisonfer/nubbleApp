import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export function useAppState() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const $appStateListener = AppState.addEventListener('change', state => {
      setAppState(state);
    });
    return () => $appStateListener.remove();
  }, []);

  return { appState };
}
