// export const updateObjectInArray = (
//   items,
//   itemId,
//   objsPropName,
//   newObjProps
// ) => {
//   return items.map((u) => {
//     if (u[objsPropName] === itemId) {
//       return { ...u, ...newObjProps };
//     }
//     return u;
//   });
// };

// src/utils/object-helpers/object-helpers.ts

export const updateObjectInArray = <T extends { [key: string]: any }>(
  items: T[],
  itemId: number,
  objsPropName: string,
  newObjProps: Partial<T>
): T[] => {
  return items.map((u) => {
    if (u[objsPropName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};
