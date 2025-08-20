import { createContext, useContext, useEffect, useState } from 'react'
import { useSpinWheelContext } from './spin-wheel-context'
import type { WinnerRecord } from './spin-wheel-context'

export const WinnerHistoryContext = createContext({
  searchWinner: (_: React.ChangeEvent<HTMLInputElement>) => {},
  clearSearch: () => {},
  paging: [] as Array<Array<WinnerRecord>>,
  totalData: 0,
  totalPages: 0,
  currentPage: 0,
  startIndex: 0,
  endIndex: 0,
  isSearching: false,
  nextPage: () => {},
  previousPage: () => {},
})

export const useWinnerHistoryContext = () => {
  return useContext(WinnerHistoryContext)
}

export const WinnerHistoryContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { winners } = useSpinWheelContext()

  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [paging, setPaging] = useState<Array<Array<WinnerRecord>>>([])
  const [totalData, setTotalData] = useState<number>(0)

  const pageSize = 5

  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize

  const calculateTotalPages = (numOfData: number) => {
    return Math.ceil(numOfData / pageSize)
  }

  const searchWinner = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const searchValue = e.target.value.trim()
    if (searchValue === '') {
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const filteredWinners = winners.filter((winner) =>
      winner.numberPadded.startsWith(searchValue),
    )

    setCurrentPage(0)
    paginateResults(filteredWinners)
  }

  const clearSearch = () => {
    setTotalPages(calculateTotalPages(winners.length))
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const paginateResults = (rawWinners: Array<WinnerRecord>) => {
    if (rawWinners.length > 0) {
      const pagingContent: Array<Array<WinnerRecord>> = []
      for (let i = 0; i < rawWinners.length; i += pageSize) {
        pagingContent.push(rawWinners.slice(i, i + pageSize))
      }
      setPaging(pagingContent)
    } else {
      setPaging([])
    }
    setTotalPages(calculateTotalPages(rawWinners.length))
    setTotalData(rawWinners.length)
  }

  useEffect(() => {
    paginateResults(winners)
  }, [winners])

  return (
    <WinnerHistoryContext.Provider
      value={{
        searchWinner,
        clearSearch,
        totalPages,
        currentPage,
        isSearching,
        startIndex,
        endIndex,
        totalData,
        nextPage,
        previousPage,
        paging,
      }}
    >
      {children}
    </WinnerHistoryContext.Provider>
  )
}
