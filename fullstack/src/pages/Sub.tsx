/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { listToTree } from "./tools";

export interface ITreeNode {
    value: string
    label: string
    children?: ITreeNode[]
}

const inputer = [
    { parentsList: ["AAAAAAAAAA", "B1"] },
    { parentsList: ["AAAAAAAAAA", "B2"] },
    { parentsList: ["сооружения", "O1"] },
    { parentsList: ["сооружения", "O2"] },
    { parentsList: ["сооружения", "O3", "O3_sub1"] },
    { parentsList: ["сооружения", "O3", "O3_sub1", "O3_sub1_sub1"] },
    { parentsList: ["сооружения", "O3", "O3_sub2"] },
];

const NewElement = (): React.JSX.Element => {
    const [selectedPath, setSelectedPath] = useState<string[]>([]);
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    const [lastClickedPath, setLastClickedPath] = useState<string[]>([]);

    const itemsForDropdownCascade = listToTree(inputer);

    const addNodeAndParents = (node: ITreeNode, path: string[], expandedNodes: Set<string>) => {
        const nodePath = [...path, node.label].join("|||");

        expandedNodes.add(nodePath);

        node.children?.forEach((child) => {
            addNodeAndParents(child, [...path, node.label], expandedNodes);
        });
    };

    const handleButtonClick = (node: ITreeNode, path: string[]) => {
        const newPath = [...path, node.label];

        setSelectedPath(newPath);
        setLastClickedPath(newPath);

        setExpandedNodes(() => {
            const newExpandedNodes = new Set<string>();

            itemsForDropdownCascade.forEach((rootNode) => {
                const isInSelectedBranch = [...newPath].includes(rootNode.label);

                if (isInSelectedBranch) { addNodeAndParents(rootNode, [], newExpandedNodes); }
            });
            return newExpandedNodes;
        });
    };

    const renderButtons = (nodes: ITreeNode[], path: string[]) => {
        return nodes.map((node) => {
            const nodePath = [...path, node.label].join("|||");
            const isExpanded = expandedNodes.has(nodePath);
            const isLastClicked = JSON.stringify(lastClickedPath) === JSON.stringify([...path, node.label]);

            return (
                <div key={node.value} style={{ marginLeft: "30px" }}>
                    <Button
                        onClick={() => handleButtonClick(node, path)}
                        style={{
                            marginBottom: "5px",
                            width: "200px",
                            backgroundColor: isLastClicked ? "lightblue" : undefined,
                            borderColor: isLastClicked ? "blue" : undefined,
                            color: isLastClicked ? "blue" : undefined,
                        }}
                    >
                        {node.label}
                    </Button>
                    {node.children && isExpanded && (
                        <div>
                            {/* <div style={{ marginLeft: "20px" }}> */}
                            {renderButtons(node.children, [...path, node.label])}
                            {/* </div> */}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <>
            <div>
                <div>Категория</div>
                <div>{renderButtons(itemsForDropdownCascade, [])}</div>
            </div>
            <div style={{ marginTop: "10px" }}>
                <strong>Выбранная категория: </strong>
                {selectedPath.join(" / ")}
            </div>
        </>
    );
};

export default NewElement;
