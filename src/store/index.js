import create from 'zustand';

export const phaseStore = create(
      (set) => ({
          phase: 0,
          setPhase: (phase) =>
              set(() => {
                  return { phase };
          }),
      })
);

export const playerIdStore = create(
    (set) => ({
        playerId: 0,
        setPlayerId: (playerId) =>
            set(() => {
                return { playerId };
        }),
    })
);

export const loaderStore = create(
    (set) => ({
        loader: false,
        setLoader: (loader) =>
            set(() => {
                return { loader };
        }),
    })
);

export const userStore = create(
    (set) => ({
        user: null,
        setUser: (user) =>
            set(() => {
                return { user };
        }),
    })
);