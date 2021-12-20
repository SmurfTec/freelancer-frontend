import faker from 'faker';
import { sample } from 'lodash';
// utils
// ----------------------------------------------------------------------

const devRequestsMocks = [...Array(12)].map((_, index) => ({
  _id: faker.datatype.uuid(),
  user: { fullName: faker.name.findName() },
  description: faker.lorem.words(20),
  budget: faker.datatype.number({ min: 10, max: 1000, precision: 100 }),
  expectedDay: faker.datatype.number({ min: 10, max: 60, precision: 2 }),
  category: {
    _id: faker.datatype.uuid(),
    title: sample([
      'logo designing',
      'software engineering',
      'graphics designing',
    ]),
  },
  subCategory: {
    _id: faker.datatype.uuid(),
    title: sample(['webdevelopment', 'app development', 'seo']),
  },

  // name: faker.name.findName(),
  // images: [mockImgAvatar(index + 1)],
  // price: faker.datatype.number({ min: 10, max: 1000, precision: 100 }),
}));

export default devRequestsMocks;
