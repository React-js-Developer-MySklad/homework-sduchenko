import React, {PropsWithChildren} from "react";

export const Main: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <main className="grow pt-5">
            <div id="main" className="relative overflow-x-auto">
                {children}
            </div>
        </main>
    )
}