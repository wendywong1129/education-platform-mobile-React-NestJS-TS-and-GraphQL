import { SCHEDULE_STATUS } from './constants';

export interface IStudent {
  id: string;
  tel: string;
  name: string;
  avatar: string;
  openid: string;
}

export interface IPropChild {
  children: React.ReactNode;
}

export interface IProductType {
  key: string;
  title: string;
}

export interface IImage {
  id: number;
  url: string;
  remark?: string;
}

export interface ITeacher {
  id: string;
  name: string;
  photoUrl: string;
}

export interface ICourse {
  id: string;
  name: string;
  desc?: string;
  group?: string;
  baseAbility?: string;
  limitNumber: number;
  duration: number;
  reserveInfo?: string;
  refundInfo?: string;
  otherInfo?: string;
  coverUrl?: string;
  teachers?: ITeacher[];
}

export interface IOrganization {
  id: string;
  orgFrontImg?: IImage[];
  orgRoomImg?: IImage[];
  orgOtherImg?: IImage[];
  name: string;
  logo?: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
  courses?: ICourse[];
}

export interface ICard {
  id: string;
  name: string;
  type: string;
  time: number;
  validityDay: number;
  course: ICourse;
}

export interface IProduct {
  id: string;
  limitBuyNumber: number;
  name: string;
  reason: string;
  coverUrl: string;
  bannerUrl: string;
  desc: string;
  originalPrice: number;
  stock: number;
  status: string;
  tags?: string;
  curStock: number;
  buyNumber?: number;
  preferentialPrice: number;
  displayType: string;
  distance?: string;
  org: IOrganization;
  cards?: ICard[];
}

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}

export type TBaseQuery<T = null> = { [key: string]: { __typename?: 'Query', data: T, page: IPage, code: number, message: string } };
export type TProductTypeQuery = TBaseQuery<IProductType[]>;
export type TProductsQuery = TBaseQuery<IProduct[]>;
export type TProductQuery = TBaseQuery<IProduct>;

export type TOrgQuery = TBaseQuery<IOrganization>;
export type TOrgsQuery = TBaseQuery<IOrganization[]>;

export type TCourse = ICourse & { cardName: string };

export interface IWxConfig {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: string;
  paySign: string;
}

export type TWxConfigQuery = TBaseQuery<IWxConfig>;

export interface ICardRecord {
  id: string;
  startTime: string;
  endTime: string;
  buyTime: string;
  residueTime: number;
  status: string;
  card: ICard;
  org: IOrganization;
}

export type TCardRecordsQuery = TBaseQuery<ICardRecord[]>;

export interface ISchedule {
  id: string;
  startTime: string;
  endTime: string;
  buyTime: string;
  schoolDay: string;
  course: ICourse;
  teacher: ITeacher;
}

export type TSchedulesQuery = TBaseQuery<ISchedule[]>;

export interface IScheduleRecord {
  id: string;
  subscribeTime: string;
  tel: string;
  status: keyof typeof SCHEDULE_STATUS;
  course: ICourse;
  student: IStudent;
  schedule: ISchedule;
  org: IOrganization;
}
export type TScheduleRecordsQuery = TBaseQuery<IScheduleRecord[]>;
