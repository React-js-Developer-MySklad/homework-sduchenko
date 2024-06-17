import React, {useCallback, useContext, useEffect, useState} from "react";
import {Header} from "./header";
import {Footer} from "./footer";
import {Main} from "./main";
import {CounterpartyTable} from "../counterparty/table";
import {Loader} from "../loader";
import {CounterpartyModal} from "../counterparty/modal";
import {Counterparty} from "../../model/counterparty";
import {CounterpartyRepositoryContext} from "../../core/contexts";

export const App = () => {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false)
    let [showModal, setShowModal] = useState(false)
    let [modalItem, setModalItem] = useState<Counterparty>(null)
    const counterpartyRepository = useContext(CounterpartyRepositoryContext);

    const fetchData = () => {
        setLoading(true)
        counterpartyRepository.load()
            .then(data => setData(data))
            .finally(() => setLoading(false))
    }

    useEffect(fetchData, [])

    const editItem = (item: Counterparty) => {
        setModalItem(item);
        setShowModal(true);
    }

    const onAddItem = useCallback(async () => {
            const item = await counterpartyRepository.create();
            editItem(item)
        }
        , [])

    const onSave = useCallback(async (item) => {
        console.log("Saving item", item)
        setLoading(true)
        await counterpartyRepository.save(item)
        setShowModal(false)
        await fetchData()
    }, []);

    const onModalClose = useCallback(() => {
            setShowModal(false);
            setModalItem(null);
        }
        , [])

    const onRowClick = useCallback((row) => {
        editItem(row)
    }, [])

    return (<>
        <Header onAddClick={onAddItem}/>

        <Main>
            {loading ? (
                <Loader/>
            ) : (
                <CounterpartyTable items={data} onRowClick={onRowClick}/>
            )}
        </Main>

        <CounterpartyModal show={showModal} item={modalItem} onClose={onModalClose} onSave={onSave}/>

        <Footer/>
    </>)
}