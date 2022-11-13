import React, {createRef} from "react";
import {loadAll} from "js-yaml";
import {decodeK8sResource} from "../../utils/k8s";

interface YAMLEditorProps {}

class YAMLEditor extends React.Component<YAMLEditorProps> {
    private readonly inputRef: React.RefObject<HTMLTextAreaElement>;

    constructor(props: YAMLEditorProps) {
        super(props);
        this.inputRef = createRef<HTMLTextAreaElement>();
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <>
                <textarea rows={30} cols={60} ref={this.inputRef} ></textarea>
                <br/>
                <button onClick={this.onClick}>Submit</button>
            </>
        );
    }

    private onClick(e: React.MouseEvent): void {
        const docs = loadAll(this.inputRef?.current?.value as string);
        const resources = docs.map((doc: unknown) => {
            try {
                return decodeK8sResource(doc);
            } catch (e) {
                console.error(e);
                return null;
            }
        }).filter(v => v !== null);

        console.log(resources);
    }
}

export default YAMLEditor;