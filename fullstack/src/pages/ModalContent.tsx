import React, { useEffect, useRef, useState } from "react";
import { Fancybox as FancyboxNative } from "@fancyapps/ui";
import { Button } from "react-bootstrap";
import { createPortal } from "react-dom";

const ModalContent = () => {
    return (
        <div>
            <h2>Контент модального окна</h2>
            <p>Это пример содержимого, которое отображается в модальном окне.</p>
            <Button onClick={() => alert("Действие!")}>Кнопка</Button>
        </div>
    );
};

const FancyboxExample = () => {
    const modalContainer = useRef<HTMLDivElement | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        if (typeof window !== "undefined") {
            const container = document.createElement("div");

            document.body.appendChild(container);
            modalContainer.current = container;

            return () => {
                FancyboxNative.destroy();
                if (modalContainer.current) {
                    document.body.removeChild(modalContainer.current);
                }
            };
        }
    }, []);

    const openModal = () => {
        if (modalContainer.current) { FancyboxNative.show([{ src: modalContainer.current, type: "html" }]); }
    };

    return (
        <div>
            <h2>Example of a Modal with React Component</h2>
            <Button onClick={openModal}>Open Modal</Button>
            {/* Render the modal content only if in the client-side environment */}
            {isClient && modalContainer.current && createPortal(<ModalContent />, modalContainer.current)}
        </div>
    );
};

export default FancyboxExample;
