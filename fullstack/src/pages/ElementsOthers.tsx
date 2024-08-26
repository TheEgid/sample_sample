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

const ChBxes = (): React.JSX.Element => {
    const { petRiskIsBeda, petRiskIsCat, petRiskIsDog, petSecurityIsProtectionOther, computedField } = useUnit($currentPetitionStore);

    const handleCheckboxChange = (event: { target: { name: any, checked: any } }): void => {
        const { name, checked } = event.target;

        setPetitionFieldFx({ field: name, value: checked });
    };

    return (
        <Form>
            <Form.Check
                label="БЕДА"
                type="checkbox"
                name="petRiskIsBeda"
                checked={petRiskIsBeda}
                onChange={handleCheckboxChange}
                id="petRiskIsBeda"
            />
            <Form.Check
                label="Кот"
                type="checkbox"
                name="petRiskIsCat"
                checked={petRiskIsCat}
                onChange={handleCheckboxChange}
                id="petRiskIsCat"
            />
            <Form.Check
                label="Собака"
                type="checkbox"
                name="petRiskIsDog"
                checked={petRiskIsDog}
                onChange={handleCheckboxChange}
                id="petRiskIsDog"
            />
            <Form.Check
                label="Прочая защита"
                type="checkbox"
                name="petSecurityIsProtectionOther"
                checked={petSecurityIsProtectionOther}
                onChange={handleCheckboxChange}
                id="petSecurityIsProtectionOther"
            />
            <span>
                {`Вычисляемое поле: ${computedField}`}
            </span>
        </Form>
    );
};

export default ChBxes;
