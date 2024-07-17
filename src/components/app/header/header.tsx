import React from "react";
import Logo from "../../../assets/logo.svg";
import IconAdd from "../../../assets/icon_add.svg";

type HeaderProps = {
    onAddClick?: () => void
}

export const Header = ({onAddClick}: HeaderProps) => {
    console.log("update header")
    return (
        <header className="h-14">
            <div className="flex items-center h-14">
                <div id="logo">
                    <a href="#" role="logo">
                        <img alt="logo" src={Logo}/>
                    </a>
                </div>
                <div className="grow">
                </div>
                <div>
                    <button type="button"
                            role="add-button"
                            onClick={onAddClick}
                            className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white
            bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
            dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <img alt="Add" src={IconAdd} className="w-3 h-3 text-white me-2" aria-hidden="true"/>
                        Add data
                    </button>
                </div>
            </div>
        </header>
    )
}