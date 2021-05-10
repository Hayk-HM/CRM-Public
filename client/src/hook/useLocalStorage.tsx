import React, { useState, useEffect } from "react";

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
]

const useLocalStorage = <T,> (key: string, initialValue?: T): ReturnType<T> => {
  const [user, setUser] = useState<T | undefined>(
    () => {
      if (!initialValue) return
      try {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : initialValue
      } catch (error) {
        return initialValue
      }
    }
  )

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(key, JSON.stringify(user))
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, key])
  return [user, setUser]
}

export default useLocalStorage