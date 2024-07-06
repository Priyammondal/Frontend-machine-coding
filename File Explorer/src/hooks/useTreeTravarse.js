function useTreeTravarse() {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) =>
      insertNode(obj, folderId, item, isFolder)
    );
    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, folderId, item, isFolder) {}
  function updateNode(tree, folderId, item, isFolder) {}
  return { insertNode, deleteNode, updateNode };
}

export default useTreeTravarse;
