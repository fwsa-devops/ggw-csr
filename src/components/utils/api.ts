const { HOST_API_URL = '/' } = process.env;

export const joinEvent = async (eventId: string) => {
  const response = await fetch(`/api/event/${eventId}/join`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error('Only freshworks emails allowed');
  }
};

export const deleteEvent = async (eventId: string) => {
  const response = await fetch(`/api/event/${eventId}/join`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

export const getActivitiesBasedOnFilters = async (filters: any) => {
  const response = await fetch(`${HOST_API_URL}api/activities/filter`, {
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
  const activities = await fetch(`${HOST_API_URL}api/activities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await activities.json();
  return json;
};

export const getAllTagsFromDB = async () => {
  const tags = await fetch(`${HOST_API_URL}api/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await tags.json();
  return json;
};

export const checkUserAlreadyRegistered = async () => {
  const response = await fetch(`${HOST_API_URL}api/activities/is-joined`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

export const createNewActivity = async (data: unknown) => {
  const body = JSON.stringify(data);

  const response = await fetch(`${HOST_API_URL}api/activities`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

export const createHomepageContent = async (data: unknown) => {
  const body = JSON.stringify(data);

  const response = await fetch(`${HOST_API_URL}api/homepage`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

export const getHomepageContent = async () => {
  const response = await fetch(`${HOST_API_URL}api/homepage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = response.json();
  return json;
};

export const uploadPostToActivity = async (
  imageUrls: any,
  activityId: string,
) => {
  const response = await fetch(
    `${HOST_API_URL}api/activities/upload-posts?activity_id=${activityId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageUrls),
      credentials: 'include',
    },
  );
  const json = await response.json();
  return json;
};