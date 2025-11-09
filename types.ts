export enum Page {
  Home = 'Home',
  About = 'About Us',
  Academics = 'Curriculum',
  Admissions = 'Admissions',
  Gallery = 'Gallery',
  News = 'News & Blog',
  Contact = 'Contact Us',
  Calendar = 'Calendar',
  Portals = 'Portals',
  StudentPortal = 'Student Portal',
  ParentPortal = 'Parent Portal',
  StaffPortal = 'Staff Portal',
  AdminPortal = 'Admin Portal',
}

export type NavLink = {
  name: Page;
  href: string;
  metaDescription: string;
} | {
  name: Page.Portals;
  metaDescription: string;
  dropdown: {
    name: string;
    href: string;
    page: Page;
    metaDescription: string;
  }[];
};

export interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  summary: string;
  content: string;
}
