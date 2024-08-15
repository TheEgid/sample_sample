import React, { useState } from "react";
import { listToTree } from "@/pages/tools";

export interface ITreeNode {
    value: string,
    label: string,
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

    const addNodeAndParents = (node: ITreeNode, path: string[], expandedNodes: Set<string>): void => {
        const nodePath = [...path, node.label].join("|||");

        expandedNodes.add(nodePath);

        node.children?.forEach((child) => {
            addNodeAndParents(child, [...path, node.label], expandedNodes);
        });
    };

    const handleLinkClick = (node: ITreeNode, path: string[]): void => {
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

    const renderLinks = (nodes: ITreeNode[], path: string[], level: number = 0): React.JSX.Element[] => {
        return nodes.map((node) => {
            const nodePath = [...path, node.label].join("|||");
            const isExpanded = expandedNodes.has(nodePath);
            const isLastClicked = JSON.stringify(lastClickedPath) === JSON.stringify([...path, node.label]);

            return (
                <div key={node.value}>
                    <a
                        onClick={() => handleLinkClick(node, path)}
                        style={{
                            display: "inline-block",
                            cursor: "pointer",
                            textDecoration: isLastClicked ? "underline" : "none",
                            color: isLastClicked ? "blue" : "black",
                            fontWeight: isLastClicked ? "bold" : "normal",
                            whiteSpace: "pre", // To respect the indentation in text
                        }}
                    >
                        {"| " + "— ".repeat(level) + node.label}
                    </a>
                    {node.children && isExpanded && (
                        <div>
                            {renderLinks(node.children, [...path, node.label], level + 1)}
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
                <div>{renderLinks(itemsForDropdownCascade, [])}</div>
            </div>
            <div style={{ marginTop: "10px" }}>
                <strong>Выбранная категория: </strong>
                {selectedPath.join(" / ")}
            </div>
        </>
    );
};

export default NewElement;
