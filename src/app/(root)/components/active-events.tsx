'use client';

import React, { useState, useEffect } from 'react';
import {
  getFilteredActivities,
  getAllActivitiesFromDB,
  getAllTags,
} from '@/components/utils';
import { DateRange } from 'react-day-picker';
import { FilterXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenuCheckboxes } from '@/components/ui/dropdown/checkbox-dd';
import { EVENT_LOCATIONS } from './../../../../constants';
import Loader from '@/components/ui/loader';
import ActivityListItem from '@/app/(root)/components/core/ActivityListItem';
import { IActivity } from '@/types';

const useTags = (): [any[], React.Dispatch<React.SetStateAction<any[]>>] => {
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await getAllTags();
      setTags(fetchedTags);
    };
    fetchTags();
  }, []);

  return [tags, setTags];
};

const ActiveEvents = ({ activities }: { activities: IActivity[] }) => {
  const [isLoading, setLoading] = useState(false);
  const [activitiesState, setActivities] = useState(activities);
  const [locations, setLocations] = useState([...EVENT_LOCATIONS]);
  const [tags, setTags] = useTags();
  const [date, setDate] = useState<DateRange | undefined>();

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
            key="themes"
            label={'Themes'}
            title={'Filter by Themes'}
            className="md:w-auto w-full justify-start"
          />
          <DropdownMenuCheckboxes
            onChange={onLocationChange}
            disabled={isLoading}
            items={locations}
            key="location"
            label={'Locations'}
            title={'Filter by Location'}
            className="md:w-auto w-full justify-start"
          />
          {/* <DatePickerWithRange
            date={date}
            setDate={setDate}
            disabled={isLoading}
            onUpdate={() => { }}
            className="date-filter md:w-auto w-full"
          /> */}

          <div className="flex gap-3">
            <Button disabled={isLoading} onClick={applyFilter}>
              Apply filters
            </Button>
            <Button
              variant={'secondary'}
              disabled={isLoading}
              onClick={clearFilters}
              title={'Clear Filters'}
            >
              <FilterXIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
      {activities.length ? (
        activities?.map((activity) => {
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
