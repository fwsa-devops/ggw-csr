export const joinEvent = async (eventId: number) => {
  const response = await fetch(`/api/event/${eventId}/join`, {
    method: 'GET',
  });
  const json = await response.json();
  return json;
};

export const deleteEvent = async (eventId: number) => {
  const response = await fetch(`/api/event/${eventId}/join`, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json;
};

export const getActivitiesBasedOnFilters = async (filters: any) => {
  const response = await fetch(`/api/activities/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
    credentials: 'include',
  });
  const json = await response.json();
  return json;
};

export const getAllActivities = async () => {
  const activities = await fetch(`http://localhost:3000/api/activities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await activities.json();
  return json;
};

export const getAllTagsFromDB = async () => {
  const tags = await fetch(`http://localhost:3000/api/tags`, {
    method: 'GET',
  });
  const json = await tags.json();
  return json;
};

export const checkUserAlreadyRegistered = async () => {
  const response = await fetch(
    `http://localhost:3000/api/activities/is-joined`,
    {
      method: 'GET',
    },
  );
  const json = await response.json();
  return json;
};
