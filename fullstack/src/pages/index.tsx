import React from "react";
import { useUnit } from "effector-react";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image"
import { Button, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { EmptyLine } from "@/EmptyLine";
import { $addBlogItemStatus, addBlogItemFx } from "@/model/some/state";

const FixedWindow = () => {
    const functionToExecute = (event: React.FormEvent) => {
        event.preventDefault();
        void addBlogItemFx();
    };

    return (
        <>

            <div className="fixed-calc-window">
                <p>
                    <Button variant="secondary" onClick={functionToExecute}>
                        Нажми меня
                    </Button>
                </p>
                <p>Это прикрепленное окно 1</p>
                <p>Это прикрепленное окно 2</p>
            </div>
        </>
    );
};

const ImageComponent = () => {
    return (
        <div className="image-container">
            <Image
                src="https://media.istockphoto.com/id/185304274/fr/photo/chaton.jpg?s=2048x2048&w=is&k=20&c=BPWp3q_jnE_6YKdnN3MyRVAz01FnEj82PTYqwfZ_Jm4="
                alt="Описание изображения"
                className="image"
                width={800}
                height={500}
            />
        </div>
    );
};

const Home: React.FC = () => {
    const { loading, error, data } = useUnit($addBlogItemStatus);

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
                    <div className="chil">{loading}</div>
                    <EmptyLine />
                    <div className="chil">{error?.message || "без ошибок"}</div>
                    <EmptyLine />
                    <div className="chil">{(data.length > 0 && data) || "_"}</div>
                </div>
                <ImageComponent />
                <ImageComponent />
                <ImageComponent />
            </Container>
            <FixedWindow />
        </>
    );
};

export default Home;
