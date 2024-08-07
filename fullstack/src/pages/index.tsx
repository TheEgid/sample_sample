import React, { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Head from "next/head";
import Image from "next/image";
import { Button, Container, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import FancyboxExample from "./ModalContent";
import { $addBlogItemStatus, addBlogItemFx } from "@/model/some/state";

const DataDisplayWithIncrement = () => {
    const { data } = useUnit($addBlogItemStatus);
    const [allData, setAllData] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (data?.length) {
            setAllData(prevData => [`${index} . -- ${data}`, ...prevData]);
        }
    }, [data, index]);

    const functionToExecute = () => {
        void addBlogItemFx();
        setIndex(prevIndex => prevIndex + 1);
    };

    return (
        <div className="fixed-calc-window">
            <Button id="PushedButton" variant="warning" onClick={functionToExecute}>
                Нажми
            </Button>
            <p></p>
            {allData.map((x, index) => (
                <p key={index}>{x?.length > 0 ? x : "_"}</p>
            ))}
        </div>
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
                priority
            />
        </div>
    );
};

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
                <div className="hello">
                    <FancyboxExample />
                    <p>{error?.message || "без ошибок"}</p>
                    <div style={{ height: "40px" }}>{loading ? <Spinner /> : "загружено"}</div>
                    {[...Array(3)].map((_, i) => (<ImageComponent key={i} />))}
                </div>
                <DataDisplayWithIncrement />
            </Container>
        </>
    );
};

export default Home;
