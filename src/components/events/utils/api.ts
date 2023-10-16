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
