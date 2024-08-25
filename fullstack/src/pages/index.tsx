import React from "react";
import { useUnit } from "effector-react";
import Head from "next/head";
import { Container, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { ChBxes, DataDisplayWithIncrement, ImageComponent } from "./ElementsOthers";
import ExpandableDiv from "@/components/ExpandableDiv";
import FancyboxExample from "@/components/ModalContent";
import NewElement from "@/components/Sub";
import { $addBlogItemStatus } from "@/model/some/state";

const Home: React.FC = () => {
    const { loading, error } = useUnit($addBlogItemStatus);

    return (
        <>
            <ToastContainer />
            <Head>
                <title>Приложение</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <NewElement />
                <div className="hello">
                    <ExpandableDiv />
                    <FancyboxExample />
                    <p>{error?.message ?? "без ошибок"}</p>
                    <div style={{ height: "40px" }}>{loading ? <Spinner /> : "загружено"}</div>
                    {[...Array(1)].map((_, i) => (<ImageComponent key={`i${i + 1}`} />))}
                </div>
                <DataDisplayWithIncrement />
                <div style={{ display: "flex" }}>
                    <ChBxes />
                </div>
            </Container>

        </>
    );
};

export default Home;
