import { useStore } from "effector-react";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css"; // import first
import { Button, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { EmptyLine } from "@/EmptyLine";
import { $addBlogItemStatus, addBlogItemFx } from "./model/some/state";

export default function Home() {
    const { loading, error, data } = useStore($addBlogItemStatus);

    const functionToExecute = (event: React.FormEvent) => {
        event.preventDefault();
        void addBlogItemFx();
    };

    return (
        <>
            <ToastContainer />
            <Head>
                <title>Приложение</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <EmptyLine />
                <div className="hello">
                    <div className="chil">Привет</div>
                    <EmptyLine />
                    <div className="chil">{String(loading)}</div>
                    <EmptyLine />
                    <div className="chil">{String(error)}</div>
                    <EmptyLine />
                    <div className="chil">{data}</div>
                    <EmptyLine />
                    <Button variant="secondary" onClick={(e) => functionToExecute(e)}>
                        Нажми меня
                    </Button>
                </div>
            </Container>
        </>
    );
}
