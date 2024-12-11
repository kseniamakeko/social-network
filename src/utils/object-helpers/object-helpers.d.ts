// src/utils/object-helpers/object-helpers.d.ts

declare module "@utils/object-helpers/object-helpers.ts" {
  export function updateObjectInArray<T>(
    array: T[],
    itemId: number,
    objPropName: string,
    newObjProps: Partial<T>
  ): T[];
}
