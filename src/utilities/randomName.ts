import { listName } from "../assets/dataName";

export const randomName = () => {
    let index_name = ~~(Math.random() * listName.length);
  return listName[index_name];
};
