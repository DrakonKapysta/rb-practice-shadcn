'use client'

import { createContext, FC, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'

import { createFeatureStore } from '@/app/(client)/shared/store'
import { FeatureStore, initFeatureStore } from '@/app/(client)/shared/store'

export type FeatureStoreApi = ReturnType<typeof createFeatureStore>

export const FeatureStoreContext = createContext<FeatureStoreApi | undefined>(undefined)

export interface FeatureStoreProviderProps {
  children: ReactNode
  initialFeatures?: Record<string, unknown>
}

const FeatureStoreProvider: FC<FeatureStoreProviderProps> = (props) => {
  const { children, initialFeatures } = props

  const featureStoreRef = useRef<FeatureStoreApi | null>(null)

  if (featureStoreRef.current === null) {
    const featuresMap = initialFeatures ? { features: new Map(Object.entries(initialFeatures)) } : initFeatureStore()

    featureStoreRef.current = createFeatureStore(featuresMap)
  }

  return <FeatureStoreContext.Provider value={featureStoreRef.current}>{children}</FeatureStoreContext.Provider>
}

export const useFeatureStore = <T,>(selector: (state: FeatureStore) => T): T => {
  const featureStoreContext = useContext(FeatureStoreContext)

  if (!featureStoreContext) {
    throw new Error('useFeatureStore must be used within a FeatureStoreProvider')
  }

  return useStore(featureStoreContext, selector)
}

export default FeatureStoreProvider
