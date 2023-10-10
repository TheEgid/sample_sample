import { useState } from "react";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css"; // import first
import { Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { apiRoot } from "@/api";
import { EmptyLine } from "@/EmptyLine";

export default function Home() {
    const [state, setState] = useState("");
    const [show, setShow] = useState(false);

    const notify = () => toast.dark("Wow so easy!");

    const functionToExecute = (event: React.FormEvent) => {
        event.preventDefault();
        setShow(!show);
        apiRoot
            .get(`database`)
            .then((response) => response.json())
            .then((data) => {
                setState(data as string);
                if ((data as string).length > 3) toast.success("Все работает");
            })
            .catch((error) => {
                console.error(error);
            });
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
                <EmptyLine />
                <div className="hello">
                    <div className="chil">Привет</div>
                    <EmptyLine />
                    <Button onClick={notify}>Notify!</Button>
                    <EmptyLine />
                    <div hidden={show} className="chil">
                        {state}
                    </div>
                    <EmptyLine />
                    <Button variant="secondary" onClick={(e) => functionToExecute(e)}>
                        Нажать 2 раза
                    </Button>
                    {/* <div className="chil">Hi privated {process.env.NEXT_PUBLIC_DB_NAME_DEV}</div> */}
                </div>
            </Container>
        </>
    );
}
