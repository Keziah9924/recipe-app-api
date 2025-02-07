import { createOneResource } from "./crud/create.service";
import { findOneResource, findAllResources, findByResourceId, countDocuments } from "./crud/find.service";
import { findAndUpdateByResourceId, findAndUpdateOneResource } from "./crud/update.service";
import { deleteOneResource, deleteAllResources, findAndDeleteOneByResourceId } from "./crud/delete.service";

export {
    createOneResource,
    findOneResource,
    findAllResources,
    findByResourceId,
    findAndUpdateByResourceId,
    findAndUpdateOneResource,
    deleteOneResource,
    deleteAllResources,
    findAndDeleteOneByResourceId,
    countDocuments
}