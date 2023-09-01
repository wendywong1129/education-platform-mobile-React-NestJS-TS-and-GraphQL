import mySvg from '@/assets/my.svg';
import courseSvg from '@/assets/course.svg';

interface IRoute {
  path: string;
  name: string;
  icon?: string;
  isMenu?: boolean;
  hideHeader?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG_INFO: 'orgInfo',
  PRODUCT_INFO: 'productInfo',
  BUY: 'buy',
  EDIT_INFO: 'editInfo',
  MY_CARD: 'myCard',
  ORDER_COURSE: 'orderCourse',
  MY_COURSE: 'myCourse',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '',
    name: 'Excellent Courses',
    isMenu: true,
    icon: courseSvg,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: 'My Profile',
    isMenu: true,
    icon: mySvg,
  },
  [ROUTE_KEY.ORG_INFO]: {
    path: 'orgInfo/:id',
    name: 'Organization Info',
    isMenu: false,
  },
  [ROUTE_KEY.PRODUCT_INFO]: {
    path: 'productInfo/:id',
    name: 'Product Info',
    isMenu: false,
  },
  [ROUTE_KEY.BUY]: {
    path: 'buy/:id',
    name: 'Purchase Info',
    isMenu: false,
  },
  [ROUTE_KEY.EDIT_INFO]: {
    path: 'editInfo',
    name: 'Edit Info',
    isMenu: false,
  },
  [ROUTE_KEY.MY_CARD]: {
    path: 'myCard',
    name: 'My Card',
    isMenu: false,
  },
  [ROUTE_KEY.ORDER_COURSE]: {
    path: 'orderCourse',
    name: 'Course Reservation',
    isMenu: false,
  },
  [ROUTE_KEY.MY_COURSE]: {
    path: 'myCourse',
    name: 'My Course',
    isMenu: false,
  },

};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
