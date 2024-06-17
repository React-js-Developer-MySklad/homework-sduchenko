import React, {useEffect, useRef, useState} from "react";
import {Modal as FlowbiteModal} from "flowbite"
import {Counterparty} from "../../model/counterparty";
import {createPortal} from "react-dom";

type ModalProps = {
    item: Counterparty
    show: boolean
    onClose: () => void
    onSave: (Counterparty) => void
}

export const CounterpartyModal = React.memo(({item, show, onClose, onSave}: ModalProps) => {
    let modalElementRef = useRef(null)
    let modalRef = useRef<FlowbiteModal>(null)
    let formElementRef = useRef(null)
    let [value, setValue] = useState<Counterparty>(null)

    console.log("modal update")

    useEffect(() => {
        setValue({...item})
    }, [item]);

    useEffect(() => {
        let  modal = new FlowbiteModal(modalElementRef.current)
        modal.updateOnHide(onClose)
        modalRef.current = modal;
    }, [modalElementRef])

    useEffect(() => {
        formElementRef.current.onsubmit = event => {
            event.preventDefault();
            event.stopPropagation();

            onSave(value)
        };

    }, [value, formElementRef])

    useEffect(() => {
        if (modalRef.current != null) {
            if (show) {
                modalRef.current.show()
            } else {
                modalRef.current.hide()
            }
        }
    }, [show, modalRef])

    const update = (diff) => setValue(state => {
        return {...state, ...diff}
    })

    return createPortal((
        <div ref={modalElementRef} tabIndex="-1" aria-hidden="true"
             className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 id="title" className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit counterparty
                        </h3>
                    </div>
                    <div className="p-4 md:p-5">
                        <form ref={formElementRef} className="space-y-4" action="#">
                            <div>
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                                <input type="text" placeholder="Название контрагента"
                                       value={value?.name}
                                       onChange={e => update({name: e.target.value})}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div>
                                    <label htmlFor="inn"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ИНН</label>
                                    <input type="text" placeholder="ИНН" required
                                           pattern="\d{10}"
                                           value={value?.inn}
                                           onChange={e => update({inn: e.target.value})}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="kpp"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">КПП</label>
                                    <input type="text" placeholder="КПП" required
                                           value={value?.kpp}
                                           onChange={e => update({kpp: e.target.value})}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="address"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Юридический
                                    адрес</label>
                                <textarea rows="2"
                                          placeholder="Адрес"
                                          value={value?.address}
                                          onChange={e => update({address: e.target.value})}
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea>
                            </div>

                            <button type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Сохранить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ), document.body);
})