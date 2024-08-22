import React, { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Head from "next/head";
import Image from "next/image";
import { Button, Container, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ExpandableDiv from "@/components/ExpandableDiv";
import FancyboxExample from "@/components/ModalContent";
import NewElement from "@/components/Sub";
import { setPetitionFieldFx } from "@/model/some/current-petition-state";
import { $addBlogItemStatus, addBlogItemFx } from "@/model/some/state";

const DataDisplayWithIncrement = (): React.JSX.Element => {
    const { data } = useUnit($addBlogItemStatus);
    const [allData, setAllData] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (data?.length) {
            setAllData((prevData: any) => [`${index} . -- ${data}`, ...prevData]);
        }
    }, [data, index]);

    const functionToExecute = async (): Promise<void> => {
        await addBlogItemFx();

        setPetitionFieldFx({ field: "petSecurityIsProtectionOther", value: allData.length % 2 === 0 });
        setPetitionFieldFx({ field: "petRiskIsTerrorism", value: allData.length % 2 === 0 });

        setIndex((prevIndex: number) => prevIndex + 1);
    };

    return (
        <div className="fixed-calc-window">
            <Button id="PushedButton" variant="warning" onClick={() => void functionToExecute()}>
                Нажми
            </Button>
            <p></p>
            {allData.map((x: any, index: number) => (
                // eslint-disable-next-line sonarjs/no-array-index-key
                <p key={index}>{x?.length > 0 ? x : "_"}</p>
            ))}
        </div>
    );
};

const ImageComponent = (): React.JSX.Element => {
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
                <NewElement />
                <div className="hello">
                    <ExpandableDiv />
                    <FancyboxExample />
                    <p>{error?.message ?? "без ошибок"}</p>
                    <div style={{ height: "40px" }}>{loading ? <Spinner /> : "загружено"}</div>
                    {[...Array(3)].map((_, i) => (<ImageComponent key={`i${i + 1}`} />))}
                </div>
                <DataDisplayWithIncrement />
            </Container>
        </>
    );
};

export default Home;
