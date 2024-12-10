export const updateObjectInArray = (
  items,
  itemId,
  objsPropName,
  newObjProps
) => {
  return items.map((u) => {
    if (u[objsPropName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};
