
import {ListContextProvider} from '../../hooks/useList.tsx'
const ListProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <ListContextProvider>
        {children}
    </ListContextProvider>
  )
}

export default ListProvider