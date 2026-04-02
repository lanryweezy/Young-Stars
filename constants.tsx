
import { Page, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  {
    name: Page.Home,
    href: '#',
    metaDescription: "Welcome to Young Stars International School, the top choice for nursery and primary education in Ado Ekiti. Discover our future-ready curriculum and nurturing environment."
  },
  {
    name: Page.About,
    href: '#',
    metaDescription: "Learn about Young Stars International School's mission, vision, and our team of the best teachers in Ado Ekiti."
  },
  {
    name: Page.Academics,
    href: '#',
    metaDescription: "Explore our innovative curriculum, blending core subjects with technology programs. We are a top school in Ado Ekiti focused on future-ready skills."
  },
  {
    name: Page.Admissions,
    href: '#',
    metaDescription: "Join the best school in Ado Ekiti. Find information on our simple admissions process, tuition fees, and how to apply to Young Stars International School."
  },
  {
    name: Page.Gallery,
    href: '#',
    metaDescription: "View our gallery to see life at Young Stars International School, a top-rated school in Ado Ekiti with state-of-the-art facilities."
  },
  {
    name: Page.News,
    href: '#',
    metaDescription: "Read the latest news, updates, and articles from Young Stars International School, the most innovative school in Ado Ekiti."
  },
  {
    name: Page.Calendar,
    href: '#',
    metaDescription: "Stay updated with the school calendar for Young Stars International School in Ado Ekiti. Find important dates for academic and extracurricular events."
  },
  {
    name: Page.Portals,
    metaDescription: "Access the student, parent, staff, and admin portals for Young Stars International School, the most organized and efficient school in Ado Ekiti.",
    dropdown: [
      { name: 'Student Portal', href: '#', page: Page.StudentPortal, metaDescription: "Student portal for grades, assignments, and resources at Young Stars International School." },
      { name: 'Parent Portal', href: '#', page: Page.ParentPortal, metaDescription: "Parent portal to track your child's progress and school announcements at Young Stars." },
      { name: 'Staff Portal', href: '#', page: Page.StaffPortal, metaDescription: "Staff portal for our teachers, the best educators in Ado Ekiti." },
      { name: 'Admin Portal', href: '#', page: Page.AdminPortal, metaDescription: "Administrative portal for managing school operations at Young Stars International School." },
    ],
  },
  {
    name: Page.Contact,
    href: '#',
    metaDescription: "Contact Young Stars International School, the best school in Ado Ekiti. Find our address, phone number, and email for inquiries and visits."
  },
];