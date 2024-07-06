import { useState } from "react";
import "./App.css";
import { explorer } from "./data/folderData";
import Folder from "./components/Folder";
import useTreeTravarse from "./hooks/useTreeTravarse";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTreeTravarse();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />;
}

export default App;
