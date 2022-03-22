import React, { createContext, useState} from "react";
import { FunctionComponent } from "react";
import { LayoutType } from "../index.d";

interface LayoutContextProps {
    layout: LayoutType
    setLayout: (layout: LayoutType) => void
}

const LayoutContext = createContext<LayoutContextProps>({
    layout: 'grid',
    setLayout: (layout: LayoutType) => {}
});

const LayoutContextProvier: FunctionComponent = ({ children}) => {
    const [layout, setLayout] = useState<LayoutType>('grid');

    return (
        <LayoutContext.Provider value={{layout, setLayout}}>
            {children}
        </LayoutContext.Provider>
    )
}

export { LayoutContextProvier, LayoutContext };
