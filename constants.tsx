// constants.tsx

export enum Page {
    Home = '/',
    About = '/about',
    Admissions = '/admissions',
    Gallery = '/gallery',
    News = '/news',
    NewsDetail = '/news/:id',
    Calendar = '/calendar',
    Contact = '/contact',
    StudentPortal = '/portals/student',
    ParentPortal = '/portals/parent',
    StaffPortal = '/portals/staff',
    AdminPortal = '/portals/admin',
}

export const navLinks = [
    { name: 'Home', href: Page.Home, metaDescription: "Welcome to lanrystars, the top choice for nursery and primary education in Ado Ekiti. Discover our future-ready curriculum and nurturing environment." },
    { name: 'About Us', href: Page.About, metaDescription: "Learn about lanrystars's mission, vision, and our team of the best teachers in Ado Ekiti." },
    { name: 'Admissions', href: Page.Admissions, metaDescription: "Join the best school in Ado Ekiti. Find information on our simple admissions process, tuition fees, and how to apply to lanrystars." },
    { name: 'Gallery', href: Page.Gallery, metaDescription: "View our gallery to see life at lanrystars, a top-rated school in Ado Ekiti with state-of-the-art facilities." },
    { name: 'News', href: Page.News, metaDescription: "Read the latest news, updates, and articles from lanrystars, the most innovative school in Ado Ekiti." },
    { name: 'Calendar', href: Page.Calendar, metaDescription: "Stay updated with the school calendar for lanrystars in Ado Ekiti. Find important dates for academic and extracurricular events." },
    {
        name: 'Portals',
        href: '#',
        sublinks: [
            { name: 'Student Portal', href: '#', page: Page.StudentPortal, metaDescription: "Student portal for grades, assignments, and resources at lanrystars." },
            { name: 'Parent Portal', href: '#', page: Page.ParentPortal, metaDescription: "Parent portal to track your child's progress and school announcements at lanrystars." },
            { name: 'Staff Portal', href: '#', page: Page.StaffPortal, metaDescription: "Staff portal for resources, communication, and administrative tasks." },
            { name: 'Admin Portal', href: '#', page: Page.AdminPortal, metaDescription: "Administrative portal for managing school operations at lanrystars." },
        ],
        metaDescription: "Access the student, parent, staff, and admin portals for lanrystars, the most organized and efficient school in Ado Ekiti.",
    },
    { name: 'Contact Us', href: Page.Contact, metaDescription: "Contact lanrystars, the best school in Ado Ekiti. Find our address, phone number, and email for inquiries and visits." },
];
