import { createStore } from 'zustand'

export type FeatureState = {
  features: Map<string, unknown>
}

export type FeatureActions = {
  getFeature: (key: string) => unknown | undefined
  getFeatures: () => Map<string, unknown>
  removeFeature: (key: string) => void
  clearFeatures: () => void
}

export type FeatureStore = FeatureState & FeatureActions

export const initialFeatureState: FeatureState = {
  features: new Map(),
}

export const initFeatureStore = (): FeatureState => {
  return { features: new Map() }
}

export const createFeatureStore = (initialState: FeatureState = initialFeatureState) => {
  return createStore<FeatureStore>()((set, get) => ({
    ...initialState,
    getFeature: (key: string) => {
      return get().features.get(key)
    },
    getFeatures: () => {
      return get().features
    },
    removeFeature: (key: string) => {
      set((state) => {
        const newFeatures = new Map(state.features)
        newFeatures.delete(key)
        return { features: newFeatures }
      })
    },
    clearFeatures: () => {
      set({ features: new Map() })
    },
  }))
}
