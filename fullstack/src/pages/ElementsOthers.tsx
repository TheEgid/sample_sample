import React, { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";
import { Button, Form } from "react-bootstrap";
import { $currentPetitionStore, setPetitionFieldFx } from "@/model/some/current-petition-state";
import { $addBlogItemStatus, addBlogItemFx } from "@/model/some/state";

export const DataDisplayWithIncrement = (): React.JSX.Element => {
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
        // setPetitionFieldFx({ field: "petSecurityIsProtectionOther", value: allData.length % 2 === 0 });
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

export const ImageComponent = (): React.JSX.Element => {
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

export const ChBxes = (): React.JSX.Element => {
    const current = useUnit($currentPetitionStore);

    const handleCheckboxChange = (event: { target: { name: any, checked: any } }): void => {
        const { name, checked } = event.target;

        setPetitionFieldFx({ field: name, value: checked });
    };

    return (
        <Form>
            <Form.Check
                type="checkbox"
                name="petRiskIsBeda"
                checked={current.petRiskIsBeda}
                onChange={handleCheckboxChange}
                id="petRiskIsBeda"
            />
            <Form.Check
                type="checkbox"
                name="petRiskIsCat"
                checked={current.petRiskIsCat}
                onChange={handleCheckboxChange}
                id="petRiskIsCat"
            />
            <Form.Check
                type="checkbox"
                name="petRiskIsDog"
                checked={current.petRiskIsDog}
                onChange={handleCheckboxChange}
                id="petRiskIsDog"
            />
            <Form.Check
                type="checkbox"
                name="petSecurityIsProtectionOther"
                checked={current.petSecurityIsProtectionOther}
                onChange={handleCheckboxChange}
                id="petSecurityIsProtectionOther"
            />
            <p>
                Вычисляемое поле:
                {current.computedField}
            </p>
        </Form>
    );
};
