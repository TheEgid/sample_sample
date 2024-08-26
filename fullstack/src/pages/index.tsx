import React from "react";
import { useUnit } from "effector-react";
import Head from "next/head";
import { Button, Container, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ChBxes, { DataDisplayWithIncrement, ImageComponent } from "./ElementsOthers";
import ExpandableDiv from "@/components/ExpandableDiv";
import FancyboxExample from "@/components/ModalContent";
import NewElement from "@/components/Sub";
import { $currentPetitionStore, checkPetitionFieldFx } from "@/model/some/current-petition-state";
import { $addBlogItemStatus } from "@/model/some/state";

const Home: React.FC = () => {
    const { loading, error } = useUnit($addBlogItemStatus);
    const { checkedFields: computedFieldChecker } = useUnit($currentPetitionStore);

    return (
        <>
            <ToastContainer />
            <Head>
                <title>Приложение</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <div>{computedFieldChecker}</div>
                <div style={{ display: "flex" }}>
                    <ChBxes />
                </div>
                <Button variant="success" onClick={() => checkPetitionFieldFx()}>
                    Click Me!
                </Button>
                <NewElement />
                <div className="hello">
                    <ExpandableDiv />
                    <FancyboxExample />
                    <p>{error?.message ?? "без ошибок"}</p>
                    <div style={{ height: "40px" }}>{loading ? <Spinner /> : "загружено"}</div>
                    {[...Array(1)].map((_, i) => (<ImageComponent key={`i${i + 1}`} />))}
                </div>
                <DataDisplayWithIncrement />
            </Container>
        </>
    );
};

export default Home;
