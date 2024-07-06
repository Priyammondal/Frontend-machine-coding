import { useState } from "react";

function Folder({ explorer, handleInsertNode }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFoler = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  console.log(explorer);

  return explorer.isFolder ? (
    <div style={{ marginTop: "5px" }}>
      <div className="folder" onClick={() => setExpand((prev) => !prev)}>
        <span>📁 {explorer.name}</span>
        <div>
          <button onClick={(e) => handleNewFoler(e, true)}>📂</button>
          <button onClick={(e) => handleNewFoler(e, false)}>📝</button>
          <button>🗑</button>
          <button>✍</button>
        </div>
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}>
        {showInput.visible && (
          <div className="inputContainer">
            <span>{showInput.isFolder ? "📁" : "📄"}</span>
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onBlur={() =>
                setShowInput((prev) => ({ ...prev, visible: false }))
              }
              onKeyDown={onAddFolder}
            />
          </div>
        )}
        {explorer.items.map((exp) => {
          return (
            <Folder
              key={exp.id}
              explorer={exp}
              handleInsertNode={handleInsertNode}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="file">
      <span>📄 {explorer.name}</span>
      <div>
        <button>🗑</button>
        <button>✍</button>
      </div>
    </div>
  );
}

export default Folder;
