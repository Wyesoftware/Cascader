import create from "zustand";
import { ITreeItem } from "../../types";

type ITree = {
  tree: ITreeItem[];
  setTree: (tree: ITreeItem[]) => void;
};

export const useTree = create<ITree>((set) => ({
  tree: [],
  setTree: (tree: ITreeItem[]) => set({ tree }),
}));
