import { create } from "zustand/react";
import { persist, type PersistOptions } from "zustand/middleware";

export const createPersistedStore = <T>(
  name: string,
  config: (set: any, get: any) => T,
) => {
  return create<T>()(
    persist(config, {
      name,
    } as PersistOptions<T>),
  );
};
