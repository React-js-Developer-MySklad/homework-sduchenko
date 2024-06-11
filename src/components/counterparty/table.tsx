import React from "react";
import {Counterparty} from "../../model/counterparty";

type RowProps = {
    item: Counterparty
    onClick: (Counterparty) => void
}
const Row = (props: RowProps) => {
    const {id, name, address, inn, kpp} = props.item
    const onClick = () => {
        props.onClick(props.item)
    }

    return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onDoubleClick={onClick}>
        <td className="px-1 py-4 font-medium">
            {id}
        </td>
        <td className="px-1 py-4 text-gray-900">
            {name}
        </td>
        <td className="px-1 py-4">
            {inn}
        </td>
        <td className="px-1 py-4">
            {kpp}
        </td>
        <td className="px-1 py-4">
            {address}
        </td>
    </tr>)
}

type TableProps = {
    items: Counterparty[]
    onRowClick: (Counterparty) => void
}
export const CounterpartyTable = React.memo(({items, onRowClick}: TableProps) => {
    console.log("update table")
    return (
        <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-1 py-4">
                    Идентификатор
                </th>
                <th scope="col" className="px-1 py-4">
                    Название
                </th>
                <th scope="col" className="px-1 py-4">
                    ИНН
                </th>
                <th scope="col" className="px-1 py-4">
                    КПП
                </th>
                <th scope="col" className="px-1 py-4">
                    Адрес
                </th>
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <Row key={item.id} item={item} onClick={onRowClick}/>
            ))}
            </tbody>
        </table>
    )
})