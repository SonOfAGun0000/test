import type { StateStorage } from 'zustand/middleware'

export const completedSessionAwareStorage: StateStorage = {
  getItem: (name) => {
    const rawValue = window.localStorage.getItem(name)

    if (!rawValue) {
      return null
    }

    try {
      const parsedValue = JSON.parse(rawValue) as {
        state?: { gameCompleted?: boolean }
      }

      if (parsedValue.state?.gameCompleted) {
        window.localStorage.removeItem(name)
        return null
      }
    } catch {
      window.localStorage.removeItem(name)
      return null
    }

    return rawValue
  },
  setItem: (name, value) => {
    window.localStorage.setItem(name, value)
  },
  removeItem: (name) => {
    window.localStorage.removeItem(name)
  },
}
