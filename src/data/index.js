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
  },
  {
    label: 'Illustration',
    value: 'illustration',
    desc: 'Color your dreams',
  },
  {
    label: 'Translation',
    value: 'translation',
    desc: 'Go Global',
  },
  {
    label: 'Data Entry',
    value: 'data-entry',
    desc: 'Learn the business',
  },
];

export const sub_cat = [
  {
    id: '123',
    name: 'Graphics & Design',
    imgUrl: graphicImg,
  },
  {
    id: '122',
    name: 'Marketing',
    imgUrl: marketingImg,
  },
  {
    id: '124',
    name: 'Programming & Tech',
    imgUrl: programmingImg,
  },
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
