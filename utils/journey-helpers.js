// Return data for waypoint if provided, defaulting to route source waypoint
const d = (route, context, waypoint = route.source) => context.getDataForPage(waypoint)
  || Object.create(null);

// Field in waypoint (route source if waypoint is undefined) is equal to value
const isEqualTo = (field, value, waypoint) => (r, c) => d(r, c, waypoint)[field] === value;

// Field in waypoint is not equal to value
const isNotEqualTo = (field, value, waypoint) => (r, c) => (
  d(r, c, waypoint)[field] !== undefined && d(r, c, waypoint)[field] !== value
);

// Field value in waypoint is in set of values
const isInSet = (field, values, waypoint) => (r, c) => values.includes(d(r, c, waypoint)[field]);

// Field value in waypoint is not in set of values
const isNotInSet = (field, values, waypoint) => (r, c) => (
  d(r, c, waypoint)[field] !== undefined && !isInSet(field, values, waypoint)(r, c)
);

// Field in waypoint is 'yes'
const isYes = (field, waypoint) => isEqualTo(field, 'yes', waypoint);

// Field in waypoint is 'no'
const isNo = (field, waypoint) => isEqualTo(field, 'no', waypoint);

// Way point was 'skipped' via skip link
const wasSkipped = (waypoint) => isEqualTo('__skipped__', true, waypoint);

// Way point was not 'skipped' via skip link
const wasNotSkipped = (waypoint) => isEqualTo('__skipped__', undefined, waypoint);

module.exports = {
  d,
  isEqualTo,
  isNotEqualTo,
  isInSet,
  isNotInSet,
  isYes,
  isNo,
  wasSkipped,
  wasNotSkipped,
};
