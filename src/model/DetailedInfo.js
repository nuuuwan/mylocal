import Entity, {ENTITY, getEntityLabel} from './Entity.js';
import GIGServer from './GIGServer.js';
import {
  formatArea,
  formatPopulation,
} from 'model/FormatUtils.js';

function getAreaAndPopulation(entity) {
  return (
    <p>
      It has an area of {formatArea(entity.area)}, and a population
      of {formatPopulation(entity.population)} (2012 census).
    </p>
  )
}

function getTitle(entity) {
  const entityType = Entity.getEntityType(entity.id);
  return (
    <h1>{entity.name} {getEntityLabel(entityType)}</h1>
  )
}

function getRegionSummaryFirstLine(entity) {
  const entityType = Entity.getEntityType(entity.id);
  switch(entityType) {
    case ENTITY.PROVINCE:
      return (<>
        <p>
          The {entity.name} Province is one of the nine Provinces in Sri Lanka.
        </p>
      </>);
      case ENTITY.DISTRICT:
        return (<>
          <p>
            The {entity.name} District is one of the 25 Districts in Sri Lanka.
          </p>
        </>);
      case ENTITY.DSD:
        return (<>
          <p>
            The {entity.name} District is one of the 334 Divisional Secretariat
             Divisions in Sri Lanka.
          </p>
        </>);
      case ENTITY.GND:
        return (<>
          <p>
            The {entity.name} District is one of the 14021 Grama Niladhari
              Divisions in Sri Lanka.
          </p>
        </>);
    default:
      return null;
  }
}

function getRegionSummary(entity) {
  return (
    <>
    {getTitle(entity)}
    <hr/>
    {getRegionSummaryFirstLine(entity)}
    {getAreaAndPopulation(entity)}
    </>
  );
}

export async function getSummary(entityID) {
  const entityType = Entity.getEntityType(entityID);
  const entity = await GIGServer.getEntity(entityID);

  switch(entityType) {
    case ENTITY.PROVINCE:
    case ENTITY.DISTRICT:
    case ENTITY.DSD:
    case ENTITY.GND:
      return getRegionSummary(entity)
    default:
      return null;
  }
}