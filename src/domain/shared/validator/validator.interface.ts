import Entity from "../entity/entity.abstract";

export default interface ValidatorInterface<T> {
    validate(entity: T): void;
}