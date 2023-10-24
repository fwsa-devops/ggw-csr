'use client';

import React from 'react';
import Link from 'next/link';
import {
  getFilteredActivities,
  getAllActivitiesFromDB,
  getAllTags,
} from './utils';
import { DateRange } from 'react-day-picker';
import { Eraser, PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { DatePickerWithRange } from '../ui/date-range-picker';
import { DropdownMenuCheckboxes } from '../ui/dropdown/checkbox-dd';
import { EVENT_LOCATIONS } from '../../../constants';

import Loader from '../ui/loader';
import ActivityListItem from '../core/ActivityListItem';
import { IActivity } from '@/types';
import { useSession } from 'next-auth/react';

const ActiveEvents = (props: { activities: IActivity[] }) => {
  const { activities } = props;

  const { status } = useSession();

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [activties, setActivities] = React.useState(activities);
  const [locations, setLocations] = React.useState([...EVENT_LOCATIONS]);
  const [tags, setTags] = React.useState<any>([]);
  const [date, setDate] = React.useState<DateRange | undefined>();

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
    setLoading(true);
    setActivities(await getAllActivitiesFromDB());
    const updatedTags = tags.map((tag) => ({ ...tag, checked: false }));
    setTags(updatedTags);
    const updatedLocations = locations.map((location) => ({
      ...location,
      checked: false,
    }));
    setLocations(updatedLocations);
    setDate(undefined);
    setLoading(false);
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

  return (
    <>
      <div className="flex md:flex-row flex-col md:justify-between justify-start gap-4 mt-12 flex-wrap md:flex-nowrap">
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
            onUpdate={() => {}}
          />

          <div className="flex gap-3">
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

            {status === 'authenticated' && (
              <Button
                variant={'default'}
                disabled={isLoading}
                onClick={clearFilters}
              >
                <Link href={`/admin/activities/new`} className="flex">
                  <PlusIcon size={18} className="mr-2" />
                  New
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
      {activties.length ? (
        activties?.map((activity) => {
          return (
            <div
              className={`container h-auto px-0 mx-auto my-10 border border-b-2 shadow w-100 bg-grey rounded-xl bg-card text-card-foreground ${
                isLoading ? 'opacity-50' : ''
              }`}
              key={activity.id}
            >
              <ActivityListItem key={activity.id} activity={activity} />
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
