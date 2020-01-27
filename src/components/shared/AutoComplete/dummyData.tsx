import { IC_FACEBOOK, IC_GOOGLE } from '../Icons';

import { Datum } from './types';
import { Image } from 'react-native';
import React from 'react';

export default [
  {
    id: 'AD',
    label: 'Andorra',
    value: '+376',
    leftIcon: '🇦🇩',
  },
  {
    id: 'AE',
    label: 'United Arab Emirates',
    value: '+971',
    leftIcon: '🇦🇪',
  },
  {
    id: 'AF',
    label: 'Afghanistan',
    value: '+93',
    leftIcon: '🇦🇫',
  },
  {
    id: 'AG',
    label: 'Antigua and Barbuda',
    value: '+1-268',
    leftIcon: '🇦🇬',
  },
  {
    id: 'AI',
    label: 'Anguilla',
    value: '+1-264',
    leftIcon: '🇦🇮',
  },
  {
    id: 'AL',
    label: 'Albania',
    value: '+355',
    leftIcon: '🇦🇱',
  },
  {
    id: 'AM',
    label: 'Armenia',
    value: '+374',
    leftIcon: '🇦🇲',
  },
  {
    id: 'AO',
    label: 'Angola',
    value: '+244',
    leftIcon: '🇦🇴',
  },
  {
    id: 'AQ',
    label: 'Antarctica',
    value: '+672',
    leftIcon: '🇦🇶',
  },
  {
    id: 'AR',
    label: 'Argentina',
    value: '+54',
    leftIcon: '🇦🇷',
  },
  {
    id: 'AS',
    label: 'American Samoa',
    value: '+1-684',
    leftIcon: '🇦🇸',
  },
  {
    id: 'AT',
    label: 'Austria',
    value: '+43',
    leftIcon: '🇦🇹',
  },
  {
    id: 'AU',
    label: 'Australia',
    value: '+61',
    leftIcon: '🇦🇺',
  },
  {
    id: 'AW',
    label: 'Aruba',
    value: '+297',
    leftIcon: '🇦🇼',
  },
  {
    id: 'AX',
    label: 'Åland Islands',
    value: '+358',
    leftIcon: '🇦🇽',
  },
  {
    id: 'AZ',
    label: 'Azerbaijan',
    value: '+994',
    leftIcon: '🇦🇿',
  },
  {
    id: 'LI',
    label: 'Left Icon Test',
    value: '+111',
    leftIcon: <Image source={IC_FACEBOOK} style={{ width: 16, height: 16 }} />,
  },
  {
    id: 'RI',
    label: 'Right Icon Test',
    value: '+999',
    rightIcon: <Image source={IC_GOOGLE} style={{ width: 16, height: 16 }} />,
  },
] as Datum[];
