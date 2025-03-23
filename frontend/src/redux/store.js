import {configureStore} from "@reduxjs/toolkit"
import {setupListener} from "@reduxjs/toolkit/query/react"
const store=configureStore({
    reducer:{

    },
    middleware:(getDefualtMiddleware)=>getDefualtMiddleware().concat (apiSlice.middleware),
    devTools:true

})

setupListener(store.dispatch)