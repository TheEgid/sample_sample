import React, { useEffect } from "react";
import { Fancybox as FancyboxNative } from "@fancyapps/ui";
import { Button } from "react-bootstrap";

const FancyboxExample = () => {
    useEffect(() => {
        FancyboxNative.bind("[data-fancybox]", {});

        return () => {
            FancyboxNative.destroy();
        };
    }, []);

    return (
        <div>
            <h2>Example of a Modal with React Component</h2>
            <Button
                data-fancybox
                data-src="#hidden-content"
                data-type="inline"
            >
                Open Modal
            </Button>

            <div style={{ display: "none" }}>
                <div id="hidden-content">
                    <h2>Контент модального окна</h2>
                    <p>Это пример содержимого, которое отображается в модальном окне.</p>
                    {/* <Button onClick={() => alert("Действие!")}>Кнопка</Button> */}
                </div>
            </div>
        </div>
    );
};

export default FancyboxExample;
