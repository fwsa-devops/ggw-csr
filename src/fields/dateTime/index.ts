import { DateField, SelectField, CheckboxField, RowField, GroupField } from 'payload'
import { timezones } from './utils'

type DateTime = () => GroupField

export const DateTimeField: DateTime = () => {
  const checkBoxField: CheckboxField = {
    name: 'allDay',
    type: 'checkbox',
    label: 'Add Day Event',
    defaultValue: false,
    // ...checkboxOverrides,
  }

  const fromDateField: DateField = {
    name: 'from',
    type: 'date',
    index: false,
    label: 'Date',
    required: true,
    hooks: {
      beforeValidate: [],
    },
    admin: {
      width: '50%',
      date: {
        pickerAppearance: 'default',
      },
      // TODO: implement 'from date' admin overriders
      // ...(slugOverriders?.admin || {})
    },
  }

  const fromTimeField: DateField = {
    name: 'fromTime',
    type: 'date',
    index: false,
    label: 'Time',
    required: true,
    hooks: {
      beforeValidate: [],
    },
    admin: {
      width: '50%',
      date: {
        pickerAppearance: 'timeOnly',
      },
    },
  }

  const toDateField: DateField = {
    name: 'to',
    type: 'date',
    index: false,
    label: 'Date',
    required: true,
    hooks: {
      beforeValidate: [],
    },
    admin: {
      width: '50%',
      date: {
        pickerAppearance: 'default',
      },
    },
  }

  const toTimeField: DateField = {
    name: 'toTime',
    type: 'date',
    index: false,
    label: 'Time',
    required: true,
    hooks: {
      beforeValidate: [],
    },
    admin: {
      width: '50%',
      date: {
        pickerAppearance: 'timeOnly',
      },
    },
  }

  const timezoneField: SelectField = {
    name: 'timezone',
    type: 'select',
    options: timezones.map((_t) => ({ label: _t.replace('_', ' '), value: _t })),
    index: false,
    label: 'Timezone',
    required: true,
    hooks: {},
  }

  const finalField: GroupField = {
    type: 'group',
    name: 'dateTime',
    label: 'Date & Time',
    fields: [
      {
        type: 'row',
        fields: [fromDateField, fromTimeField],
      },
      {
        type: 'row',
        fields: [toDateField, toTimeField],
      },

      timezoneField,

      checkBoxField,
    ],
  }

  return finalField
}
