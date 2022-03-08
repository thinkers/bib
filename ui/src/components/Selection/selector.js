import { fromRange } from "xpath-range"

export function checkSelection(colorName, decision, setShowToolTip, userAnnotations) {
    let text = (getSelection() && getSelection().toString()) || "";


    if (!text || text === " ") {
        // TODO
        return;
    }
    let selection = getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const content = document.getElementById("contentContainer");
        let xpath = null;

        if (content) {
            xpath = fromRange(range, content)
        }

        if (xpath) {
            let { startOffset, endOffset, startContainer, endContainer } = getXpathParameters(xpath);

            const highlightId = uuidv4();
            const typename = "highlight";

            let store = { text, highlightId, startOffset, endOffset, startContainer, endContainer, typename };
            var cache = JSON.parse(localStorage.getItem("tmp_data")) || [];
            localStorage.setItem("tmp_data", JSON.stringify(cache));
        }
    }
}


function getSelection() {
    if (window.getSelection) {
        return window.getSelection()
    }

    if (document.selection) {
        return document.selection
    }
    return null
}

const getXpathParameters = xpath => {
    const startOffset = xpath.startOffset;
    const endOffset = xpath.endOffset;
    let startContainer = xpath.start;

    let endContainer = xpath.end;
    return { startOffset, endOffset, startContainer, endContainer }
}