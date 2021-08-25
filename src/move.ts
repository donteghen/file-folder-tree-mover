//  Please update this type as same as with the data shape.
type FileType = {
  id: string;
  name: string;
};
type Folder = {
  id: string;
  name: string;
  files: FileType[];
};
type List = Array<Folder>;

export default function move(list: List, source: string, destination: string): List {
  // throw new Error('Not implemented');
  let movingFile: FileType;
  if (list.length === 0) {
    throw new Error('List is empty');
  }
  if (!list.every((folder: Folder) => folder.id !== source)) {
    throw new Error('You cannot move a folder');
  }
  if (!list.find((folder: Folder) => folder.id === destination)) {
    throw new Error('You cannot specify a file as the destination');
  }
  list.forEach((folder: Folder) => {
    const index: number = folder.files.findIndex((file: FileType) => file.id === source);
    if (index !== -1) {
      movingFile = folder.files[index];
      // eslint-disable-next-line no-param-reassign
      folder.files = folder.files.filter((file: FileType) => file.id !== source);
      const destinationFolder = list.find((destFolder: Folder) => destFolder.id === destination);
      if (destinationFolder) {
        destinationFolder.files = destinationFolder.files.concat(movingFile);
      }
    }
  });
  return list;
}
