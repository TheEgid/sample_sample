import React, { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Head from "next/head";
import Image from "next/image";
import { Button, Container, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { $addBlogItemStatus, addBlogItemFx } from "@/model/some/state";

const DataDisplayWithIncrement = (props: {
    myData: string[]
    onIncrementIndex: () => void
}) => {
    const { myData, onIncrementIndex } = props;

    const functionToExecute = () => {
        void addBlogItemFx();
        onIncrementIndex();
    };

    return (
        <div className="fixed-calc-window">
            <Button id="PushedButton" variant="warning" onClick={functionToExecute}>
                Нажми
            </Button>
            <p></p>
            {myData.map((data, index) => (
                <p key={index}>{data?.length > 0 ? data : "_"}</p>
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
            />
        </div>
    );
};

const Home: React.FC = () => {
    const { loading, error, data } = useUnit($addBlogItemStatus);
    const [allData, setAllData] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            setAllData(prevData => [`${index} -- ${data}`, ...prevData]);
        }
    }, [data, index]);

    const incrementIndex = () => setIndex(prevIndex => prevIndex + 1);

    return (
        <>
            <ToastContainer />
            <Head>
                <title>Приложение</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <div className="hello">
                    <p></p>
                    <p>{error?.message || "без ошибок"}</p>
                    <p style={{ height: "40px" }}>{loading ? <Spinner /> : "загружено"}</p>

                </div>
                <ImageComponent />
                <ImageComponent />
                <ImageComponent />
            </Container>
            <DataDisplayWithIncrement myData={allData} onIncrementIndex={incrementIndex} />
        </>
    );
};

export default Home;
