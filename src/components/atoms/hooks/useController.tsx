import { IOption, ITreeItem } from "../../../types";
import { v4 as uuidv4 } from "uuid";
import { useTree } from "../globals";

export const useController = () => {
  const { tree, setTree } = useTree();

  const reBuildOptions = (options: IOption[]) => {
    options.forEach((option) => {
      if (option.children) {
        option.uid = uuidv4();
        reBuildOptions(option.children);
      }
    });
    return options;
  };

  const buildTree = (options: IOption[]) => {
    const data: ITreeItem[] = [];

    const builder = (items: IOption[], depth = 0) => {
      for (let item of items) {
        if (item.children) {
          data.push({
            uid: item.uid!,
            depth: depth,
            isOpen: false,
          });
          builder(item.children, depth + 1);
        }
      }
    };

    builder(options);
    return data;
  };

  const generate = (options: IOption[]) => {
    reBuildOptions(options);
    const newTree = buildTree(options);
    setTree(newTree);
  };

  const toggle = (uid: string, state: boolean) => {
    const newTree = tree;
    const index = newTree.findIndex((item) => item.uid === uid);
    if (state) {
      newTree[index].isOpen = true;
      const depth = newTree[index].depth;
      newTree.forEach((item) => {
        if (item.depth === depth && item.uid !== uid) {
          item.isOpen = false;
        }
      });
    } else {
      newTree[index].isOpen = false;
    }
    setTree(newTree);
  };

  const status = (uid: string) => {
    const status = tree.find((item) => item.uid === uid)?.isOpen;
    return status;
  };

  return { toggle, status, generate };
};
