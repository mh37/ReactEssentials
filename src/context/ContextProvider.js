import React, { createContext, useState } from 'react'
export const AppContext = createContext()

const  ContextProvider = (props) => {
    const [activeCustomer, setActiveCustomer] = useState('')
    const sampleUrl = "http://localhost:3000"

    return (
         <AppContext.Provider 
            value={{
                activeCustomer,
                sampleUrl
             }}>
               {props.children}
         </AppContext.Provider>
    )
}
export default ContextProvider