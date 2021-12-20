import graphicImg from 'assets/graphics.svg';
import marketingImg from 'assets/marketing.svg';
import programmingImg from 'assets/programming.svg';
import userImg from 'assets/user.jpg';
import gigImg from 'assets/gigImg.jpg';

export const services = [
  {
    label: 'SEO',
    value: 'seo',
    desc: 'Unlock the growth',
    image: '',
  },
  {
    label: 'Illustration',
    value: 'illustration',
    desc: 'Color your dreams',
    image: '',
  },
  {
    label: 'Translation',
    value: 'translation',
    desc: 'Go Global',
    image: '',
  },
  {
    label: 'Data Entry',
    value: 'data-entry',
    desc: 'Learn the business',
    image: '',
  },
  {
    label: 'Voice Over',
    value: 'voice-over',
    desc: 'Share your message',
    image: '',
  },
  {
    label: 'Reach More Customers',
    value: 'data-entry12',
    desc: 'Social Media',
    image: '',
  },
  {
    label: 'Data Entry',
    value: 'data-entry',
    desc: 'Learn the business',
    image: '',
  },
  {
    label: 'Data Entry',
    value: 'data-entry',
    desc: 'Learn the business',
  },
  {
    label: 'Data Entry',
    value: 'data-entry',
    desc: 'Learn the business',
  },
];

export const categories = [
  {
    id: 123,
    name: 'Graphics & Design',
    imgUrl: graphicImg,
  },
  {
    id: 122,
    name: 'Marketing',
    imgUrl: marketingImg,
  },
  {
    id: 124,
    name: 'Programming & Tech',
    imgUrl: programmingImg,
  },
  {
    id: 112,
    name: 'Business Needs',
    imgUrl: programmingImg,
  },
];

export const sub_categories = [
  {
    cat_id: 123,
    id: 12311,
    title: 'Logo Design',
  },
  {
    cat_id: 123,
    id: 12312,
    title: 'UI Design',
  },
  {
    cat_id: 123,
    id: 12313,
    title: 'Website Design',
  },

  {
    cat_id: 124,
    id: 12411,
    title: 'Game Development',
  },
  {
    cat_id: 124,
    id: 12412,
    title: 'Wordpress',
  },
  {
    cat_id: 124,
    id: 12413,
    title: 'E-commerce Development',
  },
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const userProfile = {
  id: 12,
  fullName: 'Ali Hassan',
  photo: userImg,
  email: 'alihassan17@gmail.com',
  country: 'Pakistan',
  description:
    'Hi I am ali hassan,a Full Stack Software Engineer,who loves to develop smart,reliable and scalable applications. I have developed number of web applications using Node Js .Right now I am learning React js to become a Full Stack MERN Developer My passion of developing efficient and convenient applications,interest in learning new technologies,enables me to develop more effective solutions and keep myself up to date.',
  skills: [
    'HTML',
    'CSS',
    'JavaScript',
    'Material-UI',
    'Team Work',
    'Creativity',
  ],
  createdAt: new Date(),
};

export const gigs = [
  {
    id: 11,
    title: 'I develop or fix your mern , react or node js ',
    category: 'Programming',
    subCategory: 'Web Programming',
    images: gigImg,
    price: '$44',
  },
  {
    id: 12,
    title: 'I will fix node js applications',
    category: 'Programming',
    subCategory: 'Web Programming',
    images: gigImg,
    price: '$44',
  },
  {
    id: 13,
    title: 'I Fix React Js Applications',
    category: 'Programming',
    subCategory: 'Web Programming',
    images: gigImg,
    price: '$44',
  },
];
export const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas  ',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia (Plurinational State of)',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory  ',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cayman Islands  ',
  'Central African Republic  ',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands  ',
  'Colombia',
  'Comoros  ',
  'Congo (the Democratic Republic of the)',
  'Congo  ',
  'Cook Islands  ',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czechia',
  "Côte d'Ivoire",
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic  ',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Falkland Islands   [Malvinas]',
  'Faroe Islands  ',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories  ',
  'Gabon',
  'Gambia  ',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Holy See  ',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran (Islamic Republic of)',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea (the Democratic People's Republic of)",
  'Korea (the Republic of)',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic  ",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands  ',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia (Federated States of)',
  'Moldova (the Republic of)',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands  ',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger  ',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands  ',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine, State of',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines  ',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Republic of North Macedonia',
  'Romania',
  'Russian Federation  ',
  'Rwanda',
  'Réunion',
  'Saint Barthélemy',
  'Saint Helena, Ascension and Tristan da Cunha',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin (French part)',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten (Dutch part)',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan  ',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan',
  'Tajikistan',
  'Tanzania, United Republic of',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands  ',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates  ',
  'United Kingdom of Great Britain and Northern Ireland  ',
  'United States Minor Outlying Islands  ',
  'United States of America  ',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela (Bolivarian Republic of)',
  'Viet Nam',
  'Virgin Islands (British)',
  'Virgin Islands (U.S.)',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
  'Åland Islands',
];

export const gigTableData = [
  {
    title: 'I develop or fix your mern , react or node js ',
    img: gigImg,
    impressions: 20,
    orders: '0',
  },
  {
    title: 'I will fix node js applications ',
    img: gigImg,
    impressions: 10,
    orders: '0',
  },
  {
    title: 'I Fix React Js Applications',
    img: gigImg,
    impressions: 0,
    orders: '0',
  },
];

export const ordersData = [
  {
    id: 1231,
    buyer: {
      id: 12222,
      userName: 'callumToner123',
      img: userImg,
    },
    gig: 'develop and fix mern stack, react js and node js ...',
    deadline: 'Jan 11, 2022',
    price: '$100',
    status: 'in progress',
  },
];
