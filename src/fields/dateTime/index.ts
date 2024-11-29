import { DateField, SelectField, CheckboxField, RowField, GroupField } from 'payload'
import { updateEventTime } from './hooks/updateEventTime'
import { timezones } from './utils'

type Overrides = {
  //   slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

// TODO: add date and select field overriders
type DateTime = (overrides?: Overrides) => [RowField, RowField, SelectField, CheckboxField]

export const DateTimeField = (overrides = {}) => {
  //   const { checkboxOverrides } = overrides

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
    label: 'To',
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
    //   TODO: implement 'timezone' overrider
    //   ...(slugOverrides || {}),

    hooks: {},
    admin: {
      // TODO: implement 'timezone' admin overriders
      // ...(slugOverriders?.admin || {})
    },
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
