'use client';

import React from 'react';
import Link from 'next/link';
import {
  convertToReadableDate,
  getActivityDescription,
  shortenDate,
  getFilteredActivities,
  getAllActivitiesFromDB,
  getAllTags,
} from './utils';
import { DateRange } from 'react-day-picker';
import { CalendarRangeIcon, MapPin, Eraser, PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import EventJoinButton from './event-join-button';
import { Separator } from '../ui/separator';
import { DatePickerWithRange } from '../ui/date-range-picker';
import { DropdownMenuCheckboxes } from '../ui/dropdown/checkbox-dd';
import { EVENT_LOCATIONS } from '../../../constants';
import {
  Activity,
  ActivityTags,
  Event,
  EventLeader,
  Tag,
  User,
  Volunteers,
} from '@prisma/client';

interface IActivities extends Activity {
  events: { volunteers: Volunteers[]; leaders: EventLeader[] } & Event[];
  tags: ({ tag: Tag } & ActivityTags)[];
  author: { name: String };
}

const ActiveEvents = (props: { activities: IActivities[] }) => {
  const { activities } = props;

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [activties, setActivities] = React.useState(activities);
  const [locations, setLocations] = React.useState([...EVENT_LOCATIONS]);
  const [tags, setTags] = React.useState<any>([]);

  React.useEffect(() => {
    fetchAllTags();
  }, []);

  const fetchAllTags = async () => {
    const tags = await getAllTags();
    setTags(tags);
  };

  const onLocationChange = async (item, value) => {
    try {
      setLoading(true);
      const updatedLocations = locations.map((obj) =>
        obj.id === item.id ? { ...item, checked: value } : obj,
      );
      setLocations(updatedLocations);
    } catch (err) {
      console.error('Error in filtering locations ', err);
    } finally {
      setLoading(false);
    }
  };

  const onTagsChange = async (item, value) => {
    try {
      setLoading(true);
      const updatedTags = tags.map((obj) =>
        obj.id === item.id ? { ...item, checked: value } : obj,
      );
      setTags(updatedTags);
    } catch (err) {
      console.error('Error in filtering locations ', err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = async () => {
    setActivities(await getAllActivitiesFromDB());
    const updatedTags = tags.map((tag) => ({ ...tag, checked: false }));
    setTags(updatedTags);
    const updatedLocations = locations.map((location) => ({
      ...location,
      checked: false,
    }));
    setLocations(updatedLocations);
    setDate(undefined);
  };

  const getFilters = () => {
    const selectedTags: any[] = tags.filter((tag) => tag.checked);
    const selectedTagNames = selectedTags.map((tag) => tag.name);
    const selectedLocations: any[] = locations.filter(
      (location) => location.checked,
    );
    const selectedLocationNames = selectedLocations.map(
      (location) => location.name,
    );

    const filters = {
      ...date,
    };
    if (selectedTagNames.length > 0) {
      filters['tagNames'] = selectedTagNames;
    }
    if (selectedLocationNames.length > 0) {
      filters['locations'] = selectedLocationNames;
    }
    return filters;
  };

  const applyFilter = async () => {
    try {
      setLoading(true);
      const filters = getFilters();
      if (filters) {
        setActivities(await getFilteredActivities(filters));
      } else {
        setActivities(await getAllActivitiesFromDB());
      }
    } catch (err) {
      console.error('Error in filtering locations ', err);
    } finally {
      setLoading(false);
    }
  };

  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <>
      <div className="flex md:justify-between justify-start gap-2 mt-12 flex-wrap md:flex-nowrap">
        <div className="main-header">
          <h1 className="text-xl">Events - 2023</h1>
        </div>
        <div className="flex md:justify-end justify-start flex-1 gap-3 md:flex-nowrap flex-wrap">
          <DropdownMenuCheckboxes
            onChange={onTagsChange}
            disabled={isLoading}
            items={tags}
            key="tags"
            label={'Tags'}
            title={'Filter by Themes'}
          />
          <DropdownMenuCheckboxes
            onChange={onLocationChange}
            disabled={isLoading}
            items={locations}
            key="location"
            label={'Locations'}
            title={'Filter by Location'}
          />
          <DatePickerWithRange
            date={date}
            setDate={setDate}
            disabled={isLoading}
            onUpdate={() => { }}
          />
          <Button disabled={isLoading} onClick={applyFilter}>
            Apply filters
          </Button>
          <Button
            variant={'secondary'}
            disabled={isLoading}
            onClick={clearFilters}
          >
            <Eraser size={18} />
          </Button>

          <Button
            variant={'default'}
            disabled={isLoading}
            onClick={clearFilters}
          >
            <Link href={`/admin/activities/new`} className='flex'>
              <PlusIcon size={18} className='mr-2' />
              New
            </Link>
          </Button>

        </div>
      </div>
      {activties.length ? (
        activties?.map((activity) => {
          return (
            <div
              className="container h-auto px-0 mx-auto my-10 border border-b-2 shadow w-100 bg-grey rounded-xl bg-card text-card-foreground "
              key={activity.id}
            >
              <div className="flex flex-wrap gap-6 p-4 mx-auto event-container md:flex-nowrap md:h-600">
                <Link
                  className="flex lg:w-1/3 lg:h-100 max-h-72"
                  href={`activities/${activity.id}`}
                >
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full rounded"
                    src={activity.cover || ''}
                  />
                </Link>

                <div className="w-full mt-6 lg:w-1/3 lg:mt-0">
                  <h1 className="mb-1 text-xl font-semibold text-gray-700 title-font">
                    {activity.name}
                  </h1>
                  <div className="flex gap-2 mb-2 text-gray-700 location items-center">
                    <MapPin size="18" />
                    <p className="text-sm">{activity?.city}</p>
                  </div>
                  <h2 className="mb-1 text-sm tracking-widest text-gray-400 title-font">
                    {activity?.tags.length > 0
                      ? activity?.tags
                        .map((tag) => `#${tag?.tag.name}`)
                        .join(', ')
                      : 'No tags available'}
                  </h2>

                  <p className="leading-relaxed">
                    {getActivityDescription(activity)}
                  </p>
                  <div className="flex items-center pb-5 mt-2 mb-0 text-sm">
                    <div className="flex flex-col gap-y-2">
                      <p>
                        <strong className="mr-3">Duration: </strong>
                        {activity?.duration} minutes
                        {/* <time
                          dateTime={convertToReadableDate(activity.startTime)}
                          suppressHydrationWarning
                        >
                          {convertToReadableDate(activity.startTime)} to{' '}
                          {convertToReadableDate(activity.endTime)}
                        </time> */}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <Link href={`/activities/${activity.id}`}>
                      <Button size="sm" variant="outline">
                        Learn more
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* <div className="inline-block h-[250px] min-h-[1em] w-1 self-stretch bg-black opacity-100"></div> */}

                <div className="w-full pl-5 participants lg:w-1/3 ">
                  <h2 className="pb-2 mb-2 text-xl font-medium text-gray-700 ">
                    Events
                  </h2>
                  {activity.events.map((event: any) => (
                    <React.Fragment key={event.id}>
                      <Separator className="mb-4 mt-46" />
                      <Link href={`/activities/${activity.id}`}>
                        <div className="join-event">
                          <div className="flex justify-between my-2 text-sm text-gray-700 event-timings align-center">
                            {' '}
                            {/* <time
                              dateTime={convertToReadableDate(
                                activity.startTime,
                              )}
                              suppressHydrationWarning
                            >
                              {shortenDate(event.startTime)} to{' '}
                              {shortenDate(event.endTime)}
                            </time> */}
                            <div className="flex items-center text-sm text-gray-700 event-duration gap-x-1">
                              <CalendarRangeIcon size="18" />
                              {event.is_dates_announced
                                ? ((new Date(
                                  event.endTime as any,
                                ).getTime() as any) -
                                  (new Date(
                                    event.startTime as any,
                                  ).getTime() as any)) /
                                (1000 * 60 * 60) +
                                ' hrs'
                                : event.date_announcement_text}
                            </div>
                          </div>
                          <EventJoinButton
                            event={event}
                            alreadyJoinedActivity={true}
                          />
                        </div>
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="container flex justify-center h-auto mx-auto my-10 text-2xl">
          No Activities with applied filters...
        </h2>
      )}
    </>
  );
};

export default ActiveEvents;
