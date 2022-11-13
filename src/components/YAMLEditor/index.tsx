import {useRef} from "react";
import {loadAll} from "js-yaml";
import {decodeK8sResource} from "../../utils/k8s";


export default function YAMLEditor() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onClick = (_: any) => {
    const docs = loadAll(inputRef.current?.value as string);
    const resources = docs.map((doc: unknown) => {
        try {
            return decodeK8sResource(doc);
        } catch (e) {
            console.error(e)
            return null
        }
    }).filter(v => v !== null)

    console.log(resources);
  }

  return (
    <>
      <textarea rows={30} cols={60} ref={inputRef} ></textarea>
      <br/>
      <button onClick={onClick}>Submit</button>
    </>
  )
}