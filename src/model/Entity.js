import {invertDict} from '../model/DataStructures.js';

export const ENTITY = {
  COUNTRY: 'country',
  PROVINCE: 'province',
  DISTRICT: 'district',
  DSD: 'dsd',
  GND: 'gnd',

  ED: 'ed',
  PD: 'pd',

  PS: 'ps',
}

export const ENTITIES = Object.values(ENTITY);

export const ENTITY_LABEL_MAP = {
  [ENTITY.COUNTRY]: 'Country',
  [ENTITY.PROVINCE]: 'Province',
  [ENTITY.DISTRICT]: 'Administrative District',
  [ENTITY.DSD]: 'Divisional Secretariat Division',
  [ENTITY.GND]: 'Grama Niladari Division',
  [ENTITY.PD]: 'Polling Division',
  [ENTITY.ED]: 'Electoral District',
}

export const ISO_ENTITY_TO_ID_LENGTH = {
  [ENTITY.COUNTRY]: 2,
  [ENTITY.PROVINCE]: 4,
  [ENTITY.DISTRICT]: 5,
  [ENTITY.DSD]: 7,
  [ENTITY.GND]: 10,
}
export const ISO_ID_LENGTH_TO_ENTITY = invertDict(ISO_ENTITY_TO_ID_LENGTH);

export const EC_ID_LENGTH_TO_ENTITY = {
  5: ENTITY.ED,
  6: ENTITY.PD,
}

export default class Entity {

  static isISORegionType(entityID) {
    return entityID.substring(0, 2) === 'LK';
  }

  static isECType(entityID) {
    return entityID.substring(0, 2) === 'EC';
  }

  static getEntityType(entityID) {
    const idLength = entityID.length;

    if (Entity.isISORegionType(entityID)) {
      return ISO_ID_LENGTH_TO_ENTITY[idLength] || undefined;
    }

    else if (Entity.isECType(entityID)) {
      return EC_ID_LENGTH_TO_ENTITY[idLength] || undefined;
    }

    else if (entityID.substring(0, 2) === 'PS') {
      return ENTITY.PS;
    }

    return undefined;
  }

}