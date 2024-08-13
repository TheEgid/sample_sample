import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { listToTree } from "./tools";

export interface ITreeNode {
    value: string
    label: string
    children?: ITreeNode[]
}

const inputer = [
    {
        parentsList: ["AAAAAAAAAA", "B1"],
    },
    {
        parentsList: ["AAAAAAAAAA", "B2"],
    },
    {
        parentsList: ["сооружения", "O1"],
    },
    {
        parentsList: ["сооружения", "O2"],
    },
    {
        parentsList: ["сооружения", "O3", "O3_sub1"],
    },
    {
        parentsList: ["сооружения", "O3", "O3_sub1", "O3_sub1_sub1"],
    },
    {
        parentsList: ["сооружения", "O3", "O3_sub2"],
    },
];

const NewElement = (): React.JSX.Element => {
    const [selectedPath, setSelectedPath] = useState<string[]>([]);
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const itemsForDropdownCascade = listToTree(inputer);

    // Recursively add nodes and their parents to the expandedNodes set
    const addNodeAndParents = (node: ITreeNode, path: string[], expandedNodes: Set<string>) => {
        const nodePath = [...path, node.label].join("|||");

        expandedNodes.add(nodePath);

        node.children?.forEach((child) => {
            addNodeAndParents(child, [...path, node.label], expandedNodes);
        });
    };

    // Clear expanded nodes except those in the selected branch
    const calculateExpandedNodes = (node: ITreeNode, path: string[], expandedNodes: Set<string>) => {
        const newExpandedNodes = new Set<string>();

        // Add selected path and its ancestors
        addNodeAndParents(node, path, newExpandedNodes);

        return newExpandedNodes;
    };

    const handleButtonClick = (node: ITreeNode, path: string[]) => {
        const newPath = [...path, node.label];

        setSelectedPath(newPath);

        // Calculate the new set of expanded nodes
        setExpandedNodes((prevExpandedNodes) => {
            const newExpandedNodes = new Set<string>();

            // For each root node, if it is in the selected branch, add its descendants
            itemsForDropdownCascade.forEach((rootNode) => {
                const isInSelectedBranch = [...newPath].includes(rootNode.label);

                if (isInSelectedBranch) {
                    addNodeAndParents(rootNode, [], newExpandedNodes);
                }
            });

            return newExpandedNodes;
        });
    };

    const renderButtons = (nodes: ITreeNode[], path: string[]) => {
        return nodes.map((node) => {
            const nodePath = [...path, node.label].join("|||");
            const isExpanded = expandedNodes.has(nodePath);

            return (
                <div key={node.value} style={{ marginLeft: "10px" }}>
                    <Button
                        onClick={() => handleButtonClick(node, path)}
                        style={{ marginBottom: "5px", width: "200px" }}
                    >
                        {node.label}
                    </Button>
                    {node.children && isExpanded && (
                        <div style={{ marginLeft: "20px" }}>
                            {renderButtons(node.children, [...path, node.label])}
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
